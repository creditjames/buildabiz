import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Mail, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const VirtualAddress = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Professional Business Address',
      description: 'Get a prestigious commercial address for your business in prime locations.'
    },
    {
      icon: Mail,
      title: 'Mail Handling & Forwarding',
      description: 'Receive, scan, and forward your mail to anywhere in the world.'
    },
    {
      icon: Shield,
      title: 'Privacy Protection',
      description: 'Keep your home address private by using our commercial address for public records.'
    },
    {
      icon: Building2,
      title: 'Business Credibility',
      description: 'Enhance your professional image with a legitimate business address.'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: [
        'Professional business address',
        'Mail notification',
        'Online account access',
        'Basic mail forwarding'
      ]
    },
    {
      name: 'Professional',
      price: 19.99,
      period: 'month',
      features: [
        'Everything in Basic',
        'Mail scanning',
        'Package acceptance',
        'Unlimited mail forwarding',
        'Same-day processing'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 29.99,
      period: 'month',
      features: [
        'Everything in Professional',
        'Multiple locations',
        'Dedicated account manager',
        'Priority support',
        'Custom mail handling'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Professional Virtual Address for Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Establish a professional business presence with our virtual address service. Get a real street address, mail handling, and more.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium transition-all duration-300"
            >
              <span>Get Started</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need in a Business Address
          </h2>
          <p className="text-xl text-gray-600">
            Get all the benefits of a physical office without the overhead
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <feature.icon size={32} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that works best for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-2 border-orange-500 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block w-full py-3 px-4 rounded-md font-medium text-center transition-colors ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-orange-500 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Establish Your Professional Business Presence?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our virtual address service. Get started today and elevate your business image.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-md font-medium transition-all duration-300"
            >
              <span>Get Your Virtual Address</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualAddress;