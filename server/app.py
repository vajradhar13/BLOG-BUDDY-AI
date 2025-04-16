from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os 

app = Flask(__name__)
CORS(app, origins=["https://blog-buddy-ai.vercel.app"])

load_dotenv()

# Replace with your actual API key
GEMINI_API_KEY = os.getenv('gemini_api_key')

@app.route('/', methods=['POST'])
def generateBlog():
    try:
        # Parse the input data from the frontend
        input_data = request.json
        title = input_data.get("title", "")
        keywords = input_data.get("keywords", "")
        wordlimit = input_data.get("wordlimit", 250)

        # Validate the inputs
        if not title or not keywords or wordlimit <= 0:
            return jsonify({"error": "Invalid input fields"}), 400

        # Construct the prompt for the API using input fields
        prompt = (
            f'Generate a Comprehensive, Engaging Blog relevant to this title: {title} and these keywords: {keywords} without exceeding the following number of words: {wordlimit}'
        )

        # Define the payload for the Google API
        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ]
        }

        # Define the headers and API URL
        headers = {'Content-Type': 'application/json'}
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"

        # Make the API call
        response = requests.post(url, json=payload, headers=headers)
        response_data = response.json()

        # Return the response to the frontend
        return jsonify(response_data), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 400

app.run(host='0.0.0.0', port=5000)