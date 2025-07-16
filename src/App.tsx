import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';
import Header from './components/layout/Header';

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <Header />
          <h1>Test Page - Header Added!</h1>
          <p>If you can see this, Header component is working correctly.</p>
          <p>Current time: {new Date().toLocaleString()}</p>
          <Routes>
            <Route path="/" element={<div>Home Route Works!</div>} />
            <Route path="/test" element={<div>Test Route Works!</div>} />
          </Routes>
        </div>
      </FormationProvider>
    </Router>
  );
}

export default App;