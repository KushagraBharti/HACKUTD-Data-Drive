from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.data_routes import data_routes
from routes.pinata_routes import pinata_routes
from utils.load_env import load_environment_variables
from apscheduler.schedulers.background import BackgroundScheduler
from services.predictive_alerts import periodic_anomaly_check
from services.prediction_service import predict_fuel_efficiency
import atexit
import numpy as np
from joblib import load
from services.cluster_service import predict_cluster, generate_cluster_insights
from routes.explanation_routes import explanation_routes

# Load environment variables
load_environment_variables()

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Register blueprints (i.e., routes)
app.register_blueprint(data_routes)
app.register_blueprint(pinata_routes)
app.register_blueprint(explanation_routes)

# Background Scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(periodic_anomaly_check, 'interval', hours=24)  # Runs every day
scheduler.start()

# Load the saved models
kmeans_model = load('../backend/models/kmeans_model.joblib')
scaler = load('../backend/models/scaler.joblib')

# Ensure the scheduler shuts down properly on exit
atexit.register(lambda: scheduler.shutdown())

# API Endpoint to Predict Fuel Efficiency
@app.route('/predict-fuel-efficiency', methods=['POST'])
def predict_fuel_efficiency_endpoint():
    try:
        # Get input data from the request
        data = request.json
        print("Received data:", data)
        features = ['Eng Displ', '# Cyl', 'City FE (Guide) - Conventional Fuel', 'Hwy FE (Guide) - Conventional Fuel', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']
        
        # Extract feature values from input data
        input_data = [data.get(feature) for feature in features]
        print("Extracted features for prediction:", input_data)

        # Predict fuel efficiency
        prediction = predict_fuel_efficiency(input_data)
        print("Prediction result:", prediction)

        # Return the predicted value
        return jsonify({'predicted_comb_fe': prediction})
    
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({'error': str(e)})

@app.route('/predict-cluster', methods=['POST'])
def predict_cluster_endpoint():
    try:
        # Log received data
        print("Received data:", request.json)

        # Parse input data
        input_data = request.json

        # Perform prediction (this function should use your saved K-Means model)
        cluster_id = predict_cluster(input_data)

        # Log prediction result
        print("Predicted cluster:", cluster_id)

        # Generate insights (ensure this function is working correctly)
        insights = generate_cluster_insights(cluster_id)

        # Return response
        return jsonify({"cluster_id": cluster_id, "insights": insights}), 200
    except Exception as e:
        # Log any errors
        print("Error in /predict-cluster:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
