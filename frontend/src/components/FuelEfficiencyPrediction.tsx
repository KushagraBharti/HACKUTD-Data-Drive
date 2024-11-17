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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePredict = async () => {
    // Validation
    if (Object.values(inputData).some((val) => val === '')) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPredictedValue(null);

    try {
      const response = await axios.post<PredictionResponse>(
        'http://127.0.0.1:5000/predict-fuel-efficiency',
        inputData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPredictedValue(response.data.predicted_comb_fe);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fuel-efficiency-prediction max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Fuel Efficiency Prediction</h2>
      <div className="space-y-4">
        {Object.entries(inputData).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-400">{key}:</label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <Button label={isLoading ? 'Loading...' : 'Predict Fuel Efficiency'} onClick={handlePredict} />
      </div>

      {isLoading && <p className="mt-4 text-center text-yellow-400">Loading...</p>}
      {predictedValue !== null && <p className="mt-4 text-center text-green-400">Prediction: {predictedValue.toFixed(2)} MPG</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default FuelEfficiencyPrediction;
