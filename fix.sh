#!/bin/bash

# Kill any existing processes
pkill -f "uvicorn" || true
pkill -f "npm run" || true

# Ensure virtual environment is activated
source .venv/bin/activate

# Install critical missing packages
pip install setuptools
pip install -r requirements.txt

# Start the backend server
echo "Starting backend server..."
uvicorn application:app --port 8000 &
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

# Keep script running
wait 