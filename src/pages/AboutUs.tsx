import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'James Whitehead',
      role: 'CEO',
      bio: 'ceo of wealthy alliance club, dispute pro, and Build-a-biz'
    },
    {
      name: 'JC Trevino',
      role: 'Co-CEO',
      bio: 'CO-CEO of bBuild-a-biz.'
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: 'Simplicity',
      description: 'We make complex legal processes simple and accessible for everyone.'
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: 'Support',
      description: 'Our expert team is here to guide you through every step of your journey.'
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do.'
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: 'Passion',
      description: 'We are passionate about helping entrepreneurs achieve their dreams.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Build-A-Biz</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to make business formation simple, fast, and affordable for entrepreneurs everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Build-A-Biz was born from the frustration of navigating complex business formation processes. 
                Our founders experienced firsthand how difficult and expensive it could be to start a business legally.
              </p>
              <p className="text-gray-600 mb-4">
                We set out to create a platform that would democratize business formation, making it accessible to everyone 
                regardless of their legal knowledge or budget. Today, we've helped over 100,000 entrepreneurs launch their dreams.
              </p>
              <p className="text-gray-600">
                Our technology-first approach combines expert legal knowledge with innovative tools to deliver the fastest, 
                most reliable business formation experience available.
              </p>
            </div>
            <div className="bg-orange-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">100K+</div>
                  <div className="text-gray-700">Businesses Formed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">50</div>
                  <div className="text-gray-700">States Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                  <div className="text-gray-700">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-700">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600">The experts behind Build-A-Biz</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Business?</h2>
          <p className="text-xl text-orange-100 mb-8">Join thousands of entrepreneurs who trust Build-A-Biz</p>
          <a
            href="/formation"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-medium hover:bg-orange-50 transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;