import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Founder, Bright Ideas LLC',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    text: 'I was able to form my LLC in California in less than 20 minutes. The process was so smooth, and I received my documents quickly. The dashboard makes it easy to keep track of compliance deadlines.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CEO, Tech Solutions Inc',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    text: 'After comparing several services, I chose Bizee for my corporation setup. Their pricing was transparent with no hidden fees, and their customer service team answered all my questions promptly.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Owner, Healthy Eats Co',
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    text: 'The registered agent service has been invaluable for my business. I travel frequently, and knowing that my important legal documents are being handled gives me peace of mind.',
    rating: 4
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  const handlePrevClick = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNextClick = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg shadow-md p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-current inline-block" : "text-gray-300 inline-block"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-orange-500 focus:outline-none"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-orange-500 focus:outline-none"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoplay(false);
              setCurrentIndex(i);
            }}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;