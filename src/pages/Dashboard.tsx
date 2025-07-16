import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Clock, AlertCircle, FileText, Shield, FileSignature, 
  Building2, Briefcase, Bell, Download, Eye, LogOut, ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchBusinessData();
  }, []);

  useEffect(() => {
    if (!businessData?.id) return;

    // Set up real-time subscription for business updates
    const businessSubscription = supabase
      .channel('business_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'businesses',
          filter: `id=eq.${businessData.id}`
        },
        (payload) => {
          setBusinessData(payload.new);
        }
      )
      .subscribe();

    // Set up real-time subscription for document updates
    const documentSubscription = supabase
      .channel('document_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `business_id=eq.${businessData.id}`
        },
        () => {
          fetchDocuments(businessData.id);
        }
      )
      .subscribe();

    return () => {
      businessSubscription.unsubscribe();
      documentSubscription.unsubscribe();
    };
  }, [businessData?.id]);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) {
        navigate('/login');
        return;
      }
      setUserData(user);
      
      // Check if user is an employee
      const employeeDomains = ['@buildabiz.com', '@buildabiz.us', '@wealthyallianceclub.com'];
      const isEmp = employeeDomains.some(domain => user.email?.endsWith(domain));
      setIsEmployee(isEmp);
      
      // If employee, redirect to admin dashboard
      if (isEmp) {
        navigate('/admin-dashboard');
        return;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchDocuments = async (businessId: string) => {
    try {
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('business_id', businessId)
        .order('created_at', { ascending: true });

      if (documentsError) throw documentsError;
      setDocuments(documentsData || []);
    } catch (error: any) {
      setError('Error fetching documents: ' + error.message);
    }
  };

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: businessesData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user.id);

      if (businessError) throw businessError;

      if (businessesData && businessesData.length > 0) {
        setBusinessData(businessesData[0]);
        await fetchDocuments(businessesData[0].id);
        setError('');
      } else {
        setError('No business found. Please start a business formation to continue.');
        setBusinessData(null);
      }

      setLoading(false);
    } catch (error: any) {
      setError('Error fetching data: ' + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Clock className="animate-spin h-8 w-8 text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="text-red-500 mt-1 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700">{error}</p>
              {error.includes('No business found') && (
                <Link 
                  to="/formation"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Start Business Formation
                  <ArrowUpRight className="ml-2 -mr-1 h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600 mb-8">Get started by forming your business entity</p>
            <Link 
              to="/formation"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Start Business Formation
              <ArrowUpRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {businessData?.business_name}
                  </h1>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {businessData?.status?.charAt(0).toUpperCase() + businessData?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{businessData?.entity_type?.toUpperCase()}</span>
                  <span>•</span>
                  <span>{businessData?.state}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formation Progress */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Formation Progress</h2>
              <span className="text-sm font-medium text-gray-500">
                {businessData?.progress?.progress_percent || 0}% Complete
              </span>
            </div>
            
            <div className="relative mb-8">
              {/* Figma-style Progress Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-500 rounded-full"
                  style={{ width: `${businessData?.progress?.progress_percent || 0}%` }}
                >
                  <div className="animate-pulse absolute inset-0 bg-white opacity-20"></div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                {['Order Received', 'Processing', 'Under Review', 'Filed with State', 'Complete'].map((step, index) => (
                  <div 
                    key={step}
                    className={`text-sm ${
                      (businessData?.progress?.progress_percent || 0) >= index * 25 
                        ? 'text-orange-500 font-medium' 
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {documents.map((doc) => (
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
                      <FileText className="text-gray-400 w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-sm text-gray-500">
                        {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.status === 'completed' ? (
                      <>
                        <button 
                          onClick={() => window.open(doc.url, '_blank')}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button 
                          onClick={() => window.open(doc.url, '_blank')}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/services/ein"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Briefcase className="w-6 h-6 text-orange-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get an EIN</h3>
              <p className="text-sm text-gray-600">
                Apply for your Federal Tax ID Number to open a bank account and hire employees.
              </p>
            </div>
          </Link>
          
          <Link 
            to="/services/business-licenses"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Licenses</h3>
              <p className="text-sm text-gray-600">
                Get the required licenses and permits for your business type and location.
              </p>
            </div>
          </Link>
          
          <Link 
            to="/services/banking"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-orange-500" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Banking</h3>
              <p className="text-sm text-gray-600">
                Open a business bank account with our preferred banking partners.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;