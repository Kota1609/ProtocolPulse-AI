#!/bin/bash

echo "🔄 Shutting down any existing processes..."
pkill -f "uvicorn" || true
pkill -f "npm run" || true
sleep 1

echo "🧹 Cleaning up environment..."
source .venv/bin/activate
pip install setuptools wheel pkg_resources || pip install setuptools wheel

echo "📦 Installing required packages..."
pip install -r requirements.txt

echo "🚀 Starting backend server..."
uvicorn application:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Start frontend
echo "🚀 Starting frontend..."
cd ui && npm run dev -- --port 5175 &
FRONTEND_PID=$!

echo -e "\n✅ Application started successfully!"
echo "🌐 Backend: http://localhost:8000"
echo "🌐 Frontend: http://localhost:5175"
echo -e "\n📝 To analyze a DeFi protocol, open http://localhost:5175"
echo -e "\n⚠️  Press Ctrl+C to stop both servers"

wait 