import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: '10 Essential Steps to Launch Your Startup in 2025',
      excerpt: 'A comprehensive roadmap for entrepreneurs looking to start their business this year, covering everything from idea validation to market launch.',
      author: 'Sarah Johnson',
      date: 'January 10, 2025',
      category: 'Startup Tips',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1',
      featured: true
    },
    {
      title: 'LLC vs Corporation: Making the Right Choice in 2025',
      excerpt: 'Updated comparison of business structures with new tax implications and regulatory changes for the current year.',
      author: 'Michael Chen',
      date: 'January 8, 2025',
      category: 'Business Structure',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1'
    },
    {
      title: 'The Ultimate Guide to Business Banking in 2025',
      excerpt: 'Everything you need to know about opening business accounts, managing finances, and choosing the right banking partner.',
      author: 'Emily Rodriguez',
      date: 'January 5, 2025',
      category: 'Finance',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1'
    },
    {
      title: 'AI Tools Every Small Business Owner Should Know',
      excerpt: 'Discover how artificial intelligence can streamline your operations, from customer service to financial planning.',
      author: 'David Kim',
      date: 'January 3, 2025',
      category: 'Technology',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1'
    },
    {
      title: 'Remote Work Compliance: What Business Owners Need to Know',
      excerpt: 'Navigate the legal requirements and best practices for managing remote employees across different states.',
      author: 'Lisa Thompson',
      date: 'December 28, 2024',
      category: 'Legal',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1'
    },
    {
      title: 'Building Your Brand: A Step-by-Step Guide for New Businesses',
      excerpt: 'Learn how to create a compelling brand identity that resonates with your target audience and drives growth.',
      author: 'Robert Wilson',
      date: 'December 25, 2024',
      category: 'Marketing',
      readTime: '14 min read',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=1'
    }
  ];

  const categories = [
    'All Posts',
    'Startup Tips',
    'Business Structure',
    'Finance',
    'Technology',
    'Legal',
    'Marketing'
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All Posts');

  const filteredPosts = selectedCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Business Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Insights, tips, and strategies to help you build and grow your business
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="inline-block bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full mr-3">
                      Featured
                    </span>
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </div>
                    </div>
                    
                    <button className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'All Posts' ? regularPosts : filteredPosts).map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm space-x-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  
                  <button className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium">
                    Read
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Update</h2>
          <p className="text-xl text-orange-100 mb-8">Subscribe to get the latest business insights delivered to your inbox</p>
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

export default Blog;