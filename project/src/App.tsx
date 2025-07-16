import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FormationPage from './pages/FormationPage';
import BusinessNameSearch from './pages/BusinessNameSearch';
import Dashboard from './pages/Dashboard';
import DocumentsPage from './pages/DocumentsPage';
import BusinessPlanCreator from './pages/BusinessPlanCreator';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import EntityComparison from './pages/EntityComparison';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import PaymentProcessing from './pages/PaymentProcessing';
import ProfileSettings from './pages/ProfileSettings';
import BillingPage from './pages/BillingPage';
import RegisteredAgentService from './pages/services/RegisteredAgentService';
import AnnualReportFiling from './pages/services/AnnualReportFiling';
import Amendments from './pages/services/Amendments';
import CertificatesOfGoodStanding from './pages/services/CertificatesOfGoodStanding';
import EINService from './pages/services/EINService';
import BusinessLicenses from './pages/services/BusinessLicenses';
import DBAFiling from './pages/services/DBAFiling';
import TrademarkRegistration from './pages/services/TrademarkRegistration';
import VirtualAddress from './pages/services/VirtualAddress';
import ForeignQualification from './pages/services/ForeignQualification';
import { FormationProvider } from './context/FormationContext';
import DashboardLayout from './components/layout/DashboardLayout';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import Reviews from './pages/Reviews';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import BusinessGuides from './pages/BusinessGuides';
import Blog from './pages/Blog';
import HelpCenter from './pages/HelpCenter';
import RefundPolicy from './pages/RefundPolicy';

// Redirect components for entity-specific formation routes
const LLCFormation = () => {
  React.useEffect(() => {
    window.location.href = '/formation?entityType=llc';
  }, []);
  return null;
};

const CorporationFormation = () => {
  React.useEffect(() => {
    window.location.href = '/formation?entityType=c-corp';
  }, []);
  return null;
};

const SCorporationFormation = () => {
  React.useEffect(() => {
    window.location.href = '/formation?entityType=s-corp';
  }, []);
  return null;
};

const NonprofitFormation = () => {
  React.useEffect(() => {
    window.location.href = '/formation?entityType=nonprofit';
  }, []);
  return null;
};

function App() {
  return (
    <Router>
      <FormationProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/formation" element={<FormationPage />} />
              
              {/* Entity-specific formation routes */}
              <Route path="/formation/llc" element={<LLCFormation />} />
              <Route path="/formation/corporation" element={<CorporationFormation />} />
              <Route path="/formation/s-corp" element={<SCorporationFormation />} />
              <Route path="/formation/nonprofit" element={<NonprofitFormation />} />
              
              <Route path="/business-name-search" element={<BusinessNameSearch />} />
              <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
              <Route path="/dashboard/documents" element={<DashboardLayout><DocumentsPage /></DashboardLayout>} />
              <Route path="/dashboard/business-plan" element={<DashboardLayout><BusinessPlanCreator /></DashboardLayout>} />
              <Route path="/dashboard/billing" element={<DashboardLayout><BillingPage /></DashboardLayout>} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/customer/:businessId" element={<CustomerDetailsPage />} />
              <Route path="/compare-entities" element={<EntityComparison />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="/payment/processing" element={<PaymentProcessing />} />
              <Route path="/settings" element={<DashboardLayout><ProfileSettings /></DashboardLayout>} />
              
              {/* Service Pages */}
              <Route path="/services/registered-agent" element={<RegisteredAgentService />} />
              <Route path="/services/annual-report" element={<AnnualReportFiling />} />
              <Route path="/services/amendments" element={<Amendments />} />
              <Route path="/services/certificates" element={<CertificatesOfGoodStanding />} />
              <Route path="/services/ein" element={<EINService />} />
              <Route path="/services/business-licenses" element={<BusinessLicenses />} />
              <Route path="/services/dba" element={<DBAFiling />} />
              <Route path="/services/trademark" element={<TrademarkRegistration />} />
              <Route path="/services/virtual-address" element={<VirtualAddress />} />
              <Route path="/services/foreign-qualification" element={<ForeignQualification />} />
              
              {/* Legal Pages */}
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              
              {/* Company Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Resource Pages */}
              <Route path="/resources/faq" element={<FAQ />} />
              <Route path="/resources/guides" element={<BusinessGuides />} />
              <Route path="/resources/blog" element={<Blog />} />
              
              {/* Support Pages */}
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/policies/refund" element={<RefundPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;