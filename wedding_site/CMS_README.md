# Headless CMS Setup

This wedding website now includes a headless CMS that allows you to edit all content without changing code.

## Features

- **Password-protected admin interface** at `/admin`
- **Edit all content** including:
  - Home page (couple names, date, location, hero image)
  - Our Story (text and images)
  - The Wedding (event details, getting there, accommodation)
  - Wedding Party (bridesmaids and groomsmen with photos)
  - Wedding Registry (URL and password)

## Setup

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Set Admin Password

The default admin password is `admin123`. To change it, set the `ADMIN_PASSWORD` environment variable:

```bash
export ADMIN_PASSWORD=your-secure-password
```

Or create a `.env` file in the `server` directory:

```
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-key
PORT=3001
```

### 3. Start the Backend Server

```bash
cd server
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend will run on `http://localhost:3001` by default.

### 4. Configure Frontend

The frontend needs to know where the API is. Set the `VITE_API_URL` environment variable:

```bash
export VITE_API_URL=http://localhost:3001/api
```

Or create a `.env` file in the root `wedding_site` directory:

```
VITE_API_URL=http://localhost:3001/api
```

### 5. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

## Using the CMS

1. Navigate to `http://localhost:3000/admin` (or your frontend URL + `/admin`)
2. Enter your admin password
3. Select a section from the sidebar
4. Edit the content
5. Click "Save" to update

Changes are saved immediately and will be reflected on the website.

## Data Storage

Content is stored in `server/data/content.json`. This file is automatically created with default content when the server first starts.

## Security Notes

- **Change the default password** before deploying to production
- The admin password is separate from the wedding site access code
- JWT tokens expire after 24 hours
- Content is stored in JSON files (consider using a database for production)

## Running Both Servers

You can run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd server
npm start
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Or use a process manager like `pm2` or `foreman` to run both together.

