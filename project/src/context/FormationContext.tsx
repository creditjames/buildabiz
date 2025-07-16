import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormationContextType {
  formData: any;
  updateFormData: (key: string, value: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  pricing: {
    stateFees: { [key: string]: number };
    packages: {
      basic: number;
      standard: number;
      premium: number;
    };
  };
  calculateTotalPrice: (state: string, packageType: string) => number;
}

const defaultFormData = {
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
  selectedPackage: 'standard'
};

const defaultPricing = {
  stateFees: {
    'CA': 70,
    'NY': 200,
    'TX': 300,
    'FL': 125,
    'IL': 150
  },
  packages: {
    basic: 0,
    standard: 199,
    premium: 299
  }
};

const FormationContext = createContext<FormationContextType | undefined>(undefined);

export const FormationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [pricing] = useState(defaultPricing);
  
  const updateFormData = (key: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };
  
  const calculateTotalPrice = (state: string, packageType: string) => {
    const stateFee = pricing.stateFees[state] || 0;
    const packagePrice = pricing.packages[packageType as keyof typeof pricing.packages] || 0;
    return stateFee + packagePrice;
  };
  
  return (
    <FormationContext.Provider 
      value={{ 
        formData, 
        updateFormData, 
        currentStep, 
        setCurrentStep, 
        pricing,
        calculateTotalPrice
      }}
    >
      {children}
    </FormationContext.Provider>
  );
};

export const useFormation = (): FormationContextType => {
  const context = useContext(FormationContext);
  if (!context) {
    throw new Error('useFormation must be used within a FormationProvider');
  }
  return context;
};