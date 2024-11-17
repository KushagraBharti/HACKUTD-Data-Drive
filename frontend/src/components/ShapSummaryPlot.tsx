import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShapSummaryPlot: React.FC = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaryPlot = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/shap-summary', {
          responseType: 'blob',
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImgSrc(imageUrl);
      } catch (err) {
        console.error('Error fetching SHAP summary plot:', err);
      }
    };

    fetchSummaryPlot();
  }, []);

  return (
    <div className="shap-summary-container max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">SHAP Summary Plot</h2>
      {imgSrc ? (
        <img src={imgSrc} alt="SHAP Summary Plot" className="w-full h-auto" />
      ) : (
        <p className="text-center text-yellow-400">Loading SHAP Summary Plot...</p>
      )}
    </div>
  );
};

export default ShapSummaryPlot;
