import React from 'react';
import { FileText, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessLicenses = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business License & Permit Service
          </h1>
          <p className="text-xl text-gray-600">
            Get all the licenses and permits you need to operate your business legally.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Shield className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Check</h3>
            <p className="text-gray-600">
              We identify all required licenses for your specific business and location.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <FileText className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Application Filing</h3>
            <p className="text-gray-600">
              We handle the entire application process for each required license.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ongoing Support</h3>
            <p className="text-gray-600">
              Get help with renewals and maintaining compliance.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">License Packages</h2>
            <p className="text-xl text-gray-600">Choose the package that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-2">+ filing fees</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">License requirements check</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Application preparation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Digital delivery</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Choose Basic
              </button>
            </div>

            <div className="border-2 border-orange-500 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$299</span>
                  <span className="text-gray-600 ml-2">+ filing fees</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Expedited processing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Compliance monitoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Renewal reminders</span>
                </li>
              </ul>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Choose Professional
              </button>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$599</span>
                  <span className="text-gray-600 ml-2">+ filing fees</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Multiple locations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>

              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium transition-colors duration-300">
                Choose Enterprise
              </button>
            </div>
          </div>
        </div>

        {/* Common Licenses Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Business Licenses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                General Business License
              </h3>
              <p className="text-gray-600">
                Basic license required by most cities and counties to conduct business.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Professional License
              </h3>
              <p className="text-gray-600">
                Required for specific professions like contractors, real estate agents, etc.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Health Permits
              </h3>
              <p className="text-gray-600">
                Required for restaurants, food service, and health-related businesses.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Zoning Permits
              </h3>
              <p className="text-gray-600">
                Ensures your business location complies with local zoning laws.
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
            <span>Get Your Licenses</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessLicenses;