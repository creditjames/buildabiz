import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <img src="https://ltovrukgaxnoccgypney.supabase.co/storage/v1/object/public/public/logos/logo-buildabiz.png" alt="Build-A-Biz" className="h-10 mb-6" />
            <p className="text-gray-600 mb-6 max-w-md">
              We help entrepreneurs launch and grow their businesses with our technology-enabled business formation and compliance platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-orange-500">About Us</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-orange-500">Reviews</Link></li>
              <li><Link to="/partners" className="text-gray-600 hover:text-orange-500">Partners</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-orange-500">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-orange-500">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/formation" className="text-gray-600 hover:text-orange-500">Form an LLC</Link></li>
              <li><Link to="/formation" className="text-gray-600 hover:text-orange-500">Form a Corporation</Link></li>
              <li><Link to="/services/registered-agent" className="text-gray-600 hover:text-orange-500">Registered Agent</Link></li>
              <li><Link to="/services/annual-report-filing" className="text-gray-600 hover:text-orange-500">Annual Reports</Link></li>
              <li><Link to="/services/ein-service" className="text-gray-600 hover:text-orange-500">Get an EIN</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-600 hover:text-orange-500">FAQs</Link></li>
              <li><Link to="/business-guides" className="text-gray-600 hover:text-orange-500">Business Guides</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-orange-500">Blog</Link></li>
              <li><Link to="/help-center" className="text-gray-600 hover:text-orange-500">Help Center</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Build-A-Biz Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-orange-500 text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-orange-500 text-sm">Terms of Service</Link>
              <Link to="/refund-policy" className="text-gray-500 hover:text-orange-500 text-sm">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;