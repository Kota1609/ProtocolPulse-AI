import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
import google.generativeai as genai
import requests
import asyncio

# Load environment variables
load_dotenv('backend/.env')

# Get API keys
openai_key = os.getenv("OPENAI_API_KEY")
gemini_key = os.getenv("GEMINI_API_KEY")
tavily_key = os.getenv("TAVILY_API_KEY")

print(f"OpenAI API Key: {'Set' if openai_key else 'Not set'}")
print(f"Gemini API Key: {'Set' if gemini_key else 'Not set'}")
print(f"Tavily API Key: {'Set' if tavily_key else 'Not set'}")

# Test OpenAI
async def test_openai():
    try:
        client = AsyncOpenAI(api_key=openai_key)
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Hello"}]
        )
        print("OpenAI API: Working")
    except Exception as e:
        print(f"OpenAI API Error: {e}")

# Test Gemini
def test_gemini():
    try:
        genai.configure(api_key=gemini_key)
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Hello")
        print("Gemini API: Working")
    except Exception as e:
        print(f"Gemini API Error: {e}")

# Test Tavily
def test_tavily():
    try:
        headers = {
            "Authorization": f"Bearer {tavily_key}",
            "Content-Type": "application/json"
        }
        response = requests.get(
            "https://api.tavily.com/health",
            headers=headers
        )
        if response.status_code == 200:
            print("Tavily API: Working")
        else:
            print(f"Tavily API Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Tavily API Error: {e}")

# Run tests
asyncio.run(test_openai())
test_gemini()
test_tavily() 