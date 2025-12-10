#!/bin/bash

# Script to stop all wedding site services

echo "Stopping wedding site services..."

# Stop backend
if pgrep -f "node.*server.js" > /dev/null; then
    echo "Stopping backend server..."
    pkill -f "node.*server.js"
    sleep 1
    if pgrep -f "node.*server.js" > /dev/null; then
        echo "  Force killing backend..."
        pkill -9 -f "node.*server.js"
    fi
    echo "  ✓ Backend stopped"
else
    echo "  Backend was not running"
fi

# Stop frontend
if pgrep -f "vite" > /dev/null; then
    echo "Stopping frontend server..."
    pkill -f "vite"
    sleep 1
    if pgrep -f "vite" > /dev/null; then
        echo "  Force killing frontend..."
        pkill -9 -f "vite"
    fi
    echo "  ✓ Frontend stopped"
else
    echo "  Frontend was not running"
fi

echo ""
echo "All services stopped."

