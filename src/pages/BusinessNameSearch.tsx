import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Loader2, CheckCircle, XCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BusinessSearchResult {
  entityNumber: string;
  entityName: string;
  entityStatus: string;
  entityType: string;
  jurisdiction: string;
  registrationDate: string;
}

interface BusinessSearchResponse {
  results: BusinessSearchResult[];
  totalResults: number;
}

const BusinessNameSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialName = queryParams.get('name') || '';
  
  const [businessName, setBusinessName] = useState(initialName);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<'available' | 'unavailable' | ''>('');
  const [error, setError] = useState('');
  const [isTemporaryError, setIsTemporaryError] = useState(false);
  const [searchResults, setSearchResults] = useState<BusinessSearchResult[]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (initialName) {
      handleSearch(initialName);
    }
  }, [initialName]);
  
  const handleSearch = async (name: string) => {
    if (!name.trim()) {
      setError('Please enter a business name');
      return;
    }
    
    setError('');
    setIsSearching(true);
    setSearchResults([]);
    setAlternatives([]);
    setIsTemporaryError(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/business-search?search-term=${encodeURIComponent(name)}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search business name');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setSearchResults(data.results || []);

      // Check if name is potentially available
      const exactMatch = data.results?.some((result: BusinessSearchResult) => 
        result.entityName.toLowerCase() === name.toLowerCase()
      );

      setSearchResult(exactMatch ? 'unavailable' : 'available');

      // Generate alternatives if name is taken
      if (exactMatch) {
        const nameWords = name.replace(/(LLC|Inc\.|Corp\.)/i, '').trim().split(' ');
        const alternativesList = [
          `${nameWords[0]} Group LLC`,
          `${nameWords[0]} Solutions LLC`,
          `${nameWords.join(' ')} Co LLC`,
          `${nameWords[0]} ${nameWords.length > 1 ? nameWords[1] : ''} Enterprises LLC`,
          `California ${nameWords.join(' ')} LLC`
        ].filter(alt => 
          !data.results.some((result: BusinessSearchResult) => 
            result.entityName.toLowerCase() === alt.toLowerCase()
          )
        );
        setAlternatives(alternativesList);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';
      setError(errorMessage);
      setSearchResult('');
      setIsTemporaryError(errorMessage.includes('temporarily unavailable'));
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(businessName);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Business Name Search</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check if your desired business name is available in California before forming your company.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
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
          
          <div className="mt-6 text-sm text-gray-500">
            <p>
              This search checks availability in California only. Available results do not guarantee that the name complies with all naming requirements or trademark laws.
            </p>
          </div>
        </div>
        
        {error && (
          <div className={`bg-white rounded-lg shadow-md p-8 mb-8 ${isTemporaryError ? 'border-l-4 border-orange-500' : 'border-l-4 border-red-500'}`}>
            <div className="flex items-start">
              <AlertCircle size={24} className={`${isTemporaryError ? 'text-orange-500' : 'text-red-500'} mr-4 mt-1 flex-shrink-0`} />
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isTemporaryError ? 'Temporary Service Interruption' : 'Error'}
                </h3>
                <p className="text-gray-600 mb-4">{error}</p>
                {isTemporaryError && (
                  <button
                    onClick={() => handleSearch(businessName)}
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Try again
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {isSearching && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Loader2 size={40} className="animate-spin mx-auto text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Checking Availability</h3>
            <p className="text-gray-600">
              Searching California business records for "{businessName}"...
            </p>
          </div>
        )}
        
        {!isSearching && !error && searchResult && (
          <div className="bg-white rounded-lg shadow-md p-8">
            {searchResult === 'available' ? (
              <div className="text-center mb-8">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  "{businessName}" appears to be available!
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on our search, this name may be available for registration in California.
                </p>
                <Link 
                  to={`/formation?businessName=${encodeURIComponent(businessName)}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-md font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 group overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center">
                    <span className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}>
                      Launch File
                    </span>
                    <ArrowRight 
                      size={18} 
                      className={`ml-2 transition-all duration-300 ${
                        isHovered ? 'translate-x-2 animate-pulse' : ''
                      }`}
                    />
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 transition-transform duration-300 ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  } origin-left`}></div>
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <XCircle size={40} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    "{businessName}" appears to be unavailable
                  </h3>
                  <p className="text-gray-600">
                    Based on our search, this name may already be in use or reserved in California.
                  </p>
                </div>

                {searchResults.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Similar Business Names Found:</h4>
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900">{result.entityName}</h5>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Type:</span> {result.entityType}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {result.entityStatus}
                            </div>
                            <div>
                              <span className="font-medium">Jurisdiction:</span> {result.jurisdiction}
                            </div>
                            <div>
                              <span className="font-medium">Registered:</span> {new Date(result.registrationDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    Available Alternatives
                  </h4>
                  <ul className="space-y-4">
                    {alternatives.map((name, index) => (
                      <li key={index} className="flex items-start p-4 rounded-md bg-gray-50 hover:bg-green-50 transition-colors">
                        <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-grow">
                          <p className="font-medium text-gray-900">{name}</p>
                          <div className="mt-2">
                            <Link 
                              to={`/formation?businessName=${encodeURIComponent(name)}`}
                              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                            >
                              Use this name
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/formation"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center"
                  >
                    <span>Continue with a different name</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="flex items-start">
            <AlertCircle size={24} className="text-orange-500 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Important Information</h3>
              <p className="text-gray-600 mb-4">
                This search provides a preliminary check for name availability, but is not a guarantee. The final determination of name availability is made by the California Secretary of State during the filing process.
              </p>
              <p className="text-gray-600">
                For more information about business name requirements, visit the <a href="https://www.sos.ca.gov/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">California Secretary of State website</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessNameSearch;