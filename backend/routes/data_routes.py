from flask import Blueprint, request, jsonify

data_routes = Blueprint('data_routes', __name__)

# In-memory data stores for example purposes
historical_data_store = []
real_time_data_store = []
alerts_store = []
user_preferences_store = {}
carbon_footprint_store = []

@data_routes.route('/historical-data', methods=['GET'])
def get_historical_data():
    return jsonify(historical_data_store), 200

@data_routes.route('/real-time-data', methods=['GET', 'POST'])
def real_time_data():
    if request.method == 'GET':
        return jsonify(real_time_data_store), 200
    elif request.method == 'POST':
        data = request.json
        real_time_data_store.append(data)
        return jsonify({'message': 'Real-time data added successfully'}), 201

@data_routes.route('/alerts', methods=['GET'])
def get_alerts():
    return jsonify(alerts_store), 200

@data_routes.route('/carbon-footprint', methods=['POST'])
def calculate_carbon_footprint():
    data = request.json
    fuel_usage = data.get('fuel_usage')
    pipeline_inefficiency = data.get('pipeline_inefficiency')

    co2_emission = fuel_usage * 2.31 + pipeline_inefficiency * 0.85
    carbon_footprint_store.append(co2_emission)
    
    return jsonify({'CO2_emission': co2_emission}), 200

@data_routes.route('/user-preferences', methods=['GET', 'POST'])
def user_preferences():
    if request.method == 'GET':
        return jsonify(user_preferences_store), 200
    elif request.method == 'POST':
        preferences = request.json
        user_preferences_store.update(preferences)
        return jsonify({'message': 'User preferences updated'}), 201
