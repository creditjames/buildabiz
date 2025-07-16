import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session ID in the URL
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    if (!sessionId) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will begin processing your business formation right away.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-colors duration-300"
            >
              Go to Dashboard
            </Link>
            
            <Link
              to="/formation"
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
            >
              <span>Form Another Business</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;