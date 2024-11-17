import joblib
import numpy as np
import pandas as pd

# Load saved models
scaler = joblib.load('../backend/models/scaler.joblib')
kmeans = joblib.load('../backend/models/kmeans_model.joblib')

def predict_cluster(input_data):
    try:
        # Convert input data to a DataFrame with appropriate column names
        feature_names = [
            'City FE (Guide) - Conventional Fuel',
            'Hwy FE (Guide) - Conventional Fuel',
            'Comb FE (Guide) - Conventional Fuel',
            'Annual Fuel1 Cost - Conventional Fuel'
        ]
        data_df = pd.DataFrame([input_data], columns=feature_names)

        # Scale the input data
        scaled_data = scaler.transform(data_df)

        # Predict the cluster
        cluster_id = int(kmeans.predict(scaled_data)[0])
        return cluster_id
    except Exception as e:
        print(f"Error in predict_cluster: {str(e)}")
        raise e

def generate_cluster_insights(cluster_id):
    insights_map = {
        0: {
            "description": "High fuel efficiency vehicles.",
            "average_comb_fe": 35,
            "recommendation": "Keep tires inflated and perform regular maintenance."
        },
        1: {
            "description": "Moderate fuel efficiency vehicles.",
            "average_comb_fe": 25,
            "recommendation": "Consider eco-friendly driving habits."
        },
        2: {
            "description": "Low fuel efficiency vehicles.",
            "average_comb_fe": 15,
            "recommendation": "Plan short trips efficiently."
        }
    }
    return insights_map.get(cluster_id, {"description": "No insights available."})
