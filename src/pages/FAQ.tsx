import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: 'Business Formation',
      questions: [
        {
          question: 'How long does it take to form my business?',
          answer: 'Most business formations are completed within 7-10 business days. However, processing times can vary by state. We offer expedited processing for faster turnaround times.'
        },
        {
          question: 'What\'s the difference between an LLC and Corporation?',
          answer: 'LLCs offer more flexibility in management and taxation, while corporations provide more structure and are better for raising capital. LLCs have pass-through taxation, while corporations face double taxation unless they elect S-Corp status.'
        },
        {
          question: 'Do I need a registered agent?',
          answer: 'Yes, every business entity is required to have a registered agent in the state where it\'s formed. We provide free registered agent service for the first year with all our packages.'
        },
        {
          question: 'Can I form my business in a different state than where I live?',
          answer: 'Yes, you can form your business in any state. However, if you conduct business in your home state, you may need to register as a foreign entity there as well.'
        }
      ]
    },
    {
      category: 'Pricing & Packages',
      questions: [
        {
          question: 'What\'s included in each package?',
          answer: 'Our Basic package includes name search, articles filing, and registered agent service. Standard adds EIN, operating agreement, and compliance alerts. Pro\'Preneur includes everything plus expedited filing and business templates.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. The only additional cost is the state filing fee, which varies by state and entity type. All fees are clearly displayed before you complete your order.'
        },
        {
          question: 'What is your refund policy?',
          answer: 'We offer a satisfaction guarantee. If we haven\'t started processing your order, we can provide a full refund. State filing fees are non-refundable once submitted to the state.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Currently, we require full payment upfront. However, we accept all major credit cards and offer competitive pricing to make our services accessible.'
        }
      ]
    },
    {
      category: 'After Formation',
      questions: [
        {
          question: 'What documents will I receive?',
          answer: 'You\'ll receive your Articles of Organization/Incorporation, EIN confirmation letter, operating agreement (if included in your package), and access to all documents through your online dashboard.'
        },
        {
          question: 'Do I need to file annual reports?',
          answer: 'Most states require annual reports to maintain your business in good standing. We provide compliance reminders and can handle annual report filing for you.'
        },
        {
          question: 'How do I get an EIN for my business?',
          answer: 'An EIN (Employer Identification Number) is included in our Standard and Pro\'Preneur packages. You can also order it separately for $99 if you chose the Basic package.'
        },
        {
          question: 'Can you help with business banking?',
          answer: 'While we don\'t provide banking services directly, we can provide the documents you need to open a business bank account and recommend trusted banking partners.'
        }
      ]
    },
    {
      category: 'Support & Services',
      questions: [
        {
          question: 'What kind of customer support do you provide?',
          answer: 'We offer lifetime customer support via phone, email, and live chat. Our support team is available Monday-Friday 9AM-6PM PST, with extended hours for urgent matters.'
        },
        {
          question: 'Can you help with business licenses?',
          answer: 'Yes, we offer business license research and filing services. We\'ll identify the licenses you need based on your business type and location, then help you obtain them.'
        },
        {
          question: 'Do you provide legal advice?',
          answer: 'We are not a law firm and cannot provide legal advice. We provide self-help services and document preparation. For legal advice, we recommend consulting with a qualified attorney.'
        },
        {
          question: 'How do I access my documents?',
          answer: 'All your business documents are available 24/7 through your secure online dashboard. You can download, print, or share them as needed.'
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about business formation and our services
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={faqIndex} className="bg-white rounded-lg shadow-md">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs found matching "{searchTerm}"</p>
              <p className="text-gray-400 mt-2">Try searching with different keywords or browse all categories above.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-xl text-orange-100 mb-8">Our support team is here to help you succeed</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-medium hover:bg-orange-50 transition-colors"
            >
              Contact Support
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

export default FAQ;