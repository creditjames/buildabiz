import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Simple test components
const TestHomePage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold">Build-A-Biz</h1>
    <p className="mt-4">Your business formation platform is working!</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TestHomePage />} />
            <Route path="/test" element={<div>Test page works!</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;