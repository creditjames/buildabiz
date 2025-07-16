import React from 'react';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisteredAgentService = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Registered Agent Service
          </h1>
          <p className="text-xl text-gray-600">
            Stay compliant and never miss important legal documents with our professional registered agent service.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Shield className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Compliance</h3>
            <p className="text-gray-600">
              We ensure your business maintains compliance by receiving and processing legal documents on your behalf.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Document Management</h3>
            <p className="text-gray-600">
              Secure handling and immediate forwarding of all important legal and state documents.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Shield className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Protection</h3>
            <p className="text-gray-600">
              Keep your personal address private by using our business address for public records.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Get started with our registered agent service today</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="border-2 border-orange-500 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual Service</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$119</span>
                  <span className="text-gray-600 ml-2">/year</span>
                </div>
                <p className="text-gray-600">Everything you need to maintain compliance</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Official registered agent address</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Same-day document forwarding</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Online document access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Compliance notifications</span>
                </li>
              </ul>

              <Link
                to="/formation"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md font-medium transition-colors duration-300"
              >
                Get Started
              </Link>
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
                What is a registered agent?
              </h3>
              <p className="text-gray-600">
                A registered agent is a person or entity designated to receive legal documents and official government correspondence on behalf of your business.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Why do I need a registered agent?
              </h3>
              <p className="text-gray-600">
                Every state requires businesses to have a registered agent to ensure there's a reliable point of contact for receiving important legal and tax documents.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What happens if I don't have a registered agent?
              </h3>
              <p className="text-gray-600">
                Operating without a registered agent can result in fines, penalties, and even the administrative dissolution of your business by the state.
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
            <span>Get Started Now</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisteredAgentService;