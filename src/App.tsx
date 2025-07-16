import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
// Test imports from FormationPage
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
// Test formation component imports
import BusinessNameForm from './components/formation/BusinessNameForm';
import BusinessAddressForm from './components/formation/BusinessAddressForm';
import RegisteredAgentForm from './components/formation/RegisteredAgentForm';
import MembersForm from './components/formation/MembersForm';
import BusinessPurposeForm from './components/formation/BusinessPurposeForm';
import PackageSelection from './components/formation/PackageSelection';
import ReviewOrder from './components/formation/ReviewOrder';
// Test supabase import
import { supabase } from './lib/supabase';

// Simple FormationPage test component
const SimpleFormationPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Formation Components + Supabase Test</h1>
      <p>Testing if the supabase import works with all formation components.</p>
      <p>All components + supabase import added successfully!</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <Header />
          <h1>Test Page - Supabase Import Added!</h1>
          <p>If you can see this, supabase import is working correctly.</p>
          <p>Current time: {new Date().toLocaleString()}</p>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formation" element={<SimpleFormationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/test" element={<div>Test Route Works!</div>} />
          </Routes>
          <Footer />
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;