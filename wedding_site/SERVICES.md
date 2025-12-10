# Managing Services

This guide shows you how to check and manage the wedding site services.

## Quick Commands

### Check Running Services
```bash
./check-services.sh
# or
npm run check
```

### Start Both Services
```bash
./start-all.sh
# or
npm run start:all
```

### Stop All Services
```bash
./stop-all.sh
# or
npm run stop:all
```

## Manual Management

### Check What's Running

**Method 1: Use the check script**
```bash
./check-services.sh
```

**Method 2: Check processes directly**
```bash
# See all node/npm processes
ps aux | grep -E "node|npm|vite" | grep -v grep

# Check specific ports
ss -tlnp | grep -E ":(3000|3001)"
# or
lsof -i :3000 -i :3001
```

**Method 3: Check by process name**
```bash
# Backend server
pgrep -f "node.*server.js"

# Frontend server
pgrep -f "vite"
```

### Start Services Manually

**Start Backend (Terminal 1):**
```bash
cd server
ADMIN_PASSWORD=yourpassword npm start
```

**Start Frontend (Terminal 2):**
```bash
npm run dev
```

### Stop Services Manually

**Stop Backend:**
```bash
pkill -f "node.*server.js"
# or force kill
pkill -9 -f "node.*server.js"
```

**Stop Frontend:**
```bash
pkill -f "vite"
# or force kill
pkill -9 -f "vite"
```

**Stop Everything:**
```bash
pkill -f "node.*server.js"
pkill -f "vite"
```

## Using npm Scripts

All these commands work from the root `wedding_site` directory:

```bash
# Check service status
npm run check

# Start backend only
npm run server

# Start backend with auto-reload (development)
npm run server:dev

# Start frontend only
npm run dev

# Start both (uses start-all.sh script)
npm run start:all

# Stop all services
npm run stop:all
```

## Service URLs

When both services are running:

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **CMS API**: http://localhost:3001/api/content

## Troubleshooting

### Port Already in Use

If you get "address already in use" errors:

```bash
# Find what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process using the port
kill -9 <PID>
```

### Services Won't Start

1. Check if they're already running:
   ```bash
   ./check-services.sh
   ```

2. Check the logs:
   ```bash
   # Backend logs
   tail -f logs/backend.log
   
   # Frontend logs
   tail -f logs/frontend.log
   ```

3. Make sure dependencies are installed:
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

## Running in Background

The `start-all.sh` script runs services in the background. To see their output:

```bash
# View backend logs
tail -f logs/backend.log

# View frontend logs
tail -f logs/frontend.log
```

## Production Mode

For production, you'll want to:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start only the backend (it will serve the built frontend):
   ```bash
   cd server
   npm start
   ```

The backend will automatically serve the built React app from the `dist` directory.

