import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import FuelEfficiencyPrediction from './components/FuelEfficiencyPrediction';
import ClusterInsights from './components/ClusterInsights';
import ShapSummaryPlot from './components/ShapSummaryPlot';

// App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
          <FuelEfficiencyPrediction />
        <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
          <ClusterInsights />
          <ShapSummaryPlot />
      </div>
      </div>
      </div>
    </Router>
  );
};

export default App;
