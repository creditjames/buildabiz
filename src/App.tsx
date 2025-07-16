import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <Header />
          <h1>Test Page - Other Pages Added!</h1>
          <p>If you can see this, other page components are working correctly.</p>
          <p>Current time: {new Date().toLocaleString()}</p>
          <Routes>
            <Route path="/" element={<HomePage />} />
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