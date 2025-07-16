import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';

const QuickStartWidget = () => {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName.trim()) {
      setError('Please enter a business name');
      return;
    }
    
    setError('');
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/business-name-search?name=${encodeURIComponent(businessName)}`);
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Check If Your Business Name Is Available</h3>
        <p className="text-gray-600">
          Search the California Secretary of State database to see if your desired business name is available.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                setError('');
              }}
              placeholder="Enter your desired business name"
              className={`w-full pl-10 pr-4 py-3 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className={`px-6 py-3 rounded-md text-white font-medium transition-all duration-300 ${
              isSearching
                ? 'bg-orange-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'
            }`}
          >
            {isSearching ? (
              <span className="flex items-center">
                <Loader2 size={18} className="animate-spin mr-2" />
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          This search checks name availability in California only. It does not reserve the name.
        </p>
      </div>
    </div>
  );
};

export default QuickStartWidget;