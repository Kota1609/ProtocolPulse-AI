#!/bin/bash
# build.sh - Script to build the frontend and prepare for combined deployment

set -e  # Exit on error

echo "===== Installing backend dependencies ====="
pip install -r requirements.txt

echo "===== Installing frontend dependencies ====="
cd ui
npm install

echo "===== Building frontend ====="
npm run build
cd ..

echo "===== Build completed successfully! ====="
echo "You can now run the application with: python application.py"

echo "Starting build process for ProtocolPulse AI..."

# Create a production .env file that works with combined deployment
echo "Creating production .env file..."
cat > .env.production << EOL
# Production environment variables for combined deployment
VITE_API_URL=
VITE_WS_URL=
EOL

echo "Build completed successfully!"
echo "You can now deploy the entire application to Render."
echo ""
echo "To deploy to Render:"
echo "1. Push this repository to GitHub"
echo "2. Create a new Web Service on Render"
echo "3. Use the following settings:"
echo "   - Build Command: bash build.sh"
echo "   - Start Command: python application.py"
echo ""
echo "Make sure to set the following environment variables on Render:"
echo "   - OPENAI_API_KEY"
echo "   - GOOGLE_API_KEY (if using Gemini)"
echo "   - TAVILY_API_KEY (for research)"
echo "   - PORT=10000 (or any port provided by Render)" 