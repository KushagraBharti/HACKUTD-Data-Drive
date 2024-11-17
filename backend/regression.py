import os
import pandas as pd
import numpy as np
import requests
import joblib
from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Pinata API Credentials
PINATA_API_KEY = os.getenv('PINATA_API_KEY')
PINATA_API_SECRET = os.getenv('PINATA_API_SECRET')
PINATA_BASE_URL = 'https://api.pinata.cloud'

# Initialize Flask app
app = Flask(__name__)

# Paths to important files
DATA_FILE_PATH = './data/all_toyota_data.xlsx'
MODEL_FILE_PATH = './models/fuel_economy_model.pkl'
SCALER_FILE_PATH = './models/scaler.pkl'

# Preprocessing the Data
def preprocess_data(file_path):
    # Load the dataset
    df = pd.read_excel(file_path, engine='openpyxl')

    # Select relevant features and target variable
    features = ['Eng Displ', '# Cyl', 'City FE (Guide) - Conventional Fuel', 'Hwy FE (Guide) - Conventional Fuel', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']
    target = 'Comb FE (Guide) - Conventional Fuel'

    # Handle missing values by dropping rows with any missing values
    df_filtered = df[features + [target]].dropna()

    # Split data into features (X) and target (y)
    X = df_filtered[features]
    y = df_filtered[target]

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Normalize the features using StandardScaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    return X_train_scaled, X_test_scaled, y_train, y_test, scaler

# Train the Regression Model
def train_model(X_train, y_train):
    # Initialize the Linear Regression model
    model = LinearRegression()

    # Train the model on the training data
    model.fit(X_train, y_train)
    return model

# Evaluate the Model
def evaluate_model(model, X_test, y_test):
    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Evaluate the model using MAE and R-Squared metrics
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"Mean Absolute Error (MAE): {mae}")
    print(f"R-Squared (R2): {r2}")

# Save the Model and Scaler
def save_model_and_scaler(model, scaler, model_path, scaler_path):
    # Save the trained model to a file
    joblib.dump(model, model_path)
    # Save the scaler as well, as it will be required to scale new data for predictions
    joblib.dump(scaler, scaler_path)

# Pin File to Pinata
def pin_file_to_pinata(filepath, filename):
    url = f"{PINATA_BASE_URL}/pinning/pinFileToIPFS"
    headers = {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_API_SECRET
    }
    try:
        with open(filepath, 'rb') as file:
            response = requests.post(url, files={'file': (filename, file)}, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to pin file", "details": response.text}
    except Exception as e:
        return {"error": "Exception occurred while pinning file", "details": str(e)}

# API Endpoint to Predict Fuel Efficiency
@app.route('/predict-fuel-efficiency', methods=['POST'])
def predict_fuel_efficiency():
    try:
        # Load model and scaler
        model = joblib.load(MODEL_FILE_PATH)
        scaler = joblib.load(SCALER_FILE_PATH)

        # Get input data from the request
        data = request.json
        features = ['Eng Displ', '# Cyl', 'City FE (Guide) - Conventional Fuel', 'Hwy FE (Guide) - Conventional Fuel', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']
        
        # Extract feature values from input data
        input_data = [data.get(feature) for feature in features]

        # Convert to numpy array and reshape
        input_array = np.array(input_data).reshape(1, -1)

        # Scale the input data
        input_scaled = scaler.transform(input_array)

        # Predict using the loaded model
        prediction = model.predict(input_scaled)

        # Return the predicted value
        return jsonify({'predicted_comb_fe': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# API Endpoint to Pin the Combined Excel File to Pinata
@app.route('/pin-excel-data', methods=['POST'])
def pin_excel_data():
    filename = 'all_toyota_data.xlsx'

    # Pin the file to Pinata
    pinata_response = pin_file_to_pinata(DATA_FILE_PATH, filename)

    # Check response and display the IPFS hash
    if 'IpfsHash' in pinata_response:
        return jsonify({'message': 'Excel file pinned successfully', 'IpfsHash': pinata_response['IpfsHash']})
    else:
        return jsonify({'error': pinata_response.get('details', 'No details available')}), 500

if __name__ == '__main__':
    # Preprocess the data
    X_train_scaled, X_test_scaled, y_train, y_test, scaler = preprocess_data(DATA_FILE_PATH)

    # Train the model
    model = train_model(X_train_scaled, y_train)

    # Evaluate the model
    evaluate_model(model, X_test_scaled, y_test)

    # Save the model and scaler for future use
    save_model_and_scaler(model, scaler, MODEL_FILE_PATH, SCALER_FILE_PATH)

    # Run Flask app
    app.run(debug=True)
