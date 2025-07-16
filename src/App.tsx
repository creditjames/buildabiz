import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import FormationPage from './pages/FormationPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';
import { FormationProvider } from './context/FormationContext';

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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/test" element={<div>Test page works!</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;