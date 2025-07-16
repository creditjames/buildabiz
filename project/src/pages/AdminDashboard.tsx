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
  Eye,
  Edit,
  MessageSquare,
  DollarSign,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Send,
  X,
  Save,
  Trash2,
  Settings,
  UserPlus,
  Shield
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import FileUpload from '../components/FileUpload';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBusinessModal, setShowBusinessModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingBusiness, setEditingBusiness] = useState<any>(null);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'created_at', direction: 'desc' });

  const statusOptions = [
    { value: 'pending', label: 'Order Received', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { value: 'review', label: 'Under Review', color: 'bg-orange-100 text-orange-800' },
    { value: 'filed', label: 'Filed with State', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Complete', color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    checkEmployeeAccess();
    fetchBusinesses();
    fetchAdminUsers();
  }, []);

  const checkEmployeeAccess = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      const employeeDomains = ['@buildabiz.com', '@buildabiz.us', '@wealthyallianceclub.com'];
      const isEmployee = employeeDomains.some(domain => user?.email?.endsWith(domain));
      
      if (!isEmployee) {
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
      
      // Get all businesses with their documents
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select(`
          *,
          documents (*)
        `)
        .order('created_at', { ascending: false });

      if (businessError) throw businessError;

      // Add placeholder user information since we can't access admin API from client
      const businessesWithUsers = (businessData || []).map((business) => ({
        ...business,
        user_email: 'Admin access required',
        user_name: 'Admin access required'
      }));

      setBusinesses(businessesWithUsers);
      setError('');
    } catch (error: any) {
      console.error('Error loading businesses:', error);
      setError('Error loading businesses: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select(`
          *,
          created_by_user:auth.users!admin_users_created_by_fkey(email)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (adminError) throw adminError;
      setAdminUsers(adminData || []);
    } catch (error: any) {
      console.error('Error loading admin users:', error);
    }
  };

  const createAdminUser = async () => {
    if (!newAdminEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    try {
      const { data, error } = await supabase.rpc('create_admin_user', {
        admin_email: newAdminEmail,
        admin_password: newAdminPassword || 'TempPassword123!'
      });

      if (error) throw error;

      if (data.success) {
        setNewAdminEmail('');
        setNewAdminPassword('');
        setShowAdminModal(false);
        fetchAdminUsers();
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError('Error creating admin user: ' + error.message);
    }
  };

  const revokeAdminAccess = async (userId: string) => {
    if (!confirm('Are you sure you want to revoke admin access for this user?')) {
      return;
    }

    try {
      const { data, error } = await supabase.rpc('revoke_admin_access', {
        target_user_id: userId
      });

      if (error) throw error;

      if (data.success) {
        fetchAdminUsers();
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError('Error revoking admin access: ' + error.message);
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

  const updateBusiness = async (businessData: any) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          business_name: businessData.business_name,
          entity_type: businessData.entity_type,
          state: businessData.state,
          business_purpose: businessData.business_purpose,
          business_address: businessData.business_address,
          updated_at: new Date().toISOString()
        })
        .eq('id', businessData.id);

      if (error) throw error;
      
      await fetchBusinesses();
      setShowBusinessModal(false);
      setEditingBusiness(null);
    } catch (error: any) {
      setError('Error updating business: ' + error.message);
    }
  };

  const deleteBusiness = async (businessId: string) => {
    if (!confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
      return;
    }

    try {
      // First delete associated documents
      await supabase
        .from('documents')
        .delete()
        .eq('business_id', businessId);

      // Then delete the business
      const { error } = await supabase
        .from('businesses')
        .delete()
        .eq('id', businessId);

      if (error) throw error;
      
      await fetchBusinesses();
      setShowBusinessModal(false);
    } catch (error: any) {
      setError('Error deleting business: ' + error.message);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedBusiness) return;

    try {
      // In a real app, you'd send this via email or notification system
      // For now, we'll just show a success message
      alert(`Message sent to ${selectedBusiness.business_name} (${selectedBusiness.user_email}):\n\n${message}`);
      setMessage('');
      setShowMessageModal(false);
    } catch (error: any) {
      setError('Error sending message: ' + error.message);
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
        business.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.user_email.toLowerCase().includes(searchTerm.toLowerCase())
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
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'bg-gray-100 text-gray-800';
  };

  const getProgressPercentage = (status: string) => {
    const progressMap: { [key: string]: number } = {
      pending: 0,
      processing: 25,
      review: 50,
      filed: 75,
      completed: 100
    };
    return progressMap[status] || 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Clock className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all business formations and customer communications</p>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Settings size={18} className="mr-2" />
            Admin Settings
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="text-red-500 mr-2 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Businesses</p>
                <p className="text-2xl font-bold text-gray-900">{businesses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {businesses.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {businesses.filter(b => b.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Admin Users</p>
                <p className="text-2xl font-bold text-gray-900">{adminUsers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by business name, entity type, state, or customer email..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
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
                        {business.user_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {business.user_email}
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
                        className={`text-sm rounded-full px-3 py-1 font-medium border-0 ${getStatusBadgeColor(business.status)}`}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(business.status)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getProgressPercentage(business.status)}% Complete
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {business.documents?.length || 0} Documents
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(business.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/customer/${business.id}`}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => {
                            setEditingBusiness(business);
                            setShowBusinessModal(true);
                          }}
                          className="text-green-500 hover:text-green-600 p-1 rounded hover:bg-green-50 transition-colors"
                          title="Edit Business"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBusiness(business);
                            setShowUploadModal(true);
                          }}
                          className="text-orange-500 hover:text-orange-600 p-1 rounded hover:bg-orange-50 transition-colors"
                          title="Upload Document"
                        >
                          <Upload size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBusiness(business);
                            setShowMessageModal(true);
                          }}
                          className="text-purple-500 hover:text-purple-600 p-1 rounded hover:bg-purple-50 transition-colors"
                          title="Send Message"
                        >
                          <MessageSquare size={18} />
                        </button>
                        <button 
                          onClick={() => deleteBusiness(business.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Business"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedAndFilteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'No business formations have been submitted yet'}
              </p>
            </div>
          )}
        </div>

        {/* Admin Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Admin Settings</h3>
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'overview'
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('admins')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'admins'
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Admin Users
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">System Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Businesses:</span>
                            <span className="font-medium">{businesses.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Active Admins:</span>
                            <span className="font-medium">{adminUsers.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pending Orders:</span>
                            <span className="font-medium">{businesses.filter(b => b.status === 'pending').length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              setActiveTab('admins');
                              setShowAdminModal(true);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded"
                          >
                            Add New Admin
                          </button>
                          <button
                            onClick={() => fetchBusinesses()}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                          >
                            Refresh Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'admins' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-900">Admin Users</h4>
                      <button
                        onClick={() => setShowAdminModal(true)}
                        className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                      >
                        <UserPlus size={18} className="mr-2" />
                        Add Admin
                      </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {adminUsers.map((admin) => (
                            <tr key={admin.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Shield className="w-5 h-5 text-purple-500 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">{admin.email}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {admin.created_by_user?.email || 'System'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(admin.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => revokeAdminAccess(admin.user_id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Revoke Access
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Admin Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Add New Admin</h3>
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="admin@buildabiz.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be from @buildabiz.com, @buildabiz.us, or @wealthyallianceclub.com
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> If the user doesn't exist in Supabase Auth, you'll need to create them manually first in the Supabase dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createAdminUser}
                    disabled={!newAdminEmail.trim()}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400 flex items-center"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business Details Modal */}
        {showBusinessModal && (selectedBusiness || editingBusiness) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingBusiness ? 'Edit Business' : 'Business Details'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowBusinessModal(false);
                      setSelectedBusiness(null);
                      setEditingBusiness(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {editingBusiness ? (
                  <BusinessEditForm 
                    business={editingBusiness}
                    onSave={updateBusiness}
                    onCancel={() => {
                      setShowBusinessModal(false);
                      setEditingBusiness(null);
                    }}
                  />
                ) : (
                  <BusinessDetailsView business={selectedBusiness} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && selectedBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Upload Document - {selectedBusiness.business_name}
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <FileUpload
                  businessId={selectedBusiness.id}
                  onUploadComplete={() => {
                    setShowUploadModal(false);
                    fetchBusinesses();
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Send Message to {selectedBusiness.business_name}
                  </h3>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>To:</strong> {selectedBusiness.user_email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Business:</strong> {selectedBusiness.business_name}
                    </p>
                  </div>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Type your message here..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-400 flex items-center"
                  >
                    <Send size={16} className="mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Business Details View Component
const BusinessDetailsView: React.FC<{ business: any }> = ({ business }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Business Name</label>
          <p className="text-lg font-semibold text-gray-900">{business.business_name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Customer</label>
          <p className="text-gray-900">{business.user_name}</p>
          <p className="text-sm text-gray-500">{business.user_email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Entity Type</label>
          <p className="text-gray-900">{business.entity_type.toUpperCase()}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">State</label>
          <p className="text-gray-900">{business.state}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Status</label>
          <p className="text-gray-900">{business.status}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Business Purpose</label>
          <p className="text-gray-900">{business.business_purpose}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Package</label>
          <p className="text-gray-900">{business.selected_package}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Created</label>
          <p className="text-gray-900">{new Date(business.created_at).toLocaleDateString()}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500">Last Updated</label>
          <p className="text-gray-900">{new Date(business.updated_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    
    {business.business_address && (
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Business Address</label>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-900">
            {business.business_address.street}
            {business.business_address.unit && `, ${business.business_address.unit}`}
            <br />
            {business.business_address.city}, {business.business_address.state} {business.business_address.zipCode}
          </p>
        </div>
      </div>
    )}
    
    {business.documents && business.documents.length > 0 && (
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-2">Documents</label>
        <div className="space-y-2">
          {business.documents.map((doc: any) => (
            <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div>
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.type} • {doc.status}</p>
                {doc.uploaded_at && (
                  <p className="text-xs text-gray-400">
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              {doc.url && (
                <button
                  onClick={() => window.open(doc.url, '_blank')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Eye size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Business Edit Form Component
const BusinessEditForm: React.FC<{ 
  business: any; 
  onSave: (business: any) => void; 
  onCancel: () => void; 
}> = ({ business, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    ...business,
    business_address: business.business_address || {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entity Type
          </label>
          <select
            value={formData.entity_type}
            onChange={(e) => setFormData({ ...formData, entity_type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="llc">LLC</option>
            <option value="c-corp">C Corporation</option>
            <option value="s-corp">S Corporation</option>
            <option value="nonprofit">Nonprofit</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            <option value="IL">Illinois</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Purpose
        </label>
        <textarea
          value={formData.business_purpose}
          onChange={(e) => setFormData({ ...formData, business_purpose: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default AdminDashboard;