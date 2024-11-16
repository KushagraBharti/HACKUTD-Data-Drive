from flask import Flask, request, jsonify

# Initialize the Flask app
app = Flask(__name__)

# In-memory data stores for example purposes
historical_data_store = []
real_time_data_store = []
alerts_store = []
user_preferences_store = {}
carbon_footprint_store = []

@app.route('/historical-data', methods=['GET'])
def get_historical_data():
    # Fetch and return historical data
    return jsonify(historical_data_store), 200

@app.route('/real-time-data', methods=['GET', 'POST'])
def real_time_data():
    if request.method == 'GET':
        # Get real-time data (e.g., latest status or simulation)
        return jsonify(real_time_data_store), 200

    elif request.method == 'POST':
        # Simulate the ingestion of real-time data
        data = request.json
        real_time_data_store.append(data)
        return jsonify({'message': 'Real-time data added successfully'}), 201

@app.route('/alerts', methods=['GET'])
def get_alerts():
    # Return inefficiency alerts
    return jsonify(alerts_store), 200

@app.route('/carbon-footprint', methods=['POST'])
def calculate_carbon_footprint():
    # Assume payload is something like {'fuel_usage': X, 'pipeline_inefficiency': Y}
    data = request.json
    fuel_usage = data.get('fuel_usage')
    pipeline_inefficiency = data.get('pipeline_inefficiency')

    # Simple calculation for carbon footprint
    co2_emission = fuel_usage * 2.31 + pipeline_inefficiency * 0.85
    carbon_footprint_store.append(co2_emission)
    
    return jsonify({'CO2_emission': co2_emission}), 200

@app.route('/user-preferences', methods=['GET', 'POST'])
def user_preferences():
    if request.method == 'GET':
        # Return user preferences
        return jsonify(user_preferences_store), 200

    elif request.method == 'POST':
        # Update user preferences
        preferences = request.json
        user_preferences_store.update(preferences)
        return jsonify({'message': 'User preferences updated'}), 201

if __name__ == '__main__':
    # Running the Flask app
    app.run(debug=True)
