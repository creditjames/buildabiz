import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Award, Check, Star } from 'lucide-react';
import HeroFormStart from '../components/home/HeroFormStart';
import FeatureCard from '../components/home/FeatureCard';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import EntityComparisonWidget from '../components/home/EntityComparisonWidget';
import QuickStartWidget from '../components/home/QuickStartWidget';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Start Your Business in Minutes, Not Months
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The faster, easier way to form and grow your business. Our technology-powered platform helps entrepreneurs launch with confidence.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/formation" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 hover:shadow-lg text-center"
                >
                  Start My Business
                </Link>
                <Link 
                  to="/compare-entities" 
                  className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-md font-medium text-lg border border-gray-300 transition-all duration-300 text-center"
                >
                  Compare Entities
                </Link>
              </div>
              
              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img 
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img 
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1" 
                    alt="Customer" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by 100,000+ business owners
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <HeroFormStart />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-gray-400">
              <svg width="120" viewBox="0 0 100 30" className="h-8">
                <rect width="100" height="30" fill="currentColor" fillOpacity="0.2" />
                <text x="50" y="20" fontSize="12" textAnchor="middle" fill="currentColor">FORBES</text>
              </svg>
            </div>
            <div className="text-gray-400">
              <svg width="120" viewBox="0 0 100 30" className="h-8">
                <rect width="100" height="30" fill="currentColor" fillOpacity="0.2" />
                <text x="50" y="20" fontSize="12" textAnchor="middle" fill="currentColor">ENTREPRENEUR</text>
              </svg>
            </div>
            <div className="text-gray-400">
              <svg width="120" viewBox="0 0 100 30" className="h-8">
                <rect width="100" height="30" fill="currentColor" fillOpacity="0.2" />
                <text x="50" y="20" fontSize="12" textAnchor="middle" fill="currentColor">INC MAGAZINE</text>
              </svg>
            </div>
            <div className="text-gray-400">
              <svg width="120" viewBox="0 0 100 30" className="h-8">
                <rect width="100" height="30" fill="currentColor" fillOpacity="0.2" />
                <text x="50" y="20" fontSize="12" textAnchor="middle" fill="currentColor">BUSINESS INSIDER</text>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Entrepreneurs Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take the complexity out of starting and running your business with our all-in-one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock size={40} />}
              title="Fast Formation"
              description="Form your business in as little as 10 minutes with our streamlined process."
              link="/formation"
              linkText="Start Now"
            />
            <FeatureCard 
              icon={<Shield size={40} />}
              title="Free Registered Agent"
              description="Get your first year of registered agent service free with any business formation."
              link="/services/registered-agent"
              linkText="Learn More"
            />
            <FeatureCard 
              icon={<Award size={40} />}
              title="Lifetime Support"
              description="Access our compliance platform and expert support for the life of your business."
              link="/services"
              linkText="View Services"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your business in three simple steps, with expert guidance along the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8 text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Entity</h3>
              <p className="text-gray-600">
                Select the right business structure for your needs - LLC, Corporation, or Nonprofit.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Your Order</h3>
              <p className="text-gray-600">
                Fill out our simple form with your business details and select your package.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 text-center relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-500 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Launch Your Business</h3>
              <p className="text-gray-600">
                We file your documents with the state and provide all the tools you need to get started.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/formation" 
              className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
            >
              <span>Start your business now</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Business Packages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All-Inclusive Business Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that's right for you, with transparent pricing and no hidden fees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-900">$199</span>
                  <span className="text-gray-500 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">
                  Essential formation service with the basics to get started
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {['Business Name Search', 'Articles Filing', 'Online Document Access', 'Free Registered Agent (1st year)'].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    to="/formation?package=basic" 
                    className="block w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium text-center transition-all duration-300"
                  >
                    Select Basic
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                Popular
              </div>
              <div className="p-6 bg-orange-50 border-b border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-900">$399</span>
                  <span className="text-gray-500 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">
                  Complete formation with essential legal and tax features
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    'Everything in Basic',
                    'EIN / Tax ID Number',
                    'Operating Agreement',
                    'Banking Resolution',
                    'Lifetime Customer Support',
                    'Business Tax Assessment',
                    'Compliance Alerts'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    to="/formation?package=standard" 
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium text-center transition-all duration-300"
                  >
                    Select Standard
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro'Preneur</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-gray-900">$999</span>
                  <span className="text-gray-500 ml-2">+ state fee</span>
                </div>
                <p className="text-gray-600">
                  Complete formation with advanced features and expedited filing
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {[
                    'Everything in Standard',
                    'Expedited Filing',
                    'Domain Name & Email',
                    'Business Website Builder',
                    'Business Contract Templates',
                    'Corporate Kit & Seal',
                    'Business Advisory Session'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link 
                    to="/formation?package=premium" 
                    className="block w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md font-medium text-center transition-all duration-300"
                  >
                    Select Pro'Preneur
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Entity Comparison Widget */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Business Structure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare entity types or take our quiz to get a personalized recommendation.
            </p>
          </div>
          
          <EntityComparisonWidget />
        </div>
      </section>
      
      {/* Business Name Search */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Your Business Name</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check if your desired business name is available in California before starting your formation.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <QuickStartWidget />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied entrepreneurs who have successfully launched their businesses with us.
            </p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Business Journey?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of entrepreneurs who have successfully launched their businesses with our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/formation" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 hover:shadow-lg text-center"
              >
                Start My Business
              </Link>
              <Link 
                to="/compare-entities" 
                className="bg-transparent hover:bg-gray-800 text-white px-8 py-4 rounded-md font-medium text-lg border border-gray-700 transition-all duration-300 text-center"
              >
                Compare Entity Types
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;