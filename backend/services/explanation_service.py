import os
from openai import OpenAI
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print(os.getenv("OPENAI_API_KEY"))

def explain_result(model_name, input_data, result):
    """
    Use GPT to generate a human-friendly explanation for the results.

    :param model_name: Name of the model (e.g., "Clustering Model").
    :param input_data: The input data provided by the user.
    :param result: The result from the model.
    :return: A human-friendly explanation string.
    """
    pre_information = """
    The clustering model is a K-Means algorithm trained on vehicle fuel economy data. 
    This model groups vehicles into clusters based on their fuel efficiency and associated costs. 
    The key features of the dataset include:

    - City FE (Fuel Economy): Fuel efficiency in city driving conditions.
    - Highway FE: Fuel efficiency on highways.
    - Combined FE: Overall fuel efficiency.
    - Annual Fuel Cost: Estimated yearly fuel expense based on driving habits.
    - CO2 Emissions: Adjusted CO2 output for the fuel type.

    The model pre-processes the data by:
    - Handling missing values by replacing them with column means.
    - Standardizing the data using a `StandardScaler` to normalize feature ranges.

    The model uses the "Elbow Method" to determine the optimal number of clusters and trains a K-Means model with 3 clusters.
    The clusters represent vehicle groups with similar fuel efficiency and cost profiles. 
    Outputs include:
    - Cluster Centroids: The average values of each feature in each cluster.
    - Cluster Sizes: The number of data points in each cluster.
    - Visualizations: PCA (Principal Component Analysis) plots showing 2D projections of clusters.

    Here's the breakdown of your result:
    """
    
    prompt = f"""
    {pre_information}
    Model: {model_name}
    Input Data: {input_data}
    Result: {result}

    Explain the following:
    1. What does the model do?
    2. How was the model trained and what methods were used?
    3. What do the input data and result represent?
    4. Provide actionable insights or interpretations based on the result.
    """

    try:
        # Call the OpenAI API
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are an expert data scientist who explains machine learning results to non-technical users."},
                {"role": "user", "content": prompt},
            ],
            model="gpt-4",  # Use GPT-4 for better explanations
        )

        # Extract and return the explanation
        explanation = response.choices[0].message.content
        return explanation.strip()
    except Exception as e:
        print(f"OpenAI API error: {e}")
        return "An error occurred while generating the explanation. Please try again later."