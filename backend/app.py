from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from routes.data_routes import data_routes
from routes.pinata_routes import pinata_routes
from utils.load_env import load_environment_variables
from apscheduler.schedulers.background import BackgroundScheduler
from services.predictive_alerts import periodic_anomaly_check
import atexit
import numpy as np
import pandas as pd
from joblib import load, dump
from pathlib import Path  # Import pathlib for path handling

# Load environment variables
load_environment_variables()

# Define the base directory
BASE_DIR = Path(__file__).resolve().parent

# Define paths to the model files using pathlib
MODELS_DIR = BASE_DIR / 'models'
VISUALIZATIONS_DIR = BASE_DIR / 'visualizations'
DATA_FILE_PATH = BASE_DIR / 'data' / 'all_toyota_data.xlsx'

# Paths to specific models
KMEANS_MODEL_PATH = MODELS_DIR / 'kmeans_model.joblib'
SCALER_PATH = MODELS_DIR / 'scaler.pkl'
MODEL_FILE_PATH = MODELS_DIR / 'fuel_economy_model.pkl'

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Register blueprints (i.e., routes)
app.register_blueprint(data_routes)
app.register_blueprint(pinata_routes)

# Background Scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(periodic_anomaly_check, 'interval', hours=24)  # Runs every day
scheduler.start()

# Ensure the scheduler shuts down properly on exit
atexit.register(lambda: scheduler.shutdown())

# Load the saved models
try:
    print(f"Loading scaler model from: {SCALER_PATH}")
    scaler = load(SCALER_PATH)

    print(f"Loading Linear Regression model from: {MODEL_FILE_PATH}")
    model = load(MODEL_FILE_PATH)

except FileNotFoundError as e:
    print(f"Model loading error: {str(e)}")
    scaler = None
    model = None

# API Endpoint to Predict Fuel Efficiency
@app.route('/predict-fuel-efficiency', methods=['POST'])
def predict_fuel_efficiency_endpoint():
    try:
        # Get input data from the request
        data = request.json
        print("Received data:", data)
        features = [
            'Eng Displ',
            '# Cyl',
            'City FE (Guide) - Conventional Fuel',
            'Hwy FE (Guide) - Conventional Fuel',
            'Comb CO2 Rounded Adjusted (as shown on FE Label)'
        ]
        
        # Extract feature values from input data
        input_data = [data.get(feature) for feature in features]
        print("Extracted features for prediction:", input_data)

        # Ensure input has 5 features
        if len(input_data) != 5:
            return jsonify({'error': 'Input data does not contain the correct number of features.'}), 400

        # Scale the input features
        input_data_scaled = scaler.transform([input_data])
        print("Scaled input data shape:", input_data_scaled.shape)

        # Predict fuel efficiency
        prediction = model.predict(input_data_scaled)
        print("Prediction result:", prediction)

        # Return the predicted value
        return jsonify({'predicted_comb_fe': prediction[0]})
    
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
