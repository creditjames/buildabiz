import React from 'react';
import { Briefcase, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const EINService = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your EIN / Tax ID Number
          </h1>
          <p className="text-xl text-gray-600">
            Obtain your Federal Tax ID Number quickly and easily with our professional EIN filing service.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Clock className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Same-Day Processing</h3>
            <p className="text-gray-600">
              Get your EIN quickly with our efficient processing system.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Briefcase className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Preparation</h3>
            <p className="text-gray-600">
              Our experts ensure your application is completed correctly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CheckCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Guaranteed Accuracy</h3>
            <p className="text-gray-600">
              We guarantee your EIN will be issued correctly by the IRS.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Get your EIN quickly and easily</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="border-2 border-orange-500 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">EIN Filing Service</h3>
                <div className="flex items-end justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                </div>
                <p className="text-gray-600">One-time fee, no hidden costs</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Same-day processing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Expert application preparation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Digital delivery of EIN</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Error-free guarantee</span>
                </li>
              </ul>

              <Link
                to="/formation"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md font-medium transition-colors duration-300"
              >
                Get Your EIN Now
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
                What is an EIN?
              </h3>
              <p className="text-gray-600">
                An Employer Identification Number (EIN) is a unique nine-digit number assigned by the IRS to identify your business for tax purposes. It's like a Social Security number for your business.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Why do I need an EIN?
              </h3>
              <p className="text-gray-600">
                You need an EIN to open a business bank account, hire employees, file tax returns, and apply for business licenses. It's essential for most business operations.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How long does it take to get an EIN?
              </h3>
              <p className="text-gray-600">
                With our service, you'll typically receive your EIN the same business day if ordered before 3 PM EST. Orders after 3 PM EST will be processed the next business day.
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

export default EINService;