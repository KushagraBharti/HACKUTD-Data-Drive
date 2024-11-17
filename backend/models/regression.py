from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import pandas as pd

# Load data into DataFrame
df = pd.read_excel('backend/data/all_toyota_data.xlsx')

# Select features and target
X = df[['Eng Displ', '# Cyl', 'City FE (Guide) - Conventional Fuel', 
        'Hwy FE (Guide) - Conventional Fuel', 'Comb CO2 Rounded Adjusted']]
y = df['Comb FE (Guide) - Conventional Fuel']

# Handle missing values
X = X.dropna()
y = y[X.index]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print(f"MAE: {mean_absolute_error(y_test, y_pred)}")
print(f"R2 Score: {r2_score(y_test, y_pred)}")
