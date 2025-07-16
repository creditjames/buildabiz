import React from 'react';
import { FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnualReportFiling = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Annual Report Filing Service
          </h1>
          <p className="text-xl text-gray-600">
            Never miss a deadline with our professional annual report filing service. We handle everything to keep your business compliant.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Clock className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Timely Filing</h3>
            <p className="text-gray-600">
              We track your deadlines and ensure your annual report is filed on time, every time.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <FileText className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Preparation</h3>
            <p className="text-gray-600">
              Our experts prepare all required documentation and handle the entire filing process.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Compliance Guarantee</h3>
            <p className="text-gray-600">
              Stay compliant with state requirements and avoid penalties or late fees.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Annual Report Filing Packages</h2>
            <p className="text-xl text-gray-600">Choose the package that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-2 border-gray-200 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Filing</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-2">/filing</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Annual report preparation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">State filing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">PDF copy of filed report</span>
                </li>
              </ul>

              <Link
                to="/formation"
                className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-md font-medium transition-colors duration-300"
              >
                Select Basic
              </Link>
            </div>

            <div className="border-2 border-orange-500 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Compliance Plus</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$199</span>
                  <span className="text-gray-600 ml-2">/year</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Year-round compliance monitoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Email reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Compliance calendar</span>
                </li>
              </ul>

              <Link
                to="/formation"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md font-medium transition-colors duration-300"
              >
                Select Plus
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
                What is an annual report?
              </h3>
              <p className="text-gray-600">
                An annual report is a required filing that updates the state about your business's basic information, including officer details, registered agent information, and business address.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                When is my annual report due?
              </h3>
              <p className="text-gray-600">
                Due dates vary by state and entity type. We track these deadlines for you and ensure timely filing to maintain compliance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What happens if I miss the deadline?
              </h3>
              <p className="text-gray-600">
                Missing your annual report deadline can result in late fees, penalties, and potentially the administrative dissolution of your business.
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

export default AnnualReportFiling;