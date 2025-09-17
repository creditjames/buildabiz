import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Build-A-Biz Logo" className="h-24 w-auto" />
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 animate-fade-in">
            Welcome Back
          </h2>
          <p className="mt-2 text-lg text-gray-600 animate-fade-in-delay">
            Login to your account to check your status and download documents
          </p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-xl overflow-hidden animate-slide-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 animate-pulse h-1"></div>
            
            <form className="p-8" onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <Link to="/forgot-password" className="text-sm font-medium text-orange-500 hover:text-orange-600">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 font-medium transition-all duration-300 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center animate-fade-in-delay">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/formation" className="font-medium text-orange-500 hover:text-orange-600">
              Start your business now
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-gray-600 text-sm font-medium mb-4 animate-fade-in-delay">
            Build-A-Biz is here to help
          </h3>
          <div className="grid grid-cols-3 gap-4 animate-fade-in-delay">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-900 font-medium">24/7 Support</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-900 font-medium">Secure Access</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-900 font-medium">Fast Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;