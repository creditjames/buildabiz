import React from 'react';
import { Building2 } from 'lucide-react';

const DBAFiling = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">DBA Filing Service</h1>
        <p className="mt-2 text-lg text-gray-600">
          Register your "Doing Business As" name quickly and efficiently
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">What is a DBA?</h3>
          <p className="mt-4 text-gray-600">
            A DBA (Doing Business As) allows you to conduct business under a name different from your legal business name or personal name.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">Benefits</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Operate under a different business name</li>
            <li>• Build brand identity</li>
            <li>• Maintain legal compliance</li>
            <li>• Open business bank accounts</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">Our Service</h3>
          <p className="mt-4 text-gray-600">
            We handle the entire DBA filing process, ensuring your business name is properly registered with all relevant authorities.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
              1
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Submit Information</h3>
            <p className="mt-2 text-gray-600">
              Provide your desired DBA name and business details
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
              2
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Review & Process</h3>
            <p className="mt-2 text-gray-600">
              We prepare and review all necessary documentation
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
              3
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">File & Confirm</h3>
            <p className="mt-2 text-gray-600">
              We submit your DBA filing and confirm registration
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Start DBA Filing
        </button>
      </div>
    </div>
  );
};

export default DBAFiling;