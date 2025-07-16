import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  CreditCard, 
  Settings,
  FileText,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarLinks = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      description: 'Overview of your business'
    },
    { 
      icon: Files, 
      label: 'Documents', 
      path: '/dashboard/documents',
      description: 'View and manage documents'
    },
    { 
      icon: FileText, 
      label: 'Business Plan', 
      path: '/dashboard/business-plan',
      description: 'Create and manage your business plan'
    },
    { 
      icon: CreditCard, 
      label: 'Billing', 
      path: '/dashboard/billing',
      description: 'Manage payments and subscriptions'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      description: 'Account preferences'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-64 backdrop-blur-xl bg-white/80 border-r border-gray-200/50 p-4 overflow-y-auto`}
      >
        <div className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                location.pathname === link.path 
                  ? 'bg-orange-100/50 text-orange-600' 
                  : 'hover:bg-orange-50/50 text-gray-700 hover:text-gray-900'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                {link.description}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {children}
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;