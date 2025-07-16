import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, LogIn, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MegaMenu from './MegaMenu';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        checkEmployeeStatus(session.user.email);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.email) {
        checkEmployeeStatus(session.user.email);
      } else {
        setIsEmployee(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkEmployeeStatus = (email: string) => {
    console.log('Checking employee status for:', email);
    const employeeDomains = ['@buildabiz.com', '@buildabiz.us', '@wealthyallianceclub.com'];
    const isEmp = employeeDomains.some(domain => email.endsWith(domain));
    console.log('Is employee:', isEmp);
    setIsEmployee(isEmp);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (isEmployee) {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
    setIsUserMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <img src="https://ltovrukgaxnoccgypney.supabase.co/storage/v1/object/public/public/logos/logo-buildabiz.png" alt="Build-A-Biz" className="h-10" />
            </Link>
            
            <nav className="hidden lg:flex space-x-1">
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
              >
                <button className="px-4 py-2 flex items-center text-gray-700 hover:text-orange-500">
                  <span>Our Services</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isServicesMenuOpen && <MegaMenu />}
              </div>
              
              <Link to="/pricing" className="px-4 py-2 text-gray-700 hover:text-orange-500">
                Pricing
              </Link>
              
              <Link to="/compare-entities" className="px-4 py-2 text-gray-700 hover:text-orange-500">
                Compare Entities
              </Link>
              
              <Link to="/business-name-search" className="px-4 py-2 text-gray-700 hover:text-orange-500">
                Name Search
              </Link>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <User size={20} />
                  <span className="text-sm">{user.email?.split('@')[0]}</span>
                  {isEmployee && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      {isEmployee && (
                        <p className="text-xs text-orange-600 font-medium">Administrator Access</p>
                      )}
                    </div>
                    
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      {isEmployee ? 'Admin Dashboard' : 'Dashboard'}
                    </button>
                    
                    {!isEmployee && (
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 border-t border-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <LogIn size={20} className="mr-2" />
                <span>Login</span>
              </Link>
            )}
            <Link 
              to="/formation" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
            >
              Start My Business
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="px-4 py-2 text-gray-900 font-medium border-b border-gray-100">
                    Welcome, {user.email?.split('@')[0]}
                    {isEmployee && (
                      <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      handleDashboardClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-gray-700 hover:text-orange-500"
                  >
                    {isEmployee ? 'Admin Dashboard' : 'Dashboard'}
                  </button>
                  {!isEmployee && (
                    <Link 
                      to="/settings" 
                      className="px-4 py-2 text-gray-700 hover:text-orange-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-gray-700 hover:text-orange-500 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={16} className="mr-2" />
                  <span>Login</span>
                </Link>
              )}
              <Link 
                to="/formation"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start My Business
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-2 text-gray-700 hover:text-orange-500 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Services
              </Link>
              <Link 
                to="/pricing" 
                className="px-4 py-2 text-gray-700 hover:text-orange-500 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/compare-entities" 
                className="px-4 py-2 text-gray-700 hover:text-orange-500 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare Entities
              </Link>
              <Link 
                to="/business-name-search" 
                className="px-4 py-2 text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Name Search
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;