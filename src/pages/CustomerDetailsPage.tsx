import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Building2, 
  User, 
  Mail, 
  MapPin,
  Edit,
  Upload,
  MessageSquare,
  Save,
  X,
  Send,
  CreditCard,
  Calendar,
  Receipt,
  Eye,
  Download,
  Trash2,
  AlertCircle,
  Settings,
  Phone,
  Globe,
  Package,
  FileSignature,
  Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import FileUpload from '../components/FileUpload';

const CustomerDetailsPage = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [message, setMessage] = useState('');
  const [editingBusiness, setEditingBusiness] = useState<any>(null);

  useEffect(() => {
    checkEmployeeAccess();
    fetchBusinessData();
  }, [businessId]);

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

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      
      // Fetch business details with documents
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select(`
          *,
          documents (*)
        `)
        .eq('id', businessId)
        .single();

      if (businessError) throw businessError;
      
      // Add placeholder user information since we can't access admin API from client
      setBusiness({
        ...businessData,
        user_email: 'Admin access required',
        user_name: 'Admin access required'
      });
      
      setDocuments(businessData?.documents || []);

      // Fetch payment information
      await fetchPaymentData(businessData.user_id);
      
    } catch (error: any) {
      setError('Error loading business details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentData = async (userId: string) => {
    try {
      // Get Stripe customer ID
      const { data: customerData } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (customerData?.customer_id) {
        // Fetch subscription data
        const { data: subscriptionData } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .eq('customer_id', customerData.customer_id)
          .maybeSingle();

        setSubscription(subscriptionData);

        // Fetch order history
        const { data: orderData } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .eq('customer_id', customerData.customer_id)
          .order('order_date', { ascending: false });

        setPayments(orderData || []);
      }
    } catch (error: any) {
      console.error('Error fetching payment data:', error);
    }
  };

  const updateBusinessStatus = async (newStatus: string) => {
    try {
      const { error } = await supabase
        .from('businesses')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', businessId);

      if (error) throw error;
      
      setBusiness(prev => ({ ...prev, status: newStatus }));
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
      
      setBusiness(prev => ({ ...prev, ...businessData }));
      setShowEditModal(false);
      setEditingBusiness(null);
    } catch (error: any) {
      setError('Error updating business: ' + error.message);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !business) return;

    try {
      // In a real app, you'd send this via email or notification system
      alert(`Message sent to ${business.business_name} (${business.user_email}):\n\n${message}`);
      setMessage('');
      setShowMessageModal(false);
    } catch (error: any) {
      setError('Error sending message: ' + error.message);
    }
  };

  const deleteBusiness = async () => {
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
      
      navigate('/admin-dashboard');
    } catch (error: any) {
      setError('Error deleting business: ' + error.message);
    }
  };

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

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Clock className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <XCircle className="text-red-500 mt-1 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Business Not Found</h2>
          <p className="text-gray-600 mt-2">The requested business could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Admin Dashboard
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setEditingBusiness(business);
                setShowEditModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Edit size={18} className="mr-2" />
              Edit Business
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <Upload size={18} className="mr-2" />
              Upload Document
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <MessageSquare size={18} className="mr-2" />
              Send Message
            </button>
            <button
              onClick={deleteBusiness}
              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* Business Overview */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.business_name}</h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(business.status)}`}>
                    {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                  </span>
                  <span className="text-gray-600">{business.entity_type.toUpperCase()}</span>
                  <span className="text-gray-600">{business.state}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{new Date(business.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Status Update */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
              <select
                value={business.status}
                onChange={(e) => updateBusinessStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="pending">Order Received</option>
                <option value="processing">Processing</option>
                <option value="review">Under Review</option>
                <option value="filed">Filed with State</option>
                <option value="completed">Complete</option>
              </select>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Formation Progress</span>
                <span>{getProgressPercentage(business.status)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(business.status)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <User className="text-gray-400 w-5 h-5 mr-2" />
                  <h3 className="font-medium text-gray-900">Customer Details</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Name:</span> {business.user_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {business.user_email}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Building2 className="text-gray-400 w-5 h-5 mr-2" />
                  <h3 className="font-medium text-gray-900">Business Details</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Purpose:</span> {business.business_purpose}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Package:</span> {business.selected_package.charAt(0).toUpperCase() + business.selected_package.slice(1)}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <h3 className="font-medium text-gray-900">Business Address</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{business.business_address?.street}</p>
                  {business.business_address?.unit && <p>{business.business_address.unit}</p>}
                  <p>{business.business_address?.city}, {business.business_address?.state} {business.business_address?.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
            
            {subscription ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span>Subscription Status</span>
                  </div>
                  <p className="text-gray-900 font-medium">{subscription.subscription_status}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Current Period</span>
                  </div>
                  <p className="text-gray-900">
                    {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-600">This customer doesn't have any active subscriptions.</p>
              </div>
            )}

            {/* Payment History */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
            {payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Payment ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.order_id} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          {new Date(payment.order_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          {formatCurrency(payment.amount_total, payment.currency)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            payment.payment_status === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {payment.payment_intent_id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                <p className="text-gray-600">This customer hasn't made any payments yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Formation Documents</h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Upload size={18} className="mr-2" />
                Upload Document
              </button>
            </div>
            
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-gray-50 rounded-lg mr-4">
                          {doc.type === 'business-plan' ? (
                            <Sparkles className="text-purple-500 w-6 h-6" />
                          ) : (
                            <FileText className="text-gray-400 w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">
                            {doc.type} • {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Pending'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'completed' ? (
                          <>
                            <CheckCircle className="text-green-500 w-5 h-5" />
                            {doc.url && (
                              <>
                                <button
                                  onClick={() => window.open(doc.url, '_blank')}
                                  className="text-blue-500 hover:text-blue-600"
                                  title="View Document"
                                >
                                  <Eye size={18} />
                                </button>
                                <button
                                  onClick={() => window.open(doc.url, '_blank')}
                                  className="text-green-500 hover:text-green-600"
                                  title="Download"
                                >
                                  <Download size={18} />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <Clock className="text-gray-400 w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents</h3>
                <p className="text-gray-600 mb-6">No documents have been uploaded for this business yet.</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  <Upload size={18} className="mr-2" />
                  Upload First Document
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Business Plan Section */}
        {business.business_plan && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl" />
            
            <div className="relative">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Business Plan</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Sparkles className="text-purple-500 w-6 h-6 mr-2" />
                    <h3 className="font-medium text-gray-900">AI Generated Business Plan</h3>
                  </div>
                  <div className="text-sm text-gray-500">
                    Generated: {new Date(business.business_plan.generated_at || business.updated_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto bg-white p-4 rounded border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {business.business_plan.content?.substring(0, 500)}...
                  </pre>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      const newWindow = window.open('', '_blank');
                      if (newWindow) {
                        newWindow.document.write(`
                          <html>
                            <head>
                              <title>${business.business_name} - Business Plan</title>
                              <style>
                                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                                h1, h2, h3 { color: ${business.business_plan.brand_color || '#FF5A1F'}; }
                                .header { text-align: center; border-bottom: 2px solid ${business.business_plan.brand_color || '#FF5A1F'}; padding-bottom: 20px; margin-bottom: 30px; }
                                .content { white-space: pre-wrap; }
                              </style>
                            </head>
                            <body>
                              <div class="header">
                                <h1>${business.business_name} - Business Plan</h1>
                                <p>Generated on ${new Date(business.business_plan.generated_at || business.updated_at).toLocaleDateString()}</p>
                              </div>
                              <div class="content">${business.business_plan.content}</div>
                            </body>
                          </html>
                        `);
                        newWindow.document.close();
                      }
                    }}
                    className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    <Eye size={18} className="mr-2" />
                    View Full Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Upload Document - {business.business_name}
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                <FileUpload
                  businessId={business.id}
                  onUploadComplete={() => {
                    setShowUploadModal(false);
                    fetchBusinessData();
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Send Message to {business.business_name}
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
                      <strong>To:</strong> {business.user_email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Business:</strong> {business.business_name}
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

        {/* Edit Business Modal */}
        {showEditModal && editingBusiness && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Edit Business</h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingBusiness(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <BusinessEditForm 
                  business={editingBusiness}
                  onSave={updateBusiness}
                  onCancel={() => {
                    setShowEditModal(false);
                    setEditingBusiness(null);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Package
          </label>
          <select
            value={formData.selected_package}
            onChange={(e) => setFormData({ ...formData, selected_package: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Pro'Preneur</option>
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

export default CustomerDetailsPage;