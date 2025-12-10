#!/bin/bash

# CMS Server Startup Script
# This script starts the CMS backend server with a custom password

# Set your admin password here (change this to your desired password)
ADMIN_PASSWORD="${ADMIN_PASSWORD:-wedding2024}"

# Change to server directory
cd "$(dirname "$0")"

echo "=========================================="
echo "  Wedding CMS Server"
echo "=========================================="
echo "Server URL: http://localhost:3001"
echo "Admin Password: $ADMIN_PASSWORD"
echo ""
echo "To access the admin panel:"
echo "  1. Make sure the frontend is running (npm run dev)"
echo "  2. Open: http://localhost:3000/admin"
echo "  3. Enter password: $ADMIN_PASSWORD"
echo ""
echo "To change the password, edit this script or run:"
echo "  ADMIN_PASSWORD=yourpassword npm start"
echo "=========================================="
echo ""

# Start the server with the password
ADMIN_PASSWORD="$ADMIN_PASSWORD" npm start

