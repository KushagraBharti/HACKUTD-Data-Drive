import React from 'react';
import FuelEfficiencyPrediction from './components/FuelEfficiencyPrediction';

const App: React.FC = () => {
  return (
    <div className="app min-h-screen bg-gray-100 flex items-center justify-center">
      <FuelEfficiencyPrediction />
    </div>
  );
};

export default App;
