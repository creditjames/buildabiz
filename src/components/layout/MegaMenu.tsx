import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, FileText, Briefcase, Shield, GlobeLock, BookOpen, FileSignature, Landmark, Search } from 'lucide-react';

const MegaMenu = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-black/40 backdrop-blur-xl shadow-2xl rounded-b-2xl mt-0 z-50 border-t border-white/30">
      <div className="container mx-auto p-6 grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Start Your Business</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/formation" className="flex items-center text-white hover:text-orange-300 group">
                <Building2 size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Form an LLC</span>
              </Link>
            </li>
            <li>
              <Link to="/formation" className="flex items-center text-white hover:text-orange-300 group">
                <Building2 size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Form a Corporation</span>
              </Link>
            </li>
            <li>
              <Link to="/formation" className="flex items-center text-white hover:text-orange-300 group">
                <Building2 size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>S Corporation</span>
              </Link>
            </li>
            <li>
              <Link to="/formation" className="flex items-center text-white hover:text-orange-300 group">
                <Building2 size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Form a Nonprofit</span>
              </Link>
            </li>
            <li>
              <Link to="/business-name-search" className="flex items-center text-white hover:text-orange-300 group">
                <Search size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Business Name Search</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Manage Your Business</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/services/registered-agent" className="flex items-center text-white hover:text-orange-300 group">
                <Shield size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Registered Agent Service</span>
              </Link>
            </li>
            <li>
              <Link to="/services/annual-report-filing" className="flex items-center text-white hover:text-orange-300 group">
                <FileText size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Annual Report Filing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/amendments" className="flex items-center text-white hover:text-orange-300 group">
                <FileSignature size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Amendments</span>
              </Link>
            </li>
            <li>
              <Link to="/services/certificates-of-good-standing" className="flex items-center text-white hover:text-orange-300 group">
                <FileText size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Certificates of Good Standing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/foreign-qualification" className="flex items-center text-white hover:text-orange-300 group">
                <GlobeLock size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Foreign Qualification</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Business Essentials</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/services/ein-service" className="flex items-center text-white hover:text-orange-300 group">
                <Briefcase size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>EIN / Tax ID Number</span>
              </Link>
            </li>
            <li>
              <Link to="/services/business-licenses" className="flex items-center text-white hover:text-orange-300 group">
                <FileText size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Business Licenses</span>
              </Link>
            </li>
            <li>
              <Link to="/services/dba-filing" className="flex items-center text-white hover:text-orange-300 group">
                <FileSignature size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>DBA Filing</span>
              </Link>
            </li>
            <li>
              <Link to="/services/trademark-registration" className="flex items-center text-white hover:text-orange-300 group">
                <Shield size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Trademark Registration</span>
              </Link>
            </li>
            <li>
              <Link to="/services/virtual-address" className="flex items-center text-white hover:text-orange-300 group">
                <Building2 size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Virtual Address</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4 text-gray-800">Resources</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/entity-comparison" className="flex items-center text-white hover:text-orange-300 group">
                <BookOpen size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Entity Comparison</span>
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="flex items-center text-white hover:text-orange-300 group">
                <Landmark size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link to="/business-guides" className="flex items-center text-white hover:text-orange-300 group">
                <BookOpen size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Business Guides</span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className="flex items-center text-white hover:text-orange-300 group">
                <FileText size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="flex items-center text-white hover:text-orange-300 group">
                <BookOpen size={18} className="mr-2 text-gray-300 group-hover:text-orange-400" />
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