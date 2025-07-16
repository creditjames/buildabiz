import React from 'react';
import { Info } from 'lucide-react';

interface BusinessAddressFormProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const BusinessAddressForm: React.FC<BusinessAddressFormProps> = ({ formData, updateFormData }) => {
  const handleAddressChange = (field: string, value: string) => {
    updateFormData('businessAddress', {
      ...formData.businessAddress,
      [field]: value
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Address</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              Why we need this information
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Your business address will be used for official correspondence and will appear on public records. This should be a physical address, not a P.O. Box.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            value={formData.businessAddress.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            placeholder="123 Business Ave"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
            Apartment, Suite, Unit, etc. (optional)
          </label>
          <input
            type="text"
            id="unit"
            value={formData.businessAddress.unit}
            onChange={(e) => handleAddressChange('unit', e.target.value)}
            placeholder="Suite 101"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.businessAddress.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              placeholder="San Francisco"
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              id="state"
              value={formData.businessAddress.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
              required
            >
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="IL">Illinois</option>
            </select>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            value={formData.businessAddress.zipCode}
            onChange={(e) => handleAddressChange('zipCode', e.target.value)}
            placeholder="94105"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="mailingAddress"
              type="checkbox"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="mailingAddress" className="text-sm font-medium text-gray-700">
              My mailing address is different from my business address
            </label>
            <p className="text-xs text-gray-500 mt-1">
              If checked, you'll be able to add a separate mailing address for correspondence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAddressForm;