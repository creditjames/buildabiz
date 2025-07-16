import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, FileText, Briefcase, Shield, GlobeLock, BookOpen, FileSignature, Landmark, Search } from 'lucide-react';

const MegaMenu = () => {
  return (
    <div className="absolute left-0 w-screen bg-white shadow-xl rounded-b-lg mt-0 z-50">
      <div className="container mx-auto p-6 grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Start Your Business</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/formation/llc" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Building2 size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Form an LLC</span>
              </Link>
            </li>
            <li>
              <Link to="/formation/corporation" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Building2 size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Form a Corporation</span>
              </Link>
            </li>
            <li>
              <Link to="/formation/s-corp" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Building2 size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>S Corporation</span>
              </Link>
            </li>
            <li>
              <Link to="/formation/nonprofit" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Building2 size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Form a Nonprofit</span>
              </Link>
            </li>
            <li>
              <Link to="/business-name-search" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Search size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Business Name Search</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Manage Your Business</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/services/registered-agent" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Shield size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Registered Agent Service</span>
              </Link>
            </li>
            <li>
              <Link to="/services/annual-report" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileText size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Annual Report Filing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/amendments" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileSignature size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Amendments</span>
              </Link>
            </li>
            <li>
              <Link to="/services/certificates" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileText size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Certificates of Good Standing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/foreign-qualification" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <GlobeLock size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Foreign Qualification</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Business Essentials</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/services/ein" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Briefcase size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>EIN / Tax ID Number</span>
              </Link>
            </li>
            <li>
              <Link to="/services/business-licenses" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileText size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Business Licenses</span>
              </Link>
            </li>
            <li>
              <Link to="/services/dba" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileSignature size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>DBA Filing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/trademark" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Shield size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Trademark Registration</span>
              </Link>
            </li>
            <li>
              <Link to="/services/virtual-address" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Building2 size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Virtual Address</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Resources</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/compare-entities" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <BookOpen size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Entity Comparison</span>
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <Landmark size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link to="/resources/guides" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <BookOpen size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Business Guides</span>
              </Link>
            </li>
            <li>
              <Link to="/resources/blog" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <FileText size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/resources/faq" className="flex items-center text-gray-700 hover:text-orange-500 group">
                <BookOpen size={18} className="mr-2 text-gray-400 group-hover:text-orange-500" />
                <span>FAQs</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;