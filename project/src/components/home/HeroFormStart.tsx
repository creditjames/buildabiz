import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const HeroFormStart = () => {
  const navigate = useNavigate();
  const [entityType, setEntityType] = useState('');
  const [state, setState] = useState('');
  
  const entityTypes = [
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'c-corp', label: 'C Corporation' },
    { value: 's-corp', label: 'S Corporation' },
    { value: 'nonprofit', label: 'Nonprofit' }
  ];
  
  const states = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entityType && state) {
      navigate(`/formation?entityType=${entityType}&state=${state}`);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Start Your Business Today</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-2">
            What type of business would you like to form?
          </label>
          <div className="relative">
            <select
              id="entityType"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select Business Type</option>
              {entityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            Which state would you like to form in?
          </label>
          <div className="relative">
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            >
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-white font-medium transition-all duration-300 ${
            entityType && state
              ? 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!entityType || !state}
        >
          <span>Continue</span>
          <ArrowRight size={18} className="ml-2" />
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <div className="inline-flex items-center">
          <div className="h-px w-16 bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="h-px w-16 bg-gray-200"></div>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => navigate('/compare-entities')}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            Not sure which entity is right for you? Take our quiz →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroFormStart;