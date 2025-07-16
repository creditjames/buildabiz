import React from 'react';
import { Handshake, Award, Users, Globe } from 'lucide-react';

const Partners = () => {
  const partnerCategories = [
    {
      title: 'Legal Partners',
      description: 'Trusted law firms and legal professionals',
      partners: [
        { name: 'Morrison & Associates', type: 'Corporate Law Firm', logo: 'https://via.placeholder.com/150x80/4F46E5/FFFFFF?text=M%26A' },
        { name: 'Business Legal Group', type: 'Business Formation Specialists', logo: 'https://via.placeholder.com/150x80/059669/FFFFFF?text=BLG' },
        { name: 'StartUp Law Partners', type: 'Startup Legal Services', logo: 'https://via.placeholder.com/150x80/DC2626/FFFFFF?text=SLP' }
      ]
    },
    {
      title: 'Financial Partners',
      description: 'Banking and financial service providers',
      partners: [
        { name: 'Business Bank Pro', type: 'Business Banking', logo: 'https://via.placeholder.com/150x80/1F2937/FFFFFF?text=BBP' },
        { name: 'Startup Capital', type: 'Business Funding', logo: 'https://via.placeholder.com/150x80/7C3AED/FFFFFF?text=SC' },
        { name: 'QuickBooks', type: 'Accounting Software', logo: 'https://via.placeholder.com/150x80/2563EB/FFFFFF?text=QB' }
      ]
    },
    {
      title: 'Technology Partners',
      description: 'Software and technology service providers',
      partners: [
        { name: 'DocuSign', type: 'Digital Signatures', logo: 'https://via.placeholder.com/150x80/F59E0B/FFFFFF?text=DS' },
        { name: 'CloudStorage Pro', type: 'Document Storage', logo: 'https://via.placeholder.com/150x80/10B981/FFFFFF?text=CSP' },
        { name: 'BusinessTools Suite', type: 'Business Management', logo: 'https://via.placeholder.com/150x80/8B5CF6/FFFFFF?text=BTS' }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'Exclusive Discounts',
      description: 'Get special pricing on services from our trusted partners'
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: 'Expert Support',
      description: 'Access to specialized expertise for your business needs'
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: 'Comprehensive Solutions',
      description: 'Everything you need to start and grow your business'
    },
    {
      icon: <Handshake className="w-8 h-8 text-orange-500" />,
      title: 'Trusted Network',
      description: 'Vetted partners with proven track records'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Partners</h1>
            <p className="text-xl text-gray-600 mb-8">
              We work with the best service providers to give you everything you need to succeed
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Benefits</h2>
          <p className="text-xl text-gray-600">Why our partnership network matters to you</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners by Category */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          {partnerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.partners.map((partner, partnerIndex) => (
                  <div key={partnerIndex} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="mx-auto mb-4 rounded"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h3>
                    <p className="text-gray-600 text-sm">{partner.type}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become a Partner CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-orange-500 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join our network of trusted service providers and help entrepreneurs succeed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-medium hover:bg-orange-50 transition-colors"
            >
              Partner With Us
            </a>
            <a
              href="/formation"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white hover:text-orange-500 transition-colors"
            >
              Start Your Business
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;