import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import FuelEfficiencyPrediction from './components/FuelEfficiencyPrediction.tsx';
// Import other components if they exist

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>

        {/* Example additional content */}
        <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
          <FuelEfficiencyPrediction />
        </div>
      </div>
    </Router>
  );
};

export default App;
