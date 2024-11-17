import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import FuelEfficiencyPrediction from './components/FuelEfficiencyPrediction';
import ClusterInsights from './components/ClusterInsights';
import ShapSummaryPlot from './components/ShapSummaryPlot';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen w-full bg-[#1a1a1a]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        
        {/* Components container */}
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
          <FuelEfficiencyPrediction />
          <ClusterInsights />
          <ShapSummaryPlot />
        </div>
      </div>
    </Router>
  );
};

export default App;
