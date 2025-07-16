import React, { useState } from 'react';
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

// Basic FormationPage with structure but no complex logic
const BasicFormationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    entityType: 'llc',
    state: 'CA',
    businessName: '',
    businessAddress: {
      street: '',
      unit: '',
      city: '',
      state: 'CA',
      zipCode: ''
    },
    useRegisteredAgent: true,
    registeredAgent: {
      name: '',
      street: '',
      unit: '',
      city: '',
      state: 'CA',
      zipCode: ''
    },
    members: [
      { name: '', title: '', address: '', ownership: '' }
    ],
    businessPurpose: '',
    selectedPackage: 'standard',
    email: '',
    password: ''
  });

  const steps = [
    { id: 'business-name', label: 'Business Name' },
    { id: 'business-address', label: 'Business Address' },
    { id: 'registered-agent', label: 'Registered Agent' },
    { id: 'members', label: 'Members/Owners' },
    { id: 'business-purpose', label: 'Business Purpose' },
    { id: 'select-package', label: 'Select Package' },
    { id: 'review', label: 'Review' }
  ];

  const updateFormData = (key: string, value: any) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormStep = () => {
    switch (steps[currentStep].id) {
      case 'business-name':
        return (
          <BusinessNameForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'business-address':
        return (
          <BusinessAddressForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'registered-agent':
        return (
          <RegisteredAgentForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'members':
        return (
          <MembersForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'business-purpose':
        return (
          <BusinessPurposeForm 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'select-package':
        return (
          <PackageSelection 
            formData={formData} 
            updateFormData={updateFormData} 
          />
        );
      case 'review':
        return (
          <ReviewOrder 
            formData={formData} 
            updateFormData={updateFormData}
            onSubmit={() => console.log('Submit clicked')}
          />
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Formation</h1>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? 'text-orange-500' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      index < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderFormStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-md'
              }`}
            >
              <ArrowLeft size={16} className="inline mr-2" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                currentStep === steps.length - 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md'
              }`}
            >
              Next
              <ArrowRight size={16} className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <Header />
          <h1>Test Page - Basic FormationPage Added!</h1>
          <p>If you can see this, basic FormationPage is working correctly.</p>
          <p>Current time: {new Date().toLocaleString()}</p>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formation" element={<BasicFormationPage />} />
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