import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, LogIn, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MegaMenu from './MegaMenu';
import logo from '../../assets/logo.png';

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
        isScrolled 
          ? 'bg-black/20 backdrop-blur-md shadow-lg border-b border-white/30' 
          : 'bg-black/10 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <img src={logo} alt="Build-A-Biz" className="h-10" />
            </Link>
            
            <nav className="hidden lg:flex space-x-1">
              <div 
                className="relative group"
                onMouseEnter={() => setIsServicesMenuOpen(true)}
                onMouseLeave={() => setIsServicesMenuOpen(false)}
              >
                <button className="px-4 py-2 flex items-center text-white hover:text-orange-300 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 shadow-sm transition-colors backdrop-blur-sm">
                  <span>Our Services</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {isServicesMenuOpen && <MegaMenu />}
              </div>
              
              <Link to="/pricing" className="px-4 py-2 text-white hover:text-orange-300 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 shadow-sm transition-colors backdrop-blur-sm">
                Pricing
              </Link>
              
              <Link to="/compare-entities" className="px-4 py-2 text-white hover:text-orange-300 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 shadow-sm transition-colors backdrop-blur-sm">
                Compare Entities
              </Link>
              
              <Link to="/business-name-search" className="px-4 py-2 text-white hover:text-orange-300 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 shadow-sm transition-colors backdrop-blur-sm">
                Name Search
              </Link>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-orange-300 bg-black/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30 shadow-sm"
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
                  <div className="absolute right-0 mt-2 w-56 bg-black/40 backdrop-blur-md rounded-xl shadow-xl py-1 border border-white/30">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-white">{user.email}</p>
                      {isEmployee && (
                        <p className="text-xs text-orange-600 font-medium">Administrator Access</p>
                      )}
                    </div>
                    
                    <button
                      onClick={handleDashboardClick}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-500/20"
                    >
                      {isEmployee ? 'Admin Dashboard' : 'Dashboard'}
                    </button>
                    
                    {!isEmployee && (
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-white hover:bg-orange-500/20"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-orange-500/20 border-t border-white/30"
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
                className="flex items-center text-white hover:text-orange-300 px-3 py-2 rounded-xl bg-white/40 hover:bg-white/60 border border-white/40 shadow-sm transition-colors"
              >
                <LogIn size={20} className="mr-2" />
                <span>Login</span>
              </Link>
            )}
            <Link 
              to="/formation" 
              className="bg-orange-500/90 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
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
      
    {/* Background overlay when mega menu is open */}
    {isServicesMenuOpen && (
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsServicesMenuOpen(false)}
      />
    )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/30 backdrop-blur-md shadow-xl border-t border-white/30">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="px-4 py-2 text-white font-medium border-b border-white/30">
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
                    className="px-4 py-2 text-left text-white hover:text-orange-300"
                  >
                    {isEmployee ? 'Admin Dashboard' : 'Dashboard'}
                  </button>
                  {!isEmployee && (
                    <Link 
                      to="/settings" 
                      className="px-4 py-2 text-white hover:text-orange-300"
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
                    className="px-4 py-2 text-left text-white hover:text-orange-300 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center px-4 py-2 text-white hover:text-orange-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={16} className="mr-2" />
                  <span>Login</span>
                </Link>
              )}
              <Link 
                to="/formation"
                className="bg-orange-500/90 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all text-center backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start My Business
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-2 text-white hover:text-orange-300 border-b border-white/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Services
              </Link>
              <Link 
                to="/pricing" 
                className="px-4 py-2 text-white hover:text-orange-300 border-b border-white/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/compare-entities" 
                className="px-4 py-2 text-white hover:text-orange-300 border-b border-white/40"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare Entities
              </Link>
              <Link 
                to="/business-name-search" 
                className="px-4 py-2 text-white hover:text-orange-300"
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