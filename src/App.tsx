import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test components
const TestHeader = () => <header className="bg-blue-600 text-white p-4">Header</header>;
const TestFooter = () => <footer className="bg-gray-800 text-white p-4">Footer</footer>;
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
        <TestHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TestHomePage />} />
            <Route path="/test" element={<div>Test page works!</div>} />
          </Routes>
        </main>
        <TestFooter />
      </div>
    </Router>
  );
}

export default App;