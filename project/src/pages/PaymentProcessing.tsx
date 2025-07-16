import React from 'react';
import { Loader2 } from 'lucide-react';

const PaymentProcessing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your Business is Launching...
          </h1>
          
          <p className="text-gray-600 mb-8">
            Please wait while we process your payment and set up your business formation.
          </p>
          
          <div className="space-y-4">
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-orange-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '100%', transform: 'translateX(-100%)' }} />
            </div>
            
            <p className="text-sm text-gray-500">
              This may take a few moments. Please don't close this window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;