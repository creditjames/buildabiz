import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard = ({ icon, title, description, link, linkText }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="text-orange-500 mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link to={link} className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium mt-auto">
        <span>{linkText}</span>
        <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  );
};

export default FeatureCard;