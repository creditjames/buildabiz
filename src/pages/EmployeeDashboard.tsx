import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  AlertCircle,
  Eye
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import FileUpload from '../components/FileUpload';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'business_name', direction: 'asc' });

  const statusOptions = [
    { value: 'pending', label: 'Order Received' },
    { value: 'processing', label: 'Processing' },
    { value: 'review', label: 'Under Review' },
    { value: 'filed', label: 'Filed with State' },
    { value: 'completed', label: 'Complete' }
  ];

  useEffect(() => {
    checkEmployeeAccess();
    fetchBusinesses();
  }, []);

  const checkEmployeeAccess = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (!user?.email?.endsWith('@wealthyallianceclub.com') && !user?.email?.endsWith('@buildabiz.com')) {
        navigate('/dashboard');
        return;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          documents (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinesses(data || []);
      setError('');
    } catch (error: any) {
      setError('Error loading businesses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBusinessStatus = async (businessId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', businessId);

      if (error) throw error;
      
      await fetchBusinesses();
      setError('');
    } catch (error: any) {
      setError('Error updating status: ' + error.message);
    }
  };

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedAndFilteredBusinesses = React.useMemo(() => {
    let filteredData = [...businesses];
    
    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(business => 
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filteredData = filteredData.filter(business => 
        business.status === statusFilter
      );
    }

    // Apply sorting
    return filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [businesses, searchTerm, statusFilter, sortConfig]);

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      review: 'bg-orange-100 text-orange-800',
      filed: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Clock className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
        <p className="text-gray-600">Manage customer orders and documents</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="text-red-500 mr-2 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by business name or entity type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter size={20} className="text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => fetchBusinesses()}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <RefreshCw size={20} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Businesses Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('business_name')}
                >
                  <div className="flex items-center">
                    Business Name
                    {sortConfig.key === 'business_name' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('entity_type')}
                >
                  <div className="flex items-center">
                    Entity Type
                    {sortConfig.key === 'entity_type' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === 'status' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAndFilteredBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {business.business_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {business.state}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {business.entity_type.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={business.status}
                      onChange={(e) => updateBusinessStatus(business.id, e.target.value)}
                      className={`text-sm rounded-full px-3 py-1 font-medium ${getStatusBadgeColor(business.status)}`}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {business.documents?.length || 0} Documents
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/customer/${business.id}`}
                        className="text-blue-500 hover:text-blue-600"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedBusiness(business);
                          setShowUploadModal(true);
                        }}
                        className="text-orange-500 hover:text-orange-600"
                        title="Upload Document"
                      >
                        <Upload size={18} />
                      </button>
                      <button 
                        className="text-gray-500 hover:text-gray-600"
                        title="Download Documents"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Upload Document - {selectedBusiness.business_name}
              </h3>
              <FileUpload
                businessId={selectedBusiness.id}
                onUploadComplete={() => {
                  setShowUploadModal(false);
                  fetchBusinesses();
                }}
              />
              <button
                onClick={() => setShowUploadModal(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;