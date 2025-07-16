import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Briefcase, Building2, GlobeLock, FileSignature } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      category: 'Start Your Business',
      items: [
        {
          title: 'LLC Formation',
          description: 'Form your LLC with our complete formation service and get free registered agent for one year.',
          price: 'From $0 + state fee',
          icon: Building2,
          link: '/formation?entityType=llc'
        },
        {
          title: 'Corporation Formation',
          description: 'Start your corporation with comprehensive formation service and compliance support.',
          price: 'From $0 + state fee',
          icon: Building2,
          link: '/formation?entityType=c-corp'
        },
        {
          title: 'Nonprofit Formation',
          description: 'Form your nonprofit corporation and get help with 501(c)(3) status.',
          price: 'From $0 + state fee',
          icon: Building2,
          link: '/formation?entityType=nonprofit'
        }
      ]
    },
    {
      category: 'Manage & Maintain',
      items: [
        {
          title: 'Registered Agent Service',
          description: 'Get a reliable registered agent to receive legal documents and maintain compliance.',
          price: '$119/year',
          icon: Shield,
          link: '/services/registered-agent'
        },
        {
          title: 'Annual Report Filing',
          description: 'We\'ll prepare and file your annual report with the state on time.',
          price: '$99/filing',
          icon: FileText,
          link: '/services/annual-report'
        },
        {
          title: 'Certificate of Good Standing',
          description: 'Order a certificate of good standing from your state.',
          price: '$69',
          icon: FileText,
          link: '/services/certificates'
        }
      ]
    },
    {
      category: 'Business Compliance',
      items: [
        {
          title: 'EIN / Tax ID Number',
          description: 'Get your Federal Tax ID Number (EIN) from the IRS.',
          price: '$99',
          icon: Briefcase,
          link: '/services/ein'
        },
        {
          title: 'Business Licenses',
          description: 'Get the licenses and permits you need to operate legally.',
          price: 'From $99',
          icon: FileText,
          link: '/services/business-licenses'
        },
        {
          title: 'Foreign Qualification',
          description: 'Register your business to operate in additional states.',
          price: 'From $299',
          icon: GlobeLock,
          link: '/services/foreign-qualification'
        }
      ]
    },
    {
      category: 'Business Changes',
      items: [
        {
          title: 'Amendment Filing',
          description: 'Make changes to your business name, structure, or ownership.',
          price: 'From $149',
          icon: FileSignature,
          link: '/services/amendments'
        },
        {
          title: 'Business Dissolution',
          description: 'Properly close your business with the state.',
          price: 'From $199',
          icon: FileSignature,
          link: '/services/dissolution'
        },
        {
          title: 'DBA Filing',
          description: 'Register a "doing business as" name for your company.',
          price: 'From $99',
          icon: FileSignature,
          link: '/services/dba'
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Formation & Compliance Services
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to start, manage, and grow your business with confidence.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {category.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service) => (
                  <Link
                    key={service.title}
                    to={service.link}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <service.icon size={24} className="text-orange-500 mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 min-h-[60px]">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">
                        {service.price}
                      </span>
                      <span className="text-orange-500 font-medium">
                        Learn more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing a Service?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our formation experts are here to help you make the right choice for your business. Schedule a free consultation to discuss your needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-all duration-300"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;