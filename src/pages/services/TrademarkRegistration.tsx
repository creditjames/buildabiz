import React from 'react';
import { Shield } from 'lucide-react';

const TrademarkRegistration = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Trademark Registration Service</h1>
        <p className="mt-4 text-xl text-gray-600">Protect your brand identity with federal trademark registration</p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Comprehensive Search</h3>
          <p className="mt-4 text-gray-600">Thorough search of federal and state trademark databases to ensure availability</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Application Filing</h3>
          <p className="mt-4 text-gray-600">Professional preparation and filing of your trademark application</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Monitoring & Support</h3>
          <p className="mt-4 text-gray-600">Ongoing monitoring and support throughout the registration process</p>
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900">Why Register Your Trademark?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Legal Protection</h3>
            <p className="mt-2 text-gray-600">Gain exclusive rights to use your mark nationwide and legal presumption of ownership</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Brand Value</h3>
            <p className="mt-2 text-gray-600">Increase your brand's value and protect your business identity</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Federal Registration</h3>
            <p className="mt-2 text-gray-600">Public notice of your claim to ownership of the mark</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Enforcement Rights</h3>
            <p className="mt-2 text-gray-600">Ability to bring legal action in federal court and prevent importation of infringing goods</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors">
          Start Trademark Registration
        </button>
      </div>
    </div>
  );
};

export default TrademarkRegistration;