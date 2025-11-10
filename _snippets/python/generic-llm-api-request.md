---
title: 'Generic LLM API Request with Requests'
language: 'Python'
description: 'A template function to send a prompt to a generic Large Language Model (LLM) endpoint and parse the JSON response.'
category: 'python'
slug: 'generic-llm-api-request'
---

Interacting with cloud-based AI services requires sending an HTTP POST request, usually containing a JSON payload with the user's prompt and configuration parameters (like temperature).

```python
import requests
import json

API_URL = "https://api.example.com/v1/generate"
API_KEY = "YOUR_SECRET_KEY" # Replace with your actual key

def generate_llm_response(prompt_text):
    """Sends a prompt to a generic LLM API and returns the text response."""
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "text-davinci-003", # Replace with the model name you are using
        "prompt": prompt_text,
        "temperature": 0.7,
        "max_tokens": 150,
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        response.raise_for_status() # Raises an exception for HTTP errors (4xx or 5xx)
        
        # Assuming the response JSON structure is:
        # {"choices": [{"text": "The generated response..."}]}
        data = response.json()
        return data['choices'][0]['text'].strip()

    except requests.exceptions.RequestException as e:
        print(f"API Request Failed: {e}")
        return None

# --- How to use it: ---
# # 1. Replace API_URL and API_KEY with your service credentials (OpenAI, Google, etc.).
# # 2. Define your prompt.
# prompt = "Explain the concept of quantum entanglement in simple terms."
#
# # 3. Call the function.
# response_text = generate_llm_response(prompt)
#
# if response_text:
#     print("AI Response:", response_text)