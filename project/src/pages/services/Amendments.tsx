import React from 'react';
import { FileSignature, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Amendments = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Amendment Filing Service
          </h1>
          <p className="text-xl text-gray-600">
            Need to make changes to your business? We'll help you file your amendments quickly and correctly.
          </p>
        </div>

        {/* Common Amendments Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Common Types of Amendments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <FileSignature className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business Name Change</h3>
              <p className="text-gray-600">
                Update your business name to reflect your current branding or requirements.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <FileSignature className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Address Change</h3>
              <p className="text-gray-600">
                Update your business or registered agent address with the state.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <FileSignature className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Management Structure</h3>
              <p className="text-gray-600">
                Modify your business's management structure or ownership information.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Amendment Filing Packages</h2>
            <p className="text-xl text-gray-600">Choose your amendment service level</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Filing</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600 ml-2">+ state fee</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Document preparation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">State filing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Electronic delivery</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Choose Standard
              </button>
            </div>

            <div className="border-2 border-orange-500 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Recommended
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rush Filing</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$249</span>
                  <span className="text-gray-600 ml-2">+ state fee</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Standard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority processing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Express shipping</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Same-day preparation</span>
                </li>
              </ul>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Choose Rush
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                When do I need to file an amendment?
              </h3>
              <p className="text-gray-600">
                You need to file an amendment when making significant changes to your business, such as changing your business name, address, management structure, or ownership.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How long does the amendment process take?
              </h3>
              <p className="text-gray-600">
                Processing times vary by state and filing method. Standard filing typically takes 2-3 weeks, while rush filing can be completed in 3-5 business days.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What documents do I need to provide?
              </h3>
              <p className="text-gray-600">
                Required documents vary based on the type of amendment, but typically include your current business information and details about the changes you want to make.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            to="/formation"
            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium transition-colors duration-300"
          >
            <span>Start Your Amendment</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Amendments;