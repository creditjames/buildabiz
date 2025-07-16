import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <Header />
          <h1>Test Page - Footer Added!</h1>
          <p>If you can see this, Footer component is working correctly.</p>
          <p>Current time: {new Date().toLocaleString()}</p>
          <Routes>
            <Route path="/" element={<div>Home Route Works!</div>} />
            <Route path="/test" element={<div>Test Route Works!</div>} />
          </Routes>
          <Footer />
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;