import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import BusinessNameForm from '../components/formation/BusinessNameForm';
import BusinessAddressForm from '../components/formation/BusinessAddressForm';
import RegisteredAgentForm from '../components/formation/RegisteredAgentForm';
import MembersForm from '../components/formation/MembersForm';
import BusinessPurposeForm from '../components/formation/BusinessPurposeForm';
import PackageSelection from '../components/formation/PackageSelection';
import ReviewOrder from '../components/formation/ReviewOrder';
import { supabase } from '../lib/supabase';

// Validate Stripe key before initialization
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_KEY) {
  console.error('Stripe publishable key is missing. Please check your environment variables.');
}
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

const steps = [
  { id: 'business-name', label: 'Business Name' },
  { id: 'business-address', label: 'Business Address' },
  { id: 'registered-agent', label: 'Registered Agent' },
  { id: 'members', label: 'Members/Owners' },
  { id: 'business-purpose', label: 'Business Purpose' },
  { id: 'select-package', label: 'Select Package' },
  { id: 'review', label: 'Review' }
];

const FormationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    entityType: queryParams.get('entityType') || 'llc',
    state: queryParams.get('state') || 'CA',
    businessName: queryParams.get('businessName') || '',
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
    selectedPackage: queryParams.get('package') || 'standard',
    email: '',
    password: ''
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
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
    } else {
      navigate('/');
    }
  };
  
  const handleSubmit = async () => {
    setError(null);
    
    try {
      if (!stripePromise) {
        throw new Error('Stripe is not properly configured. Please contact support.');
      }

      // Create new user with email and password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (!authData.user || !authData.session) {
        throw new Error('Failed to create user account. Please try again.');
      }

      // Create business profile in database
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .insert([
          {
            user_id: authData.user.id,
            entity_type: formData.entityType,
            state: formData.state,
            business_name: formData.businessName,
            business_address: formData.businessAddress,
            registered_agent: {
              use_service: formData.useRegisteredAgent,
              ...formData.registeredAgent
            },
            members: formData.members,
            business_purpose: formData.businessPurpose,
            selected_package: formData.selectedPackage,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (businessError) throw businessError;

      // Create Stripe checkout session using the user's access token
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.session.access_token}`,
        },
        body: JSON.stringify({
          businessId: businessData.id,
          packageType: formData.selectedPackage,
          state: formData.state,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, error: stripeError } = await response.json();
      if (stripeError) throw new Error(stripeError);

      // Get Stripe instance
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) throw redirectError;

    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
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
            onSubmit={handleSubmit}
            error={error}
          />
        );
      default:
        return null;
    }
  };
  
  const isLastStep = currentStep === steps.length - 1;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Form Your {formData.entityType === 'llc' ? 'LLC' : 'Corporation'} in {formData.state}
          </h1>
          <p className="text-gray-600">
            Follow these steps to establish your business legally and get all the documents you need.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="hidden md:block mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div 
                  className={`flex flex-col items-center ${
                    index <= currentStep ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      index < currentStep 
                        ? 'bg-orange-500 text-white' 
                        : index === currentStep 
                          ? 'border-2 border-orange-500 text-orange-500' 
                          : 'border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs text-center">{step.label}</span>
                </div>
                
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-grow h-1 mx-2 ${
                      index < currentStep ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Mobile progress indicator */}
        <div className="md:hidden mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {steps[currentStep].label}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          {renderFormStep()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="inline-flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back</span>
          </button>
          
          {!isLastStep ? (
            <button
              onClick={handleNext}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:shadow-lg inline-flex items-center"
            >
              <span>Continue</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FormationPage;