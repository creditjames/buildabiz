import React from 'react';
import { Building2 } from 'lucide-react';

const ForeignQualification = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="flex justify-center">
          <Building2 className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">Foreign Qualification Service</h1>
        <p className="mt-2 text-lg text-gray-600">
          Expand your business operations into other states legally and efficiently
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">What is Foreign Qualification?</h3>
          <p className="mt-4 text-gray-600">
            Foreign qualification is the process of registering your business to operate in states other than
            where it was originally formed. This is legally required when you conduct business across state lines.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">When Do You Need It?</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• Opening a physical location in another state</li>
            <li>• Having employees in another state</li>
            <li>• Conducting regular business meetings in another state</li>
            <li>• Accepting orders in another state</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900">Our Service Includes</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>• State compliance verification</li>
            <li>• Document preparation and filing</li>
            <li>• Certificate of Authority obtainment</li>
            <li>• Registered agent service setup</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900">Ready to Expand Your Business?</h2>
        <p className="mt-4 text-gray-600">
          Our team of experts will guide you through the foreign qualification process, ensuring
          compliance with all state requirements and deadlines.
        </p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">How long does the process take?</h3>
            <p className="mt-2 text-gray-600">
              The timeline varies by state, typically ranging from 2-8 weeks. We'll provide you with
              specific estimates based on your target state.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">What are the ongoing requirements?</h3>
            <p className="mt-2 text-gray-600">
              You'll need to maintain a registered agent, file annual reports, and comply with state-specific
              regulations. We can help manage these requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForeignQualification;