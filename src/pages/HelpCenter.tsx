import React from 'react';
import { Search, Phone, Mail, MessageCircle, Book, FileText, Users, Clock } from 'lucide-react';

const HelpCenter = () => {
  const supportOptions = [
    {
      icon: <Phone className="w-8 h-8 text-orange-500" />,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      details: '1-800-BUILD-BIZ',
      availability: 'Mon-Fri 9AM-6PM PST',
      action: 'Call Now'
    },
    {
      icon: <Mail className="w-8 h-8 text-orange-500" />,
      title: 'Email Support',
      description: 'Get detailed help via email',
      details: 'support@buildabiz.com',
      availability: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-orange-500" />,
      title: 'Live Chat',
      description: 'Instant help when you need it',
      details: 'Available on our website',
      availability: 'Mon-Fri 9AM-6PM PST',
      action: 'Start Chat'
    }
  ];

  const quickLinks = [
    {
      icon: <FileText className="w-6 h-6 text-orange-500" />,
      title: 'Track Your Order',
      description: 'Check the status of your business formation',
      link: '/dashboard'
    },
    {
      icon: <Book className="w-6 h-6 text-orange-500" />,
      title: 'Business Guides',
      description: 'Step-by-step guides for entrepreneurs',
      link: '/resources/guides'
    },
    {
      icon: <Users className="w-6 h-6 text-orange-500" />,
      title: 'Account Management',
      description: 'Update your account and billing information',
      link: '/settings'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: 'Service Status',
      description: 'Check current system status and updates',
      link: '/status'
    }
  ];

  const popularTopics = [
    'How long does business formation take?',
    'What documents will I receive?',
    'How to get an EIN for my business?',
    'Do I need a registered agent?',
    'How to file annual reports?',
    'What business licenses do I need?',
    'How to open a business bank account?',
    'Can I change my business name later?'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get the support you need to start and grow your business
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for help..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Get Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-3">{option.description}</p>
                <p className="font-medium text-gray-900 mb-1">{option.details}</p>
                <p className="text-sm text-gray-500 mb-4">{option.availability}</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow block"
              >
                <div className="flex items-center mb-3">
                  {link.icon}
                  <h3 className="text-lg font-bold text-gray-900 ml-3">{link.title}</h3>
                </div>
                <p className="text-gray-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Popular Topics</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularTopics.map((topic, index) => (
                <a
                  key={index}
                  href="/resources/faq"
                  className="flex items-center p-3 rounded-md hover:bg-orange-50 transition-colors group"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:bg-orange-600"></div>
                  <span className="text-gray-700 group-hover:text-orange-600">{topic}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Need Urgent Help?</h2>
          <p className="text-red-700 mb-6">
            If you have an urgent business formation issue that needs immediate attention
          </p>
          <a
            href="tel:1-800-BUILD-BIZ"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
          >
            Call Emergency Line: 1-800-BUILD-BIZ
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;