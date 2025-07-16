import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FormationProvider } from './context/FormationContext';

function App() {
  return (
    <Router>
      <FormationProvider>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Test Page - FormationProvider Added!</h1>
          <p>If you can see this, FormationProvider is working correctly.</p>
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