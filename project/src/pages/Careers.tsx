import React from 'react';
import { MapPin, Clock, DollarSign, Users, Heart, Zap, Award } from 'lucide-react';

const Careers = () => {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'Join our engineering team to build the next generation of business formation tools.',
      requirements: ['5+ years React/Node.js experience', 'Experience with TypeScript', 'Knowledge of cloud platforms']
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70k - $90k',
      description: 'Help our customers succeed by providing exceptional support and guidance.',
      requirements: ['3+ years customer success experience', 'Excellent communication skills', 'Problem-solving mindset']
    },
    {
      title: 'Business Formation Specialist',
      department: 'Operations',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '$60k - $80k',
      description: 'Process business formation documents and ensure compliance with state regulations.',
      requirements: ['Legal or business background preferred', 'Attention to detail', 'Process-oriented mindset']
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '$80k - $100k',
      description: 'Drive growth through digital marketing campaigns and content strategy.',
      requirements: ['5+ years marketing experience', 'Digital marketing expertise', 'Data-driven approach']
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness programs'
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO, and remote work options'
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: 'Growth & Learning',
      description: 'Professional development budget and conference attendance'
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: 'Equity & Bonuses',
      description: 'Stock options and performance-based bonuses for all employees'
    }
  ];

  const values = [
    {
      title: 'Customer First',
      description: 'We put our customers at the center of everything we do'
    },
    {
      title: 'Innovation',
      description: 'We constantly seek better ways to solve problems'
    },
    {
      title: 'Transparency',
      description: 'We believe in open, honest communication'
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in all our work'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 mb-8">
              Help us empower entrepreneurs to build their dreams. We're looking for passionate people to join our mission.
            </p>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-xl text-gray-600">The principles that guide our work and culture</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-xl text-gray-600">We offer competitive benefits and a great work environment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-xl text-gray-600">Find your next opportunity with us</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {openPositions.map((position, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {position.department}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {position.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {position.salary}
                    </div>
                  </div>
                </div>
                <button className="mt-4 lg:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Apply Now
                </button>
              </div>
              
              <p className="text-gray-700 mb-4">{position.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {position.requirements.map((req, reqIndex) => (
                    <li key={reqIndex}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
          <p className="text-xl text-orange-100 mb-8">We're always looking for talented people. Send us your resume!</p>
          <a
            href="mailto:careers@buildabiz.com"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-medium hover:bg-orange-50 transition-colors"
          >
            Send Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Careers;