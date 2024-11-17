import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import FuelEfficiencyPrediction from './components/FuelEfficiencyPrediction';
import ClusterInsights from './components/ClusterInsights';
import FuelEfficiencyChart from './components/FuelEfficiencyChart';

// App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
          <FuelEfficiencyPrediction />
        <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
          <ClusterInsights />
          <h1>Fuel Efficiency Predictive Analysis</h1>
          <FuelEfficiencyChart />
      </div>
      </div>
      </div>
    </Router>
  );
};

export default App;
