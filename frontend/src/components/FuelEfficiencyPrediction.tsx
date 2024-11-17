import React, { useState } from 'react';
import axios from 'axios';
import Button from './ui/Button';  

interface InputData {
  'Eng Displ': number | string;
  '# Cyl': number | string;
  'City FE (Guide) - Conventional Fuel': number | string;
  'Hwy FE (Guide) - Conventional Fuel': number | string;
  'Comb CO2 Rounded Adjusted (as shown on FE Label)': number | string;
}

interface PredictionResponse {
  predicted_comb_fe: number;
}

const FuelEfficiencyPrediction: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    'Eng Displ': '',
    '# Cyl': '',
    'City FE (Guide) - Conventional Fuel': '',
    'Hwy FE (Guide) - Conventional Fuel': '',
    'Comb CO2 Rounded Adjusted (as shown on FE Label)': '',
  });

  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post<PredictionResponse>('http://127.0.0.1:5000/predict-fuel-efficiency', inputData);
      setPredictedValue(response.data.predicted_comb_fe);
      setError(null);
    } catch (err: any) {
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div className="fuel-efficiency-prediction max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Fuel Efficiency Prediction</h2>
      <div className="input-form space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Engine Displacement (Eng Displ): </label>
          <input
            type="number"
            name="Eng Displ"
            value={inputData['Eng Displ']}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Number of Cylinders (# Cyl): </label>
          <input
            type="number"
            name="# Cyl"
            value={inputData['# Cyl']}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">City Fuel Efficiency (City FE): </label>
          <input
            type="number"
            name="City FE (Guide) - Conventional Fuel"
            value={inputData['City FE (Guide) - Conventional Fuel']}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Highway Fuel Efficiency (Hwy FE): </label>
          <input
            type="number"
            name="Hwy FE (Guide) - Conventional Fuel"
            value={inputData['Hwy FE (Guide) - Conventional Fuel']}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Combined CO2 Emission (Comb CO2): </label>
          <input
            type="number"
            name="Comb CO2 Rounded Adjusted (as shown on FE Label)"
            value={inputData['Comb CO2 Rounded Adjusted (as shown on FE Label)']}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <Button label="Predict Fuel Efficiency" onClick={handlePredict} />
      </div>

      {predictedValue !== null && (
        <div className="result mt-6 text-center text-green-600 font-bold">
          <h3>Predicted Combined Fuel Efficiency: {predictedValue.toFixed(2)} MPG</h3>
        </div>
      )}
      {error && (
        <div className="error mt-4 text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default FuelEfficiencyPrediction;
