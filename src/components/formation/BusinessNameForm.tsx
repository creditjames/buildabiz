import React, { useState } from 'react';
import { Search, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface BusinessNameFormProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const BusinessNameForm: React.FC<BusinessNameFormProps> = ({ formData, updateFormData }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [nameStatus, setNameStatus] = useState<'available' | 'unavailable' | ''>('');
  const [error, setError] = useState('');
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('businessName', e.target.value);
    setNameStatus('');
    setError('');
  };
  
  const checkAvailability = () => {
    if (!formData.businessName.trim()) {
      setError('Please enter a business name');
      return;
    }
    
    if (formData.businessName.length < 3) {
      setError('Business name must be at least 3 characters');
      return;
    }
    
    setError('');
    setIsChecking(true);
    
    // Simulate API call to check name availability
    setTimeout(() => {
      setIsChecking(false);
      // Random availability for demonstration
      const isAvailable = Math.random() > 0.3;
      setNameStatus(isAvailable ? 'available' : 'unavailable');
    }, 1500);
  };
  
  const getEntitySuffix = () => {
    switch (formData.entityType) {
      case 'llc':
        return 'LLC';
      case 'c-corp':
        return 'Inc.';
      case 's-corp':
        return 'Inc.';
      case 'nonprofit':
        return 'Corp.';
      default:
        return 'LLC';
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Business Name</h2>
      
      <div className="mb-6">
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
          Business Name
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-grow relative">
            <input
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={handleNameChange}
              placeholder={`e.g., Bright Ideas ${getEntitySuffix()}`}
              className={`w-full px-4 py-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
            />
            {nameStatus === 'available' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CheckCircle size={20} className="text-green-500" />
              </div>
            )}
            {nameStatus === 'unavailable' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <XCircle size={20} className="text-red-500" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={checkAvailability}
            disabled={isChecking}
            className={`px-4 py-3 rounded-md text-white font-medium transition-all duration-300 whitespace-nowrap ${
              isChecking
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-800 hover:shadow-md'
            }`}
          >
            {isChecking ? (
              <span className="flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                Checking...
              </span>
            ) : (
              <span className="flex items-center">
                <Search size={16} className="mr-1" />
                Check Availability
              </span>
            )}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
      
      {nameStatus === 'available' && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">
                "{formData.businessName}" appears to be available in {formData.state}!
              </p>
              <p className="text-sm text-green-700 mt-1">
                You can continue with this name. Final availability will be determined during filing.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {nameStatus === 'unavailable' && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex items-start">
            <XCircle size={20} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">
                "{formData.businessName}" appears to be unavailable in {formData.state}.
              </p>
              <p className="text-sm text-red-700 mt-1">
                Please try a different name. Consider adding words or changing the name slightly.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-medium text-blue-800 mb-2">Business Name Requirements</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your name must include "{getEntitySuffix()}" or equivalent designation</li>
          <li>• Cannot include words that would cause confusion with government agencies</li>
          <li>• Some words may require additional approval (e.g., "Bank", "Insurance")</li>
          <li>• Must be distinguishable from other business names registered in {formData.state}</li>
        </ul>
      </div>
    </div>
  );
};

export default BusinessNameForm;