
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BusinessGuides from './pages/BusinessGuides';
import BusinessNameSearch from './pages/BusinessNameSearch';
import BusinessPlanCreator from './pages/BusinessPlanCreator';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import Dashboard from './pages/Dashboard';
import DocumentsPage from './pages/DocumentsPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EntityComparison from './pages/EntityComparison';
import FAQ from './pages/FAQ';
import HelpCenter from './pages/HelpCenter';
import Partners from './pages/Partners';
import PaymentFailed from './pages/PaymentFailed';
import PaymentProcessing from './pages/PaymentProcessing';
import PaymentSuccess from './pages/PaymentSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProfileSettings from './pages/ProfileSettings';
import RefundPolicy from './pages/RefundPolicy';
import Reviews from './pages/Reviews';
import TermsOfService from './pages/TermsOfService';
import AdminDashboard from './pages/AdminDashboard';
import BillingPage from './pages/BillingPage';
// Service pages
import Amendments from './pages/services/Amendments';
import AnnualReportFiling from './pages/services/AnnualReportFiling';
import BusinessLicenses from './pages/services/BusinessLicenses';
import CertificatesOfGoodStanding from './pages/services/CertificatesOfGoodStanding';
import DBAFiling from './pages/services/DBAFiling';
import EINService from './pages/services/EINService';
import ForeignQualification from './pages/services/ForeignQualification';
import RegisteredAgentService from './pages/services/RegisteredAgentService';
import TrademarkRegistration from './pages/services/TrademarkRegistration';
import VirtualAddress from './pages/services/VirtualAddress';

// Working FormationPage component
const WorkingFormationPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Business Formation
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Start your business formation process with our step-by-step guide
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Business Type
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900">Limited Liability Company</h3>
                <p className="text-gray-600">Most popular choice for small businesses</p>
                <div className="text-2xl font-bold text-orange-500">$49</div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900">C-Corporation</h3>
                <p className="text-gray-600 mb-4">Traditional corporation structure for larger businesses</p>
                <div className="text-2xl font-bold text-orange-500">$99</div>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="text-xl font-bold text-gray-900">S-Corporation</h3>
                <p className="text-gray-600 mb-4">Pass-through taxation with corporate structure</p>
                <div className="text-2xl font-bold text-orange-500">$149</div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Start Formation Process
              </button>
            </div>
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
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/formation" element={<WorkingFormationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/business-guides" element={<BusinessGuides />} />
              <Route path="/business-name-search" element={<BusinessNameSearch />} />
              <Route path="/business-plan-creator" element={<BusinessPlanCreator />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/customer-details" element={<CustomerDetailsPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/entity-comparison" element={<EntityComparison />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/payment-processing" element={<PaymentProcessing />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/billing" element={<BillingPage />} />
              {/* Service pages */}
              <Route path="/services/amendments" element={<Amendments />} />
              <Route path="/services/annual-report-filing" element={<AnnualReportFiling />} />
              <Route path="/services/business-licenses" element={<BusinessLicenses />} />
              <Route path="/services/certificates-of-good-standing" element={<CertificatesOfGoodStanding />} />
              <Route path="/services/dba-filing" element={<DBAFiling />} />
              <Route path="/services/ein-service" element={<EINService />} />
              <Route path="/services/foreign-qualification" element={<ForeignQualification />} />
              <Route path="/services/registered-agent" element={<RegisteredAgentService />} />
              <Route path="/services/trademark-registration" element={<TrademarkRegistration />} />
              <Route path="/services/virtual-address" element={<VirtualAddress />} />
              <Route path="/test" element={<div>Test Route Works!</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;