from flask import Flask
from routes.data_routes import data_routes
from routes.pinata_routes import pinata_routes
from utils.load_env import load_environment_variables
from apscheduler.schedulers.background import BackgroundScheduler
from services.predictive_alerts import periodic_anomaly_check
import atexit

# Load environment variables
load_environment_variables()

# Initialize the Flask app
app = Flask(__name__)

# Register blueprints (i.e., routes)
app.register_blueprint(data_routes)
app.register_blueprint(pinata_routes)

scheduler = BackgroundScheduler()
scheduler.add_job(periodic_anomaly_check, 'interval', hours=24)  # Runs every day
scheduler.start()

atexit.register(lambda: scheduler.shutdown())

if __name__ == '__main__':
    app.run(debug=True)
