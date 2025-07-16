import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Eye, Clock, Search, Filter, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import FileUpload from '../components/FileUpload';
import jsPDF from 'jspdf';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: businessData } = await supabase
        .from('businesses')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (businessData) {
        const { data: documents, error } = await supabase
          .from('documents')
          .select('*')
          .eq('business_id', businessData.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(documents || []);
        setSelectedBusiness(businessData);
      }
    } catch (error: any) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewBusinessPlan = async (doc: any) => {
    try {
      // Fetch the business plan content from the businesses table
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('business_plan, business_name')
        .eq('id', doc.business_id)
        .maybeSingle();

      if (error) throw error;

      if (businessData?.business_plan?.content) {
        // Get brand color from business_plan object or use default
        const brandColor = businessData.business_plan?.brand_color || '#FF5A1F';
        
        // Create a new window to display the business plan
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>${doc.name}</title>
                <style>
                  body { 
                    font-family: Arial, sans-serif; 
                    max-width: 800px; 
                    margin: 0 auto; 
                    padding: 20px; 
                    line-height: 1.6; 
                  }
                  h1, h2, h3 { 
                    color: ${brandColor}; 
                  }
                  .header {
                    text-align: center;
                    border-bottom: 2px solid ${brandColor};
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                  }
                  .content {
                    white-space: pre-wrap;
                  }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>${businessData.business_name} - Business Plan</h1>
                  <p>Generated on ${new Date(doc.uploaded_at).toLocaleDateString()}</p>
                </div>
                <div class="content">${businessData.business_plan.content}</div>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      } else {
        alert('Business plan content not found');
      }
    } catch (error: any) {
      console.error('Error viewing business plan:', error);
      alert('Error loading business plan: ' + error.message);
    }
  };

  const downloadBusinessPlanPDF = async (doc: any) => {
    try {
      // Fetch the business plan content from the businesses table
      const { data: businessData, error } = await supabase
        .from('businesses')
        .select('business_plan, business_name')
        .eq('id', doc.business_id)
        .maybeSingle();

      if (error) throw error;

      if (businessData?.business_plan?.content) {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        
        // Get brand color from business_plan object or use default
        const brandColor = businessData.business_plan?.brand_color || '#FF5A1F';
        const hexColor = brandColor.replace('#', '');
        const r = parseInt(hexColor.substr(0, 2), 16);
        const g = parseInt(hexColor.substr(2, 2), 16);
        const b = parseInt(hexColor.substr(4, 2), 16);
        
        let yPosition = margin;
        
        // Title page
        pdf.setTextColor(r, g, b);
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('BUSINESS PLAN', pageWidth / 2, yPosition + 40, { align: 'center' });
        
        pdf.setFontSize(20);
        pdf.text(businessData.business_name, pageWidth / 2, yPosition + 60, { align: 'center' });
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Generated on ${new Date(doc.uploaded_at).toLocaleDateString()}`, pageWidth / 2, yPosition + 80, { align: 'center' });
        
        // Add new page for content
        pdf.addPage();
        yPosition = margin;
        
        // Split content into lines and add to PDF
        const lines = pdf.splitTextToSize(businessData.business_plan.content, maxWidth);
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          // Check if line is a heading (starts with number or contains section keywords)
          if (line.match(/^\d+\./) || line.includes('Executive Summary') || line.includes('Company Description') || 
              line.includes('Market Analysis') || line.includes('Organization') || line.includes('Product Line') ||
              line.includes('Marketing') || line.includes('Funding') || line.includes('Financial') || line.includes('Appendix')) {
            pdf.setTextColor(r, g, b);
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(14);
          } else {
            pdf.setTextColor(0, 0, 0);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(10);
          }
          
          // Check if we need a new page
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.text(line, margin, yPosition);
          yPosition += pdf.getLineHeight() + 2;
        }
        
        // Add signature page
        pdf.addPage();
        yPosition = pageHeight - 60;
        
        pdf.setTextColor(r, g, b);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text('Prepared by:', margin, yPosition);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFont('helvetica', 'normal');
        pdf.text(businessData.business_name, margin, yPosition + 20);
        pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition + 35);
        
        // Save the PDF
        pdf.save(`${businessData.business_name}_Business_Plan.pdf`);
      } else {
        alert('Business plan content not found');
      }
    } catch (error: any) {
      console.error('Error downloading business plan:', error);
      alert('Error downloading business plan: ' + error.message);
    }
  };

  const downloadDocument = (doc: any) => {
    if (doc.type === 'business-plan') {
      downloadBusinessPlanPDF(doc);
    } else if (doc.url) {
      // For regular documents, open the URL in a new tab to trigger download
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No download available for this document');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'business-plan':
        return <Sparkles className="text-purple-500 w-6 h-6" />;
      default:
        return <FileText className="text-gray-400 w-6 h-6" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'business-plan':
        return 'Business Plan';
      case 'articles':
        return 'Articles of Organization';
      case 'operating-agreement':
        return 'Operating Agreement';
      case 'ein':
        return 'EIN Confirmation';
      case 'certificate':
        return 'Business Certificate';
      default:
        return 'Document';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Documents</h1>
                <p className="text-gray-600">Manage your business documents and plans</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Upload size={18} className="mr-2" />
                Upload Document
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Filter size={20} className="text-gray-400 mr-2" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All Types</option>
                  <option value="business-plan">Business Plans</option>
                  <option value="articles">Articles</option>
                  <option value="operating-agreement">Operating Agreement</option>
                  <option value="ein">EIN</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              {/* Glow Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-50 rounded-lg mr-4">
                      {getDocumentIcon(doc.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {getDocumentTypeLabel(doc.type)} • {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === 'completed' ? (
                      <>
                        <button 
                          onClick={() => {
                            if (doc.type === 'business-plan') {
                              viewBusinessPlan(doc);
                            } else if (doc.url) {
                              window.open(doc.url, '_blank');
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Document"
                        >
                          <Eye size={20} />
                        </button>
                        <button 
                          onClick={() => downloadDocument(doc)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Download PDF"
                        >
                          <Download size={20} />
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={16} className="mr-2" />
                        {doc.status === 'pending' ? 'Pending' : 'Processing'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Upload your first document or generate a business plan to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Upload size={18} className="mr-2" />
                Upload Document
              </button>
            )}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && selectedBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Upload Document
                </h3>
                <FileUpload
                  businessId={selectedBusiness.id}
                  onUploadComplete={() => {
                    setShowUploadModal(false);
                    fetchDocuments();
                  }}
                />
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;