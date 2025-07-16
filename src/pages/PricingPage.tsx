import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { useFormation } from '../context/FormationContext';

const PricingPage = () => {
  const { calculateTotalPrice } = useFormation();
  
  const packages = [
    {
      name: 'Basic',
      price: 199,
      description: 'Essential formation service with the basics to get started',
      features: [
        'Business Name Search',
        'Articles Filing',
        'Online Document Access',
        'Free Registered Agent (1st year)',
      ],
      excludedFeatures: [
        'EIN / Tax ID Number',
        'Operating Agreement',
        'Banking Resolution',
        'Business Tax Assessment',
        'Compliance Alerts',
        'Expedited Filing',
        'Business Contract Templates'
      ]
    },
    {
      name: 'Standard',
      price: 399,
      description: 'Complete formation with essential legal and tax features',
      features: [
        'Business Name Search',
        'Articles Filing',
        'Online Document Access',
        'Free Registered Agent (1st year)',
        'EIN / Tax ID Number',
        'Operating Agreement',
        'Banking Resolution',
        'Business Tax Assessment',
        'Compliance Alerts'
      ],
      excludedFeatures: [
        'Expedited Filing',
        'Business Contract Templates'
      ],
      popular: true
    },
    {
      name: "Pro'Preneur",
      price: 999,
      description: 'Complete formation with advanced features and expedited filing',
      features: [
        'Business Name Search',
        'Articles Filing',
        'Online Document Access',
        'Free Registered Agent (1st year)',
        'EIN / Tax ID Number',
        'Operating Agreement',
        'Banking Resolution',
        'Business Tax Assessment',
        'Compliance Alerts',
        'Expedited Filing',
        'Business Contract Templates'
      ],
      excludedFeatures: []
    }
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the package that best fits your business needs. All packages include state filing fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
                pkg.popular ? 'border-2 border-orange-500 relative' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              
              <div className={`p-8 ${pkg.popular ? 'bg-orange-50' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-500 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                
                <Link
                  to={`/formation?package=${pkg.name.toLowerCase()}`}
                  className={`block w-full py-3 px-6 text-center rounded-md font-medium transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                >
                  Select {pkg.name}
                </Link>
              </div>

              <div className="p-8 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {pkg.excludedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start text-gray-400">
                      <span className="mr-2 mt-0.5">✕</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start">
            <Info size={24} className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                State Filing Fees
              </h3>
              <p className="text-gray-600 mb-4">
                State filing fees are required by the state to process your business formation and vary by state and entity type. These fees are in addition to our service fees and are paid directly to the state.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">California</h4>
                  <p className="text-gray-600">${calculateTotalPrice('CA', 'basic') - 199}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">New York</h4>
                  <p className="text-gray-600">${calculateTotalPrice('NY', 'basic') - 199}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Texas</h4>
                  <p className="text-gray-600">${calculateTotalPrice('TX', 'basic') - 199}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;