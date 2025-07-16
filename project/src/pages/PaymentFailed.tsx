import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Go back to the formation page
    navigate('/formation');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 mb-8">
            We were unable to process your payment. Please try again or contact support if the problem persists.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleRetry}
              className="w-full inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-colors duration-300"
            >
              <RefreshCw size={20} className="mr-2" />
              Try Again
            </button>
            
            <Link
              to="/contact"
              className="block text-orange-500 hover:text-orange-600 font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;