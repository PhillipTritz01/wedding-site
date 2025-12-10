# Phillip & Nakia Wedding Website

A beautiful, modern wedding website built with React, Vite, and Tailwind CSS.

## Features

- **Home**: Hero section with couple names and wedding date
- **Our Story**: Personal story section with couple photos
- **The Wedding**: Event details, getting there, and accommodation information
- **Wedding Party**: Bridesmaids and groomsmen sections
- **Wedding Registry**: Links to registry stores
- **RSVP**: Functional RSVP form
- **Headless CMS**: Password-protected admin panel to edit all content without changing code

## Getting Started

### Running the Website

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

3. Start the CMS backend server (in one terminal):
```bash
cd server
npm start
# Or use the helper script:
# ./start-server.sh
```

4. Start the frontend development server (in another terminal):
```bash
npm run dev
```

The website will be available at `http://localhost:3000`
The CMS backend will run on `http://localhost:3001`

### Using the CMS Admin Panel

1. Navigate to `http://localhost:3000/admin` in your browser
2. Enter the admin password (default: `admin123` - **change this!**)
3. Edit any content section (Home, Our Story, The Wedding, Wedding Party, Registry)
4. Click "Save" to update the content

**To change the admin password**, set the `ADMIN_PASSWORD` environment variable:
```bash
ADMIN_PASSWORD=your-secure-password npm start
```

Or edit the `start-server.sh` script in the `server` directory.

## Customization

- **Via CMS**: Use the admin panel at `/admin` to edit all content without code changes
- **Via Code**: 
  - Replace placeholder images in the pages with your actual photos
  - Update the wedding date, location, and other details
  - Modify colors in `tailwind.config.js` if desired
  - Add your registry links in `WeddingRegistry.jsx`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

For more details about the CMS, see `CMS_README.md`.

