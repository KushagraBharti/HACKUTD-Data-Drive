from flask import Blueprint, request, jsonify
from services.data_observability import log_event, detect_redundancy
from services.fuel_economy import generate_insights, data
from services.cluster_service import predict_cluster, generate_cluster_insights

data_routes = Blueprint('data_routes', __name__)

@data_routes.route('/predict-cluster', methods=['POST'])
def predict_cluster_endpoint():
    try:
        # Log received data
        print("Received data:", request.json)

        # Extract features from request
        features = [
            'City FE (Guide) - Conventional Fuel',
            'Hwy FE (Guide) - Conventional Fuel',
            'Comb FE (Guide) - Conventional Fuel',
            'Annual Fuel1 Cost - Conventional Fuel'
        ]

        # Convert data to the required format
        input_data = {feature: request.json.get(feature) for feature in features}
        print("Processed input data:", input_data)

        # Predict cluster
        cluster_id = predict_cluster(input_data)

        # Generate insights based on the cluster
        insights = generate_cluster_insights(cluster_id)

        # Return the response
        return jsonify({"cluster_id": cluster_id, "insights": insights}), 200

    except Exception as e:
        print("Error in /predict-cluster:", str(e))
        return jsonify({"error": str(e)}), 500

@data_routes.route('/historical-data', methods=['GET'])
def get_historical_data():
    log_event('ACCESS', 'User accessed historical data')
    return jsonify(data.to_dict()), 200

@data_routes.route('/real-time-data', methods=['GET', 'POST'])
def real_time_data():
    if request.method == 'GET':
        log_event('ACCESS', 'User accessed real-time data')
        return jsonify(data.to_dict()), 200
    elif request.method == 'POST':
        data_point = request.json
        log_event('MODIFICATION', 'New real-time data added')
        data.append(data_point)  # Simplified for demo purposes
        return jsonify({'message': 'Real-time data added successfully'}), 201

@data_routes.route('/alerts', methods=['GET'])
def get_alerts():
    return jsonify({"message": "This is a placeholder for alerts"}), 200

@data_routes.route('/carbon-footprint', methods=['POST'])
def calculate_carbon_footprint():
    log_event('ACCESS', 'Carbon footprint calculated')
    return jsonify({'CO2_emission': 'calculation'}), 200  # Placeholder implementation

@data_routes.route('/user-preferences', methods=['GET', 'POST'])
def user_preferences():
    if request.method == 'GET':
        log_event('ACCESS', 'User preferences fetched')
        return jsonify({}), 200  # Placeholder
    elif request.method == 'POST':
        log_event('MODIFICATION', 'User preferences updated')
        return jsonify({'message': 'User preferences updated'}), 201
