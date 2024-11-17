import pandas as pd
import shap
import joblib
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler

DATA_FILE_PATH = 'C:/Users/bobba/HACKUTD-Data-Drive/backend/data/all_toyota_data.xlsx'
MODEL_FILE_PATH = 'C:/Users/bobba/HACKUTD-Data-Drive/backend/models/fuel_economy_model.pkl'
SCALER_FILE_PATH = 'C:/Users/bobba/HACKUTD-Data-Drive/backend/models/scaler.pkl'


def calculate_and_plot_shap_summary():
    # Load model and data
    model = joblib.load(MODEL_FILE_PATH)
    scaler = joblib.load(SCALER_FILE_PATH)
    df = pd.read_excel(DATA_FILE_PATH, engine='openpyxl')

    # Prepare data
    features = ['Eng Displ', '# Cyl', 'City FE (Guide) - Conventional Fuel', 'Hwy FE (Guide) - Conventional Fuel', 'Comb CO2 Rounded Adjusted (as shown on FE Label)']
    X = df[features].dropna()
    X_scaled = scaler.transform(X)

    # Create SHAP explainer and compute SHAP values
    explainer = shap.Explainer(model, X_scaled)
    shap_values = explainer(X_scaled)

    # Plot and save SHAP summary plot
    plt.figure()
    shap.summary_plot(shap_values.values, X, feature_names=features, show=False)
    plt.savefig('backend/visualizations/shap_summary_plot.png')  # Save the summary plot

    return shap_values  # Optionally return SHAP values if needed

# Example Usage
if __name__ == '__main__':
    calculate_and_plot_shap_summary()
