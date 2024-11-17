import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import joblib


# Load the dataset
df = pd.read_csv('backend/data/all_toyota_data.csv')

# Select relevant features
features = df[['City FE (Guide) - Conventional Fuel', 
               'Hwy FE (Guide) - Conventional Fuel', 
               'Comb FE (Guide) - Conventional Fuel', 
               #'Comb CO2 Rounded Adjusted - Fuel2',
               'Annual Fuel1 Cost - Conventional Fuel']]

# Handle missing values
features = features.dropna()


# Handle missing values
features = features.dropna()

# Normalize the data
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Determine the optimal number of clusters (Elbow Method)
inertia = []
for k in range(1, 10):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(scaled_features)
    inertia.append(kmeans.inertia_)

# Plot the Elbow Method
plt.plot(range(1, 10), inertia, marker='o')
plt.xlabel('Number of Clusters')
plt.ylabel('Inertia')
plt.show()

# Train the K-Means model
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(scaled_features)

# Add cluster labels to the dataset
df['Cluster'] = clusters
