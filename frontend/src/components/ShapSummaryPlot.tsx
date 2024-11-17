import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShapSummaryPlot: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryPlot = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/shap-summary', {
          responseType: 'blob',
        });
        setImgSrc(URL.createObjectURL(response.data));
      } catch (err) {
        setError('Failed to load SHAP summary plot.');
      }
    };

    fetchSummaryPlot();
  }, []);

  return (
    <div className="shap-summary-container max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">SHAP Summary Plot</h2>
      {imgSrc ? (
        <img src={imgSrc} alt="SHAP Plot" className="rounded-lg shadow" />
      ) : (
        <p className="text-center text-yellow-400">{error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default ShapSummaryPlot;
