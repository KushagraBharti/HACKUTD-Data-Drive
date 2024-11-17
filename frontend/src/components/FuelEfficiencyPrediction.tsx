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
    setIsLoading(true);
    setError(null);
    setPredictedValue(null);

    try {
      const response = await axios.post<PredictionResponse>(
        'http://127.0.0.1:5000/predict-fuel-efficiency',
        inputData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setPredictedValue(response.data.predicted_comb_fe);
    } catch (err: any) {
      setError(err.response ? err.response.data.error : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fuel-efficiency-prediction max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Fuel Efficiency Prediction</h2>
      <div className="input-form space-y-4">
        {Object.keys(inputData).map((key) => (
          <div key={key}>
            <label className="block mb-2 text-sm font-medium text-gray-400">{key}: </label>
            <input
              type="number"
              name={key}
              value={(inputData as any)[key]}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <Button label={isLoading ? 'Loading...' : 'Predict Fuel Efficiency'} onClick={handlePredict} />
      </div>

      {isLoading && (
        <div className="loading mt-6 text-center text-yellow-400 font-bold">
          <h3>Loading, please wait...</h3>
        </div>
      )}

      {predictedValue !== null && !isLoading && (
        <div className="result mt-6 text-center text-green-400 font-bold">
          <h3>Predicted Combined Fuel Efficiency: {predictedValue.toFixed(2)} MPG</h3>
        </div>
      )}
      {error && (
        <div className="error mt-4 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default FuelEfficiencyPrediction;