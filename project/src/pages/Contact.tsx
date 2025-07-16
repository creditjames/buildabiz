import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-orange-500" />,
      title: 'Phone',
      details: '1-800-BUILD-BIZ',
      subtext: 'Mon-Fri 9AM-6PM PST'
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      title: 'Email',
      details: 'support@buildabiz.com',
      subtext: 'We respond within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      title: 'Address',
      details: '123 Business Ave, Suite 100',
      subtext: 'San Francisco, CA 94105'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: 'Business Hours',
      details: 'Monday - Friday: 9AM - 6PM PST',
      subtext: 'Saturday: 10AM - 4PM PST'
    }
  ];

  const faqs = [
    {
      question: 'How long does business formation take?',
      answer: 'Most formations are completed within 7-10 business days. Expedited processing is available for faster turnaround.'
    },
    {
      question: 'What documents will I receive?',
      answer: 'You\'ll receive your Articles of Organization/Incorporation, EIN confirmation, and any additional documents based on your package.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! We offer lifetime customer support and ongoing compliance services to keep your business in good standing.'
    },
    {
      question: 'Can I change my business information later?',
      answer: 'Yes, we can help you file amendments to update your business name, address, or other information as needed.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-8">
              Have questions? We're here to help you start and grow your business.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a subject</option>
                  <option value="formation">Business Formation</option>
                  <option value="support">Customer Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h2>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{info.title}</h3>
                    <p className="text-gray-700">{info.details}</p>
                    <p className="text-sm text-gray-500">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Business?</h2>
          <p className="text-xl text-orange-100 mb-8">Don't wait - begin your business formation today</p>
          <a
            href="/formation"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-medium hover:bg-orange-50 transition-colors"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;