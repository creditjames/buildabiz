import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FileUploadProps {
  businessId: string;
  onUploadComplete?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ businessId, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('articles');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const documentTypes = [
    { value: 'articles', label: 'Articles of Organization/Incorporation' },
    { value: 'operating-agreement', label: 'Operating Agreement' },
    { value: 'ein', label: 'EIN Confirmation' },
    { value: 'certificate', label: 'Business Certificate' },
    { value: 'other', label: 'Other Document' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDocumentName(e.target.files[0].name);
      setError('');
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !documentName || !documentType) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setUploading(true);
      setError('');

      // Get current employee user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Verify user is an employee by checking email domain
      const employeeDomains = ['@buildabiz.com', '@buildabiz.us', '@wealthyallianceclub.com'];
      const isEmployee = employeeDomains.some(domain => user.email?.endsWith(domain));
      
      if (!isEmployee) {
        throw new Error('Unauthorized: Only employees can upload documents');
      }

      // Verify the business exists before proceeding
      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .select('id')
        .eq('id', businessId)
        .single();

      if (businessError || !business) {
        throw new Error('Business not found or access denied');
      }

      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${businessId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // First create the document record in database with employee_id
      // This needs to be done before storage upload to satisfy RLS policies
      const { data: documentData, error: dbError } = await supabase
        .from('documents')
        .insert({
          business_id: businessId,
          name: documentName,
          type: documentType,
          url: '', // Will be updated after successful upload
          status: 'pending',
          bucket_id: 'employee-uploads',
          employee_id: user.id
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Now upload file to the storage bucket
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('employee-uploads')
        .upload(fileName, file, {
          upsert: true,
          cacheControl: '3600',
          contentType: file.type
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        // If storage upload fails, clean up the database record
        await supabase
          .from('documents')
          .delete()
          .eq('id', documentData.id);
        throw new Error(`Upload error: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('employee-uploads')
        .getPublicUrl(fileName);

      // Update document record with the actual URL and mark as completed
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          url: publicUrl,
          status: 'completed',
          uploaded_at: new Date().toISOString()
        })
        .eq('id', documentData.id);

      if (updateError) {
        console.error('Document update error:', updateError);
        // If update fails, try to clean up the uploaded file
        await supabase.storage
          .from('employee-uploads')
          .remove([fileName]);
        throw new Error(`Update error: ${updateError.message}`);
      }

      setSuccess(true);
      setFile(null);
      setDocumentName('');
      if (onUploadComplete) onUploadComplete();

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Document</h3>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
          <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
          <span className="text-green-700 text-sm">Document uploaded successfully!</span>
        </div>
        )}

      <div className="space-y-4">
        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-2">
            Document Name
          </label>
          <input
            type="text"
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter document name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select File
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            uploading || !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="-ml-1 mr-2 h-5 w-5" />
              Upload Document
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;