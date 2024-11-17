import joblib
import numpy as np

# Load saved models
scaler = joblib.load('../backend/models/scaler.joblib')
kmeans = joblib.load('../backend/models/kmeans_model.joblib')

def predict_cluster(input_data):
    try:
        # Convert input data to a numpy array
        data_array = np.array(list(input_data.values())).reshape(1, -1)

        # Scale the input data
        scaled_data = scaler.transform(data_array)

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
