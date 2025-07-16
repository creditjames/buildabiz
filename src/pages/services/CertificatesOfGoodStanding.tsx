import React from 'react';
import { FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CertificatesOfGoodStanding = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certificate of Good Standing
          </h1>
          <p className="text-xl text-gray-600">
            Get official proof that your business is properly registered and compliant with state requirements.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <FileText className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Official Verification</h3>
            <p className="text-gray-600">
              Receive an official state document confirming your business's good standing status.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Clock className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Processing</h3>
            <p className="text-gray-600">
              Get your certificate quickly with our expedited processing options.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Uses</h3>
            <p className="text-gray-600">
              Use your certificate for business loans, contracts, and licenses.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose your processing speed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$69</span>
                  <span className="text-gray-600 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">7-10 business days</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Digital delivery</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">PDF format</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Order Standard
              </button>
            </div>

            <div className="border-2 border-orange-500 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Express</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">2-3 business days</p>
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
                  <span className="text-gray-700">Email updates</span>
                </li>
              </ul>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Order Express
              </button>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rush</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$149</span>
                  <span className="text-gray-600 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">Next business day</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Express</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Same-day processing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Phone support</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Order Rush
              </button>
            </div>
          </div>
        </div>

        {/* Common Uses Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Uses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Business Loans
              </h3>
              <p className="text-gray-600">
                Banks and lenders often require a Certificate of Good Standing as part of their loan application process.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Government Contracts
              </h3>
              <p className="text-gray-600">
                Many government agencies require proof of good standing to bid on contracts.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Business Licenses
              </h3>
              <p className="text-gray-600">
                Some licenses and permits require a current Certificate of Good Standing.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Foreign Qualification
              </h3>
              <p className="text-gray-600">
                Required when registering to do business in other states.
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
            <span>Order Your Certificate</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificatesOfGoodStanding;