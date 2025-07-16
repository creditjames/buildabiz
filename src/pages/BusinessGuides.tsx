import React from 'react';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';

const BusinessGuides = () => {
  const guides = [
    {
      title: 'Complete Guide to Starting an LLC',
      description: 'Everything you need to know about forming a Limited Liability Company, from choosing a name to filing paperwork.',
      readTime: '15 min read',
      author: 'Sarah Johnson',
      category: 'LLC Formation',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'complete-guide-starting-llc'
    },
    {
      title: 'Corporation vs LLC: Which is Right for You?',
      description: 'A detailed comparison of business structures to help you make the best choice for your venture.',
      readTime: '12 min read',
      author: 'Michael Chen',
      category: 'Business Structure',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'corporation-vs-llc-comparison'
    },
    {
      title: 'Getting Your EIN: A Step-by-Step Guide',
      description: 'Learn how to obtain your Employer Identification Number and why your business needs one.',
      readTime: '8 min read',
      author: 'Emily Rodriguez',
      category: 'Tax & Compliance',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'getting-ein-step-by-step'
    },
    {
      title: 'Business Banking: Opening Your First Account',
      description: 'What documents you need and how to choose the right bank for your new business.',
      readTime: '10 min read',
      author: 'David Kim',
      category: 'Banking & Finance',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'business-banking-first-account'
    },
    {
      title: 'Understanding Business Licenses and Permits',
      description: 'Navigate the complex world of business licensing and ensure your company operates legally.',
      readTime: '18 min read',
      author: 'Lisa Thompson',
      category: 'Legal Compliance',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'business-licenses-permits-guide'
    },
    {
      title: 'Registered Agent: What You Need to Know',
      description: 'Understanding the role of registered agents and whether you need professional service.',
      readTime: '7 min read',
      author: 'Robert Wilson',
      category: 'Legal Requirements',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      slug: 'registered-agent-guide'
    }
  ];

  const categories = [
    'All Guides',
    'LLC Formation',
    'Business Structure',
    'Tax & Compliance',
    'Banking & Finance',
    'Legal Compliance',
    'Legal Requirements'
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All Guides');

  const filteredGuides = selectedCategory === 'All Guides' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Business Guides</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive guides to help you navigate every aspect of starting and running your business
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {guide.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.readTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {guide.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="w-4 h-4 mr-1" />
                    {guide.author}
                  </div>
                  
                  <button className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium">
                    Read Guide
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-orange-100 mb-8">Get the latest business guides and tips delivered to your inbox</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
            />
            <button className="bg-white text-orange-500 px-6 py-3 rounded-r-md font-medium hover:bg-orange-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessGuides;