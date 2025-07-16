import React from 'react';
import { Star, Quote } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Jennifer Martinez',
      business: 'Martinez Consulting LLC',
      rating: 5,
      date: 'December 2024',
      review: 'Absolutely fantastic service! I was able to form my LLC in California in just 3 days. The process was so smooth and the customer support team answered all my questions promptly. Highly recommend!',
      avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'David Kim',
      business: 'TechStart Inc.',
      rating: 5,
      date: 'November 2024',
      review: 'I compared several business formation services and Build-A-Biz was by far the best value. No hidden fees, transparent pricing, and they delivered exactly what they promised. My corporation was filed perfectly.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'Sarah Thompson',
      business: 'Bloom Creative Studio',
      rating: 5,
      date: 'November 2024',
      review: 'The registered agent service has been invaluable. I travel frequently for work, and knowing that my legal documents are being handled professionally gives me complete peace of mind.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'Michael Rodriguez',
      business: 'Rodriguez Construction LLC',
      rating: 5,
      date: 'October 2024',
      review: 'As someone who is not tech-savvy, I was worried about the online process. But the platform was incredibly user-friendly and the step-by-step guidance made everything clear. Excellent experience!',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'Lisa Chen',
      business: 'Healthy Eats Co.',
      rating: 5,
      date: 'October 2024',
      review: 'The AI business plan generator was a game-changer for me. It helped me create a comprehensive business plan that I used to secure funding. The PDF export feature made it easy to share with investors.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      name: 'Robert Johnson',
      business: 'Johnson Financial Services',
      rating: 5,
      date: 'September 2024',
      review: 'I needed to form my business quickly for a client contract. Build-A-Biz delivered in record time with their expedited service. Professional, efficient, and reliable. Will definitely use again.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ];

  const stats = [
    { number: '4.9/5', label: 'Average Rating' },
    { number: '10,000+', label: 'Reviews' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '100K+', label: 'Happy Customers' }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Customer Reviews</h1>
            <p className="text-xl text-gray-600 mb-8">
              See what thousands of entrepreneurs are saying about Build-A-Biz
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.business}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 left-0 w-6 h-6 text-orange-200 -mt-2 -ml-1" />
                <p className="text-gray-700 italic pl-6">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Happy Customers</h2>
          <p className="text-xl text-orange-100 mb-8">Start your business formation today and see why entrepreneurs choose Build-A-Biz</p>
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

export default Reviews;