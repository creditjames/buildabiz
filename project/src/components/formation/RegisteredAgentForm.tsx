import React from 'react';
import { Info, XCircle } from 'lucide-react';

interface RegisteredAgentFormProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}

const RegisteredAgentForm: React.FC<RegisteredAgentFormProps> = ({ formData, updateFormData }) => {
  const handleAgentChange = (field: string, value: string) => {
    updateFormData('registeredAgent', {
      ...formData.registeredAgent,
      [field]: value
    });
  };
  
  const toggleUseRegisteredAgent = () => {
    updateFormData('useRegisteredAgent', !formData.useRegisteredAgent);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Registered Agent</h2>
      <p className="text-gray-600 mb-6">
        Every business entity is required to have a registered agent in {formData.state} to receive legal documents and government notices.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <div className="flex items-start">
          <Info size={20} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              Free Registered Agent Service
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Your formation package includes FREE registered agent service for the first year ($119 value). We'll receive legal documents on behalf of your business and notify you immediately.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="useOurAgent"
              name="registeredAgentOption"
              type="radio"
              checked={formData.useRegisteredAgent}
              onChange={toggleUseRegisteredAgent}
              className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="useOurAgent" className="text-md font-medium text-gray-900">
              Use our Registered Agent service (FREE for the first year)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              We'll serve as your registered agent and handle all official mail and service of process.
            </p>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="useOwnAgent"
              name="registeredAgentOption"
              type="radio"
              checked={!formData.useRegisteredAgent}
              onChange={toggleUseRegisteredAgent}
              className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="useOwnAgent" className="text-md font-medium text-gray-900">
              I'll provide my own Registered Agent
            </label>
            <p className="text-sm text-gray-500 mt-1">
              You can appoint yourself, a colleague, or another service as your registered agent.
            </p>
          </div>
        </div>
        
        {!formData.useRegisteredAgent && (
          <div className="rounded-md bg-yellow-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Requirements</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Your registered agent must have a physical address in {formData.state} (no P.O. boxes)</li>
                    <li>They must be available during business hours to receive legal documents</li>
                    <li>Their name and address will appear on public records</li>
                    <li>If you act as your own agent, you must use your business address</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!formData.useRegisteredAgent && (
          <div className="space-y-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Registered Agent Information</h3>
            
            <div>
              <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="agentName"
                value={formData.registeredAgent.name}
                onChange={(e) => handleAgentChange('name', e.target.value)}
                placeholder="Full legal name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agentStreet" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="agentStreet"
                value={formData.registeredAgent.street}
                onChange={(e) => handleAgentChange('street', e.target.value)}
                placeholder="123 Main St"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agentUnit" className="block text-sm font-medium text-gray-700 mb-2">
                Apartment, Suite, Unit, etc. (optional)
              </label>
              <input
                type="text"
                id="agentUnit"
                value={formData.registeredAgent.unit}
                onChange={(e) => handleAgentChange('unit', e.target.value)}
                placeholder="Suite 101"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="agentCity" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="agentCity"
                  value={formData.registeredAgent.city}
                  onChange={(e) => handleAgentChange('city', e.target.value)}
                  placeholder="San Francisco"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="agentState" className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  id="agentState"
                  value={formData.registeredAgent.state}
                  onChange={(e) => handleAgentChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white"
                  required
                >
                  <option value="CA">California</option>
                </select>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <label htmlFor="agentZipCode" className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="agentZipCode"
                value={formData.registeredAgent.zipCode}
                onChange={(e) => handleAgentChange('zipCode', e.target.value)}
                placeholder="94105"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredAgentForm;