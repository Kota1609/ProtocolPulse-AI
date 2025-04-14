import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key from env: {api_key[:5]}..." if api_key else "No API key found in env")

# Try with hardcoded API key
hardcoded_key = "AIzaSyCnRPZsQ9M-qi8Ur9CNqbsvweZypCzsttA"
print(f"Hardcoded key: {hardcoded_key[:5]}...")

try:
    # Configure with hardcoded key
    genai.configure(api_key=hardcoded_key)
    
    # Try to use the model
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Hello, how are you?")
    
    print("Success! Response:")
    print(response.text)
except Exception as e:
    print(f"Error: {e}") 