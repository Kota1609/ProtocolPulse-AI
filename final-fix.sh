#!/bin/bash

# Kill any existing processes
echo "🔄 Shutting down any existing processes..."
pkill -f "uvicorn" || true
pkill -f "npm run" || true
sleep 1

# Clean up environment
echo "🧹 Cleaning up environment..."
source .venv/bin/activate
pip install -r requirements.txt

# Start backend server
echo "🚀 Starting backend server..."
uvicorn application:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Start frontend
echo "🚀 Starting frontend..."
cd ui && npm run dev -- --port 5175 &
FRONTEND_PID=$!

echo -e "\n✅ Application started successfully!"
echo "🌐 Backend: http://localhost:8000"
echo "🌐 Frontend: http://localhost:5175"
echo -e "\n📝 How to use the application:"
echo "1. Open http://localhost:5175 in your browser"
echo "2. Enter Uniswap as the protocol name"
echo "3. Click 'Analyze Protocol'"
echo -e "\n⚠️  Press Ctrl+C to stop both servers"

wait 