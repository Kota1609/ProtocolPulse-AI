import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment
api_key = os.getenv("GEMINI_API_KEY")
print(f"Using API Key: {api_key[:5]}..." if api_key else "No API key found in env")

# Configure Gemini
genai.configure(api_key=api_key)

try:
    # List available models
    print("Attempting to list available models...")
    models = genai.list_models()
    print("\nAvailable models:")
    for model in models:
        print(f"- {model.name}")
        print(f"  Supported generation methods: {', '.join(model.supported_generation_methods)}")
except Exception as e:
    print(f"Error listing models: {e}") 