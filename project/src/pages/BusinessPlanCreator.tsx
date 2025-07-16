import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Loader2, CheckCircle, Building2, User, MapPin, Target, DollarSign, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import jsPDF from 'jspdf';

interface CompanyDetails {
  companyName: string;
  industry: string;
  location: string;
  targetMarket: string;
  businessModel: string;
  fundingGoal: string;
  keyProducts: string;
  competitiveAdvantage: string;
  founderBackground: string;
}

const BusinessPlanCreator = () => {
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [brandColor, setBrandColor] = useState('#FF5A1F');
  const [planSaved, setPlanSaved] = useState(false);
  const [error, setError] = useState('');
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    industry: '',
    location: '',
    targetMarket: '',
    businessModel: '',
    fundingGoal: '',
    keyProducts: '',
    competitiveAdvantage: '',
    founderBackground: ''
  });

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: businessesData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (businessError) throw businessError;

      if (businessesData && businessesData.length > 0) {
        setBusinessData(businessesData[0]);
        
        // Get brand color from business_plan object or use default
        const existingBrandColor = businessesData[0].business_plan?.brand_color || '#FF5A1F';
        setBrandColor(existingBrandColor);
        
        // Pre-populate form with existing business data
        setCompanyDetails(prev => ({
          ...prev,
          companyName: businessesData[0].business_name || '',
          location: businessesData[0].state || '',
          industry: businessesData[0].business_purpose || ''
        }));

        // Check if business plan already exists
        if (businessesData[0].business_plan) {
          setGeneratedPlan(businessesData[0].business_plan.content || '');
          setPlanSaved(true);
        }
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching business data:', error);
      setError('Error fetching business data: ' + error.message);
      setLoading(false);
    }
  };

  const generateBusinessPlan = async () => {
    try {
      setGenerating(true);
      setError('');
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-business-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          section: 'complete_plan',
          businessData: companyDetails,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate business plan');
      }

      const { content } = await response.json();
      setGeneratedPlan(content);
      setPlanSaved(false); // Reset saved status since we have new content
      
    } catch (error: any) {
      console.error('Error generating business plan:', error);
      setError('Error generating business plan: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const saveBusinessPlan = async () => {
    if (!generatedPlan || !businessData) {
      setError('No business plan to save');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Save the business plan to the business record
      const { error: businessError } = await supabase
        .from('businesses')
        .update({
          business_plan: {
            content: generatedPlan,
            company_details: companyDetails,
            generated_at: new Date().toISOString(),
            brand_color: brandColor
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', businessData.id);

      if (businessError) throw businessError;

      // Create a document record for the business plan
      const { error: documentError } = await supabase
        .from('documents')
        .insert({
          business_id: businessData.id,
          name: `${companyDetails.companyName} - Business Plan`,
          type: 'business-plan',
          status: 'completed',
          uploaded_at: new Date().toISOString(),
          bucket_id: 'business-documents'
        });

      if (documentError) {
        // If document already exists, update it
        const { error: updateError } = await supabase
          .from('documents')
          .update({
            name: `${companyDetails.companyName} - Business Plan`,
            updated_at: new Date().toISOString()
          })
          .eq('business_id', businessData.id)
          .eq('type', 'business-plan');

        if (updateError) throw updateError;
      }

      setPlanSaved(true);
      
    } catch (error: any) {
      console.error('Error saving business plan:', error);
      setError('Error saving business plan: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = async () => {
    if (!generatedPlan) {
      setError('Please generate a business plan first');
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      // Set brand color for headings
      const hexColor = brandColor.replace('#', '');
      const r = parseInt(hexColor.substr(0, 2), 16);
      const g = parseInt(hexColor.substr(2, 2), 16);
      const b = parseInt(hexColor.substr(4, 2), 16);
      
      let yPosition = margin;
      
      // Title page
      doc.setTextColor(r, g, b);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('BUSINESS PLAN', pageWidth / 2, yPosition + 40, { align: 'center' });
      
      doc.setFontSize(20);
      doc.text(companyDetails.companyName, pageWidth / 2, yPosition + 60, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition + 80, { align: 'center' });
      
      // Add new page for content
      doc.addPage();
      yPosition = margin;
      
      // Split content into lines and add to PDF
      const lines = doc.splitTextToSize(generatedPlan, maxWidth);
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if line is a heading (starts with # or number or contains section keywords)
        if (line.match(/^#+\s/) || line.match(/^\d+\./) || line.includes('Executive Summary') || line.includes('Company Description') || 
            line.includes('Market Analysis') || line.includes('Organization') || line.includes('Product Line') ||
            line.includes('Marketing') || line.includes('Funding') || line.includes('Financial') || line.includes('Implementation') ||
            line.includes('Risk Analysis')) {
          doc.setTextColor(r, g, b);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
        }
        
        // Check if we need a new page
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.text(line, margin, yPosition);
        yPosition += doc.getLineHeight() + 2;
      }
      
      // Add signature page
      doc.addPage();
      yPosition = pageHeight - 60;
      
      doc.setTextColor(r, g, b);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('Prepared by:', margin, yPosition);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.text(companyDetails.companyName, margin, yPosition + 20);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition + 35);
      
      // Save the PDF
      doc.save(`${companyDetails.companyName}_Business_Plan.pdf`);

      // Auto-save the plan if not already saved
      if (!planSaved) {
        await saveBusinessPlan();
      }
    } catch (error: any) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF: ' + error.message);
    }
  };

  const updateCompanyDetails = (field: keyof CompanyDetails, value: string) => {
    setCompanyDetails(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset saved status when details change
    if (planSaved) {
      setPlanSaved(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">AI Business Plan Generator</h1>
                <p className="text-gray-600">Create a comprehensive business plan with AI assistance</p>
              </div>
              <div className="flex items-center gap-4">
                {generatedPlan && (
                  <>
                    <button
                      onClick={saveBusinessPlan}
                      disabled={saving || planSaved}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                        planSaved 
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : saving
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {saving ? (
                        <Loader2 size={18} className="mr-2 animate-spin" />
                      ) : planSaved ? (
                        <CheckCircle size={18} className="mr-2" />
                      ) : (
                        <Save size={18} className="mr-2" />
                      )}
                      {planSaved ? 'Saved to Documents' : saving ? 'Saving...' : 'Save to Documents'}
                    </button>
                    <button
                      onClick={generatePDF}
                      className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                    >
                      <Download size={18} className="mr-2" />
                      Download PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Company Details Form */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Company Name
              </label>
              <input
                type="text"
                value={companyDetails.companyName}
                onChange={(e) => updateCompanyDetails('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target size={16} className="inline mr-2" />
                Industry
              </label>
              <input
                type="text"
                value={companyDetails.industry}
                onChange={(e) => updateCompanyDetails('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Technology, Healthcare, Retail"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Location
              </label>
              <input
                type="text"
                value={companyDetails.location}
                onChange={(e) => updateCompanyDetails('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="City, State or Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Target Market
              </label>
              <input
                type="text"
                value={companyDetails.targetMarket}
                onChange={(e) => updateCompanyDetails('targetMarket', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Who are your customers?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Model
              </label>
              <input
                type="text"
                value={companyDetails.businessModel}
                onChange={(e) => updateCompanyDetails('businessModel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="How do you make money?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-2" />
                Funding Goal
              </label>
              <input
                type="text"
                value={companyDetails.fundingGoal}
                onChange={(e) => updateCompanyDetails('fundingGoal', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="How much funding do you need?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Products/Services
              </label>
              <textarea
                value={companyDetails.keyProducts}
                onChange={(e) => updateCompanyDetails('keyProducts', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe your main products or services"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Competitive Advantage
              </label>
              <textarea
                value={companyDetails.competitiveAdvantage}
                onChange={(e) => updateCompanyDetails('competitiveAdvantage', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="What makes you different from competitors?"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Founder Background
              </label>
              <textarea
                value={companyDetails.founderBackground}
                onChange={(e) => updateCompanyDetails('founderBackground', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell us about the founding team's experience"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={generateBusinessPlan}
              disabled={generating || !companyDetails.companyName || !companyDetails.industry}
              className={`w-full flex items-center justify-center px-6 py-4 rounded-lg text-white font-medium transition-all ${
                generating || !companyDetails.companyName || !companyDetails.industry
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {generating ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Generating Business Plan...
                </>
              ) : (
                <>
                  <Sparkles size={20} className="mr-2" />
                  Generate Business Plan with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Plan Preview */}
        {generatedPlan && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Generated Business Plan</h2>
              <div className="flex items-center gap-4">
                {planSaved && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle size={20} className="mr-2" />
                    <span className="text-sm font-medium">Saved to Documents</span>
                  </div>
                )}
                <div className="flex items-center text-green-600">
                  <CheckCircle size={20} className="mr-2" />
                  <span className="text-sm font-medium">Plan Generated Successfully</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {generatedPlan}
              </pre>
            </div>
            
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={saveBusinessPlan}
                disabled={saving || planSaved}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  planSaved 
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : saving
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {saving ? (
                  <Loader2 size={20} className="mr-2 animate-spin" />
                ) : planSaved ? (
                  <CheckCircle size={20} className="mr-2" />
                ) : (
                  <Save size={20} className="mr-2" />
                )}
                {planSaved ? 'Saved to Documents' : saving ? 'Saving...' : 'Save to Documents'}
              </button>
              
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                <Download size={20} className="mr-2" />
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPlanCreator;