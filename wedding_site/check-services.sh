#!/bin/bash

# Script to check running npm/node services

echo "=========================================="
echo "  Running Node.js Services"
echo "=========================================="
echo ""

# Check for backend server
BACKEND_PID=$(pgrep -f "node.*server.js" | head -1)
if [ -n "$BACKEND_PID" ]; then
    BACKEND_PORT=$(ss -tlnp 2>/dev/null | grep "$BACKEND_PID" | grep -oP ':\K[0-9]+' | head -1)
    echo "✓ Backend Server (CMS API)"
    echo "  PID: $BACKEND_PID"
    echo "  Port: ${BACKEND_PORT:-3001}"
    echo "  URL: http://localhost:${BACKEND_PORT:-3001}"
    echo ""
else
    echo "✗ Backend Server (CMS API) - NOT RUNNING"
    echo ""
fi

# Check for frontend server
FRONTEND_PID=$(pgrep -f "vite" | head -1)
if [ -n "$FRONTEND_PID" ]; then
    FRONTEND_PORT=$(ss -tlnp 2>/dev/null | grep "$FRONTEND_PID" | grep -oP ':\K[0-9]+' | head -1)
    echo "✓ Frontend Server (Vite)"
    echo "  PID: $FRONTEND_PID"
    echo "  Port: ${FRONTEND_PORT:-3000}"
    echo "  URL: http://localhost:${FRONTEND_PORT:-3000}"
    echo ""
else
    echo "✗ Frontend Server (Vite) - NOT RUNNING"
    echo ""
fi

# Summary
if [ -n "$BACKEND_PID" ] && [ -n "$FRONTEND_PID" ]; then
    echo "=========================================="
    echo "  ✓ Both services are running!"
    echo "=========================================="
    echo ""
    echo "Access your site:"
    echo "  Website: http://localhost:${FRONTEND_PORT:-3000}"
    echo "  Admin:   http://localhost:${FRONTEND_PORT:-3000}/admin"
    echo "  API:     http://localhost:${BACKEND_PORT:-3001}/api/content"
elif [ -n "$BACKEND_PID" ]; then
    echo "=========================================="
    echo "  ⚠ Only backend is running"
    echo "=========================================="
elif [ -n "$FRONTEND_PID" ]; then
    echo "=========================================="
    echo "  ⚠ Only frontend is running"
    echo "=========================================="
else
    echo "=========================================="
    echo "  ✗ No services running"
    echo "=========================================="
fi

echo ""

