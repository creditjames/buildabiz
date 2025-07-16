import React from 'react';
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const RefundPolicy = () => {
  const refundScenarios = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: 'Full Refund Available',
      description: 'Order not yet processed by our team',
      timeframe: 'Within 24 hours of order placement'
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      title: 'Partial Refund Available',
      description: 'Order in progress but not filed with state',
      timeframe: 'Before state filing submission'
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      title: 'No Refund Available',
      description: 'Documents filed with state government',
      timeframe: 'After state filing submission'
    }
  ];

  const refundableServices = [
    'Business formation service fees',
    'Registered agent service (if not yet activated)',
    'EIN application service (if not yet submitted)',
    'Operating agreement preparation',
    'Document preparation services'
  ];

  const nonRefundableItems = [
    'State filing fees (paid directly to government)',
    'Expedited processing fees (if processing has begun)',
    'Third-party service fees',
    'Completed registered agent services',
    'Filed EIN applications'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700 mb-4">
                At Build-A-Biz, we stand behind our services and want you to be completely satisfied. 
                This refund policy explains when refunds are available and how to request them.
              </p>
            </section>

            {/* Refund Scenarios */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Refund Eligibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {refundScenarios.map((scenario, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      {scenario.icon}
                      <h3 className="text-lg font-semibold text-gray-900 ml-2">{scenario.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">{scenario.description}</p>
                    <p className="text-sm text-gray-500 font-medium">{scenario.timeframe}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refundable Services</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <ul className="space-y-2">
                  {refundableServices.map((service, index) => (
                    <li key={index} className="flex items-center text-green-800">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Non-Refundable Items</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <ul className="space-y-2">
                  {nonRefundableItems.map((item, index) => (
                    <li key={index} className="flex items-center text-red-800">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">State Filing Fees</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                    <p className="text-yellow-700">
                      State filing fees are paid directly to government agencies and are non-refundable 
                      once submitted. These fees are separate from our service fees and are required 
                      by law to process your business formation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Request a Refund</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Contact Support</h3>
                    <p className="text-gray-600">
                      Email us at <a href="mailto:support@buildabiz.com" className="text-orange-500">support@buildabiz.com</a> or 
                      call <a href="tel:1-800-BUILD-BIZ" className="text-orange-500">1-800-BUILD-BIZ</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Provide Information</h3>
                    <p className="text-gray-600">
                      Include your order number, business name, and reason for the refund request
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Review Process</h3>
                    <p className="text-gray-600">
                      We'll review your request within 1-2 business days and respond with our decision
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Refund Processing</h3>
                    <p className="text-gray-600">
                      Approved refunds are processed within 5-7 business days to your original payment method
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Special Circumstances</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Errors</h3>
                  <p className="text-gray-700">
                    If we make an error in your business formation, we will correct it at no charge 
                    or provide a full refund if correction is not possible.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">State Rejections</h3>
                  <p className="text-gray-700">
                    If your filing is rejected by the state due to our error, we will refile at no 
                    additional charge or provide a refund of our service fees.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Duplicate Orders</h3>
                  <p className="text-gray-700">
                    Accidental duplicate orders will be fully refunded if reported within 24 hours 
                    and before processing begins.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Satisfaction Guarantee</h2>
              <p className="text-gray-700 mb-4">
                We are committed to your satisfaction. If you're not completely happy with our service, 
                please contact us immediately so we can address your concerns. We will work with you 
                to resolve any issues and ensure you receive the quality service you deserve.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> <a href="mailto:support@buildabiz.com" className="text-orange-500">support@buildabiz.com</a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> <a href="tel:1-800-BUILD-BIZ" className="text-orange-500">1-800-BUILD-BIZ</a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Hours:</strong> Monday - Friday, 9AM - 6PM PST
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-8 mt-8">
              <p className="text-sm text-gray-500">
                This refund policy is subject to change. We will notify customers of any material 
                changes via email or through our website. Your continued use of our services after 
                changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;