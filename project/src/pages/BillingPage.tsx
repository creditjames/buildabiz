import React, { useState, useEffect } from 'react';
import { CreditCard, Clock, CheckCircle, XCircle, DollarSign, Calendar, Receipt } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Subscription {
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

interface Order {
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

const BillingPage = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      setLoading(true);
      
      // Fetch subscription data - use limit(1) instead of single() to avoid PGRST116 error
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .limit(1);

      if (subscriptionError) {
        throw subscriptionError;
      }

      // Fetch order history
      const { data: orderData, error: orderError } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (orderError) throw orderError;

      // Set subscription to the first result or null if no results
      setSubscription(subscriptionData && subscriptionData.length > 0 ? subscriptionData[0] : null);
      setOrders(orderData || []);
      setError('');
    } catch (error: any) {
      console.error('Error fetching billing data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Clock className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Subscription Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Subscription</h2>
            
            {subscription ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-medium text-gray-900">Pro'Preneur Plan</p>
                    <p className="text-sm text-gray-500">
                      Status: <span className="font-medium text-orange-600">{subscription.subscription_status}</span>
                    </p>
                  </div>
                  {subscription.payment_method_brand && (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">
                        {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Current Period</span>
                    </div>
                    <p className="text-gray-900">
                      {formatDate(subscription.current_period_start || 0)} - {formatDate(subscription.current_period_end || 0)}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                      <Receipt className="w-4 h-4" />
                      <span>Renewal</span>
                    </div>
                    <p className="text-gray-900">
                      {subscription.cancel_at_period_end ? 'Cancels at period end' : 'Auto-renews'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-600 mb-6">You don't have any active subscriptions at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment History Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full opacity-10 blur-3xl" />
          
          <div className="relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
            
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.order_id} className="border-b border-gray-100">
                        <td className="py-4 px-4">
                          {new Date(order.order_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          Business Formation Package
                        </td>
                        <td className="py-4 px-4">
                          {formatCurrency(order.amount_total, order.currency)}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.payment_status === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.payment_status === 'paid' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment History</h3>
                <p className="text-gray-600">You haven't made any payments yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;