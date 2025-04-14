#!/bin/bash

# Kill any existing processes
pkill -f "uvicorn application:app" || true
pkill -f "npm run dev" || true

# Activate virtual environment
source .venv/bin/activate

# Install required packages
pip install py-etherscan-api web3 fastapi uvicorn
pip install -r requirements.txt

# Start the backend server
echo "Starting backend server..."
uvicorn application:app --reload --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start the frontend
echo "Starting frontend..."
cd ui && npm run dev -- --port 5175 &
FRONTEND_PID=$!

echo "Application is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5175"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
wait $BACKEND_PID

# Clean up processes when the script is terminated
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null 