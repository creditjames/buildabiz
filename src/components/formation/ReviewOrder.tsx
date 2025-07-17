import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useFormation } from '../../context/FormationContext';

interface ReviewOrderProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  onSubmit: () => void;
  error?: string | null;
}

const ReviewOrder: React.FC<ReviewOrderProps> = ({ formData, updateFormData, onSubmit, error }) => {
  const { calculateTotalPrice } = useFormation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const getEntityTypeDisplay = () => {
    switch (formData.entityType) {
      case 'llc':
        return 'Limited Liability Company (LLC)';
      case 'c-corp':
        return 'C Corporation';
      case 's-corp':
        return 'S Corporation';
      case 'nonprofit':
        return 'Nonprofit Corporation';
      default:
        return formData.entityType;
    }
  };
  
  const getPackageDisplay = () => {
    switch (formData.selectedPackage) {
      case 'basic':
        return 'Basic';
      case 'standard':
        return 'Standard';
      case 'premium':
        return "Pro'Preneur";
      default:
        return formData.selectedPackage;
    }
  };

  const getPackagePrice = () => {
    switch (formData.selectedPackage) {
      case 'basic':
        return 199;
      case 'standard':
        return 399;
      case 'premium':
        return 999;
      default:
        return 0;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('email', e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('password', e.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      
      // First create the user and business record
      await onSubmit();

      // Create and redirect to Stripe checkout
      // <div className="text-center text-orange-600 font-semibold">Paddle payment integration coming soon.</div>
    } catch (err) {
      console.error('Error during submission:', err);
      navigate('/payment/failed');
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Order</h2>
      <p className="text-gray-600 mb-6">
        Please review your information and create your account before submitting your order.
      </p>

      {/* Account Creation Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Create Your Account</h3>
        </div>
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Business Information */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Business Information</h3>
        </div>
        <div className="p-5">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Entity Type</dt>
              <dd className="mt-1 text-base text-gray-900">{getEntityTypeDisplay()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">State of Formation</dt>
              <dd className="mt-1 text-base text-gray-900">{formData.state}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Business Name</dt>
              <dd className="mt-1 text-base text-gray-900">{formData.businessName}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Business Address</dt>
              <dd className="mt-1 text-base text-gray-900">
                {formData.businessAddress.street}
                {formData.businessAddress.unit && `, ${formData.businessAddress.unit}`}
                <br />
                {formData.businessAddress.city}, {formData.businessAddress.state} {formData.businessAddress.zipCode}
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Registered Agent</dt>
              <dd className="mt-1 text-base text-gray-900">
                {formData.useRegisteredAgent 
                  ? 'Free Registered Agent Service (1st year)'
                  : `${formData.registeredAgent.name}, ${formData.registeredAgent.street}, ${formData.registeredAgent.city}, ${formData.registeredAgent.state} ${formData.registeredAgent.zipCode}`
                }
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Business Purpose</dt>
              <dd className="mt-1 text-base text-gray-900">{formData.businessPurpose}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="p-5 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
        </div>
        <div className="p-5">
          <dl className="grid grid-cols-1 gap-y-6">
            <div>
              <dt className="text-sm font-medium text-gray-500">Selected Package</dt>
              <dd className="mt-1 text-base text-gray-900">{getPackageDisplay()} Package</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Package Price</dt>
              <dd className="mt-1 text-base text-gray-900">${getPackagePrice()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">{formData.state} State Filing Fee</dt>
              <dd className="mt-1 text-base text-gray-900">${70}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">${getPackagePrice() + 70}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Terms and Submit */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and agree to the <Link to="/terms" className="text-orange-500 hover:text-orange-600">Terms of Service</Link> and <Link to="/privacy" className="text-orange-500 hover:text-orange-600">Privacy Policy</Link>
            </label>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="text-red-500 mr-3 flex-shrink-0 mt-0.5" size={18} />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {isProcessing ? (
          <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-md font-medium flex items-center justify-center">
            <Loader2 className="animate-spin mr-2" size={20} />
            <span>Processing your order...</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!acceptedTerms || !formData.email || !formData.password || isProcessing}
            className={`w-full flex items-center justify-center px-6 py-4 rounded-md text-white font-medium transition-all duration-300 ${
              (!acceptedTerms || !formData.email || !formData.password || isProcessing)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg'
            }`}
          >
            <CheckCircle size={20} className="mr-2" />
            <span>Submit Order</span>
          </button>
        )}
        
        <p className="text-center text-sm text-gray-500 mt-4">
          You will be redirected to our secure payment page after submitting.
        </p>
      </div>
    </div>
  );
};

export default ReviewOrder;