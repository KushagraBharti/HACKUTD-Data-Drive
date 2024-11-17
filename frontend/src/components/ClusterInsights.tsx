import React, { useState } from 'react';
import axios from 'axios';
import Button from './ui/Button';

interface InputData {
  'City FE (Guide) - Conventional Fuel': number | string;
  'Hwy FE (Guide) - Conventional Fuel': number | string;
  'Comb FE (Guide) - Conventional Fuel': number | string;
  'Annual Fuel1 Cost - Conventional Fuel': number | string;
}

interface ClusterResponse {
  cluster_id: number;
  insights: {
    description: string;
    average_comb_fe: number;
    recommendation: string;
  };
}

const ClusterInsights: React.FC = () => {
  const [inputData, setInputData] = useState<InputData>({
    'City FE (Guide) - Conventional Fuel': '',
    'Hwy FE (Guide) - Conventional Fuel': '',
    'Comb FE (Guide) - Conventional Fuel': '',
    'Annual Fuel1 Cost - Conventional Fuel': '',
  });

  const [clusterResult, setClusterResult] = useState<ClusterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePredictCluster = async () => {
    setIsLoading(true);
    setError(null);
    setClusterResult(null);

    try {
      const processedInputData = Object.fromEntries(
        Object.entries(inputData).map(([key, value]) => [key, parseFloat(value as string)])
      );

      const response = await axios.post<ClusterResponse>(
        'http://127.0.0.1:5000/predict-cluster',
        processedInputData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.cluster_id !== undefined) {
        setClusterResult(response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.response ? err.response.data.error : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cluster-insights max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Cluster Insights</h2>
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
        <Button label={isLoading ? 'Loading...' : 'Predict Cluster'} onClick={handlePredictCluster} />
      </div>

      {isLoading && (
        <div className="loading mt-6 text-center text-yellow-400 font-bold">
          <h3>Loading, please wait...</h3>
        </div>
      )}

      {clusterResult && !isLoading && (
        <div className="result mt-6 text-center text-green-400 font-bold">
          <h3>Cluster: {clusterResult.cluster_id}</h3>
          <p>{clusterResult.insights.description}</p>
          <p>Average Combined FE: {clusterResult.insights.average_comb_fe}</p>
          <p>Recommendation: {clusterResult.insights.recommendation}</p>
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

export default ClusterInsights;
