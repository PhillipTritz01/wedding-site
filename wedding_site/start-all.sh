#!/bin/bash

# Script to start both frontend and backend servers

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Set admin password (change this to your desired password)
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin123}"

echo "=========================================="
echo "  Starting Wedding Site Services"
echo "=========================================="
echo ""

# Check if services are already running
if pgrep -f "node.*server.js" > /dev/null; then
    echo -e "${YELLOW}⚠ Backend server is already running${NC}"
    read -p "Kill existing backend and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        pkill -f "node.*server.js"
        sleep 1
    else
        echo "Keeping existing backend server"
        BACKEND_RUNNING=true
    fi
fi

if pgrep -f "vite" > /dev/null; then
    echo -e "${YELLOW}⚠ Frontend server is already running${NC}"
    read -p "Kill existing frontend and restart? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        pkill -f "vite"
        sleep 1
    else
        echo "Keeping existing frontend server"
        FRONTEND_RUNNING=true
    fi
fi

# Start backend server
if [ -z "$BACKEND_RUNNING" ]; then
    echo -e "${GREEN}Starting backend server (CMS API)...${NC}"
    cd server
    ADMIN_PASSWORD="$ADMIN_PASSWORD" npm start > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo "  Backend PID: $BACKEND_PID"
    echo "  Logs: logs/backend.log"
    sleep 2
fi

# Start frontend server
if [ -z "$FRONTEND_RUNNING" ]; then
    echo -e "${GREEN}Starting frontend server (Vite)...${NC}"
    npm run dev > logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "  Frontend PID: $FRONTEND_PID"
    echo "  Logs: logs/frontend.log"
    sleep 2
fi

# Create logs directory if it doesn't exist
mkdir -p logs

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Services started!${NC}"
echo "=========================================="
echo ""
echo "Access your site:"
echo "  Website: http://localhost:3000"
echo "  Admin:   http://localhost:3000/admin"
echo "  API:     http://localhost:3001/api/content"
echo ""
echo "Admin password: $ADMIN_PASSWORD"
echo ""
echo "To stop all services:"
echo "  ./stop-all.sh"
echo ""
echo "To check service status:"
echo "  ./check-services.sh"
echo ""

