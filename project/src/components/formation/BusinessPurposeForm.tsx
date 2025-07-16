import React from 'react';
import { Info } from 'lucide-react';

interface BusinessPurposeFormProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const commonPurposes = [
  'General business purposes permitted by law',
  'Professional services',
  'Retail sales',
  'Real estate investment and management',
  'Technology services and consulting',
  'Food and beverage services',
  'Construction and contracting',
  'Manufacturing and distribution',
  'Healthcare services'
];

const BusinessPurposeForm: React.FC<BusinessPurposeFormProps> = ({ formData, updateFormData }) => {
  const handlePurposeChange = (purpose: string) => {
    updateFormData('businessPurpose', purpose);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Purpose</h2>
      <p className="text-gray-600 mb-6">
        Describe the main activities and purpose of your business. This will appear in your formation documents.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              Why we need this information
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Most states require a brief description of your business activities. You can choose a general purpose statement or provide a specific description of your business.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="businessPurpose" className="block text-sm font-medium text-gray-700 mb-2">
          Business Purpose
        </label>
        <textarea
          id="businessPurpose"
          value={formData.businessPurpose}
          onChange={(e) => handlePurposeChange(e.target.value)}
          placeholder="Describe your business activities..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          required
        />
      </div>
      
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-3">Common Business Purpose Statements</h3>
        <p className="text-sm text-gray-600 mb-4">
          Click on any of these common statements to use for your business:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonPurposes.map((purpose, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePurposeChange(purpose)}
              className="text-left px-4 py-3 border border-gray-300 rounded-md hover:border-orange-500 hover:bg-orange-50 transition-colors text-sm"
            >
              {purpose}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-md font-medium text-gray-900 mb-3">Business Activities</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the primary industry or activities of your business:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Agriculture & Farming',
            'Construction',
            'Finance & Insurance',
            'Food & Hospitality',
            'Healthcare',
            'Information Technology',
            'Manufacturing',
            'Professional Services',
            'Real Estate',
            'Retail & Wholesale',
            'Transportation',
            'Other'
          ].map((industry, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`industry-${index}`}
                type="checkbox"
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor={`industry-${index}`} className="ml-2 text-sm text-gray-700">
                {industry}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessPurposeForm;