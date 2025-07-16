import React from 'react';
import { Info, Check, X } from 'lucide-react';
import { useFormation } from '../../context/FormationContext';

interface PackageSelectionProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({ formData, updateFormData }) => {
  const { calculateTotalPrice } = useFormation();
  
  const handlePackageSelect = (packageType: string) => {
    updateFormData('selectedPackage', packageType);
  };
  
  const packageFeatures = {
    basic: {
      name: 'Basic',
      price: 199,
      description: 'Essential formation service with the basics to get started',
      features: [
        { name: 'Business Name Search', included: true },
        { name: 'Articles Filing', included: true },
        { name: 'Online Document Access', included: true },
        { name: 'Free Registered Agent (1st year)', included: true },
        { name: 'EIN / Tax ID Number', included: false },
        { name: 'Operating Agreement', included: false },
        { name: 'Banking Resolution', included: false },
        { name: 'Business Tax Assessment', included: false },
        { name: 'Compliance Alerts', included: false },
        { name: 'Expedited Filing', included: false },
        { name: 'Business Contract Templates', included: false }
      ]
    },
    standard: {
      name: 'Standard',
      price: 399,
      description: 'Complete formation with essential legal and tax features',
      features: [
        { name: 'Business Name Search', included: true },
        { name: 'Articles Filing', included: true },
        { name: 'Online Document Access', included: true },
        { name: 'Free Registered Agent (1st year)', included: true },
        { name: 'EIN / Tax ID Number', included: true },
        { name: 'Operating Agreement', included: true },
        { name: 'Banking Resolution', included: true },
        { name: 'Business Tax Assessment', included: true },
        { name: 'Compliance Alerts', included: true },
        { name: 'Expedited Filing', included: false },
        { name: 'Business Contract Templates', included: false }
      ]
    },
    premium: {
      name: "Pro'Preneur",
      price: 999,
      description: 'Complete formation with advanced features and expedited filing',
      features: [
        { name: 'Business Name Search', included: true },
        { name: 'Articles Filing', included: true },
        { name: 'Online Document Access', included: true },
        { name: 'Free Registered Agent (1st year)', included: true },
        { name: 'EIN / Tax ID Number', included: true },
        { name: 'Operating Agreement', included: true },
        { name: 'Banking Resolution', included: true },
        { name: 'Business Tax Assessment', included: true },
        { name: 'Compliance Alerts', included: true },
        { name: 'Expedited Filing', included: true },
        { name: 'Business Contract Templates', included: true }
      ]
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Formation Package</h2>
      <p className="text-gray-600 mb-6">
        Choose the package that best fits your business needs and budget.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              State Filing Fee Included
            </p>
            <p className="text-sm text-blue-700 mt-1">
              All packages include the {formData.state} state filing fee of ${calculateTotalPrice(formData.state, 'basic') - 199}. This fee is required by the state to process your business formation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(packageFeatures).map(([key, pkg]: [string, any]) => (
          <div 
            key={key}
            className={`border rounded-lg overflow-hidden transition-all hover:shadow-md ${
              formData.selectedPackage === key ? 'border-orange-500 shadow-md' : 'border-gray-200'
            } ${key === 'standard' ? 'relative' : ''}`}
          >
            {key === 'standard' && (
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium">
                Popular
              </div>
            )}
            
            <div className={`p-6 ${key === 'standard' ? 'bg-orange-50' : 'bg-gray-50'} border-b border-gray-200`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                <span className="text-gray-500 ml-2">+ state fee</span>
              </div>
              <p className="text-gray-600 text-sm">
                {pkg.description}
              </p>
            </div>
            
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature: any, i: number) => (
                  <li key={i} className="flex items-start text-sm">
                    {feature.included ? (
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    ) : (
                      <X size={18} className="text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>{feature.name}</span>
                  </li>
                ))}
              </ul>
              
              <button
                type="button"
                onClick={() => handlePackageSelect(key)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  formData.selectedPackage === key
                    ? key === 'standard'
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-800 text-white hover:bg-gray-900'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {formData.selectedPackage === key ? 'Selected' : 'Select'}
              </button>
              
              <div className="text-center mt-3 text-sm text-gray-500">
                Total: ${calculateTotalPrice(formData.state, key)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Formation Processing Time</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`border rounded-lg p-5 ${
            formData.selectedPackage === 'premium' ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900">Expedited Filing</h4>
              <span className={`text-sm font-medium px-2 py-1 rounded ${
                formData.selectedPackage === 'premium' ? 'bg-orange-200 text-orange-800' : 'bg-gray-200 text-gray-600'
              }`}>
                Pro'Preneur Only
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Your filing will be processed by the state with priority status. Typical processing time: 2-5 business days.
            </p>
            <p className="text-sm font-medium text-gray-900">
              Included with: Pro'Preneur Package
            </p>
          </div>
          
          <div className={`border rounded-lg p-5 ${
            formData.selectedPackage !== 'premium' ? 'border-gray-300 bg-gray-50' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900">Standard Filing</h4>
              <span className="text-sm font-medium px-2 py-1 rounded bg-gray-200 text-gray-600">
                Basic & Standard
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Your filing will be processed by the state in the order it was received. Typical processing time: 10-15 business days.
            </p>
            <p className="text-sm font-medium text-gray-900">
              Included with: Basic & Standard Packages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSelection;