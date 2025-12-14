import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'wedding-cms-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Bernchris'; // Change this!

const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const DIST_DIR = path.join(__dirname, '../dist');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
await fs.mkdir(UPLOADS_DIR, { recursive: true });
await fs.mkdir(path.join(UPLOADS_DIR, 'images'), { recursive: true });
await fs.mkdir(path.join(UPLOADS_DIR, 'videos'), { recursive: true });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(UPLOADS_DIR, 'videos'));
    } else {
      cb(null, path.join(UPLOADS_DIR, 'images'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || 
                     file.mimetype.startsWith('image/') || 
                     file.mimetype.startsWith('video/');
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'));
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static(UPLOADS_DIR));

// Only serve static files if dist directory exists (production mode)
try {
  await fs.access(DIST_DIR);
  app.use(express.static(DIST_DIR));
  console.log('Serving built React app from dist directory');
} catch {
  console.log('Running in development mode - API only (frontend served by Vite)');
}

// Ensure data directory exists
await fs.mkdir(DATA_DIR, { recursive: true });

// Initialize content file if it doesn't exist
async function initializeContent() {
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    const defaultContent = {
      home: {
        coupleName: "Phillip & Nakia",
        weddingTitle: "Wedding",
        date: "Aug 17, 2026, 3:00 p.m.",
        location: "Lethbridge",
        heroImage: "",
        heroVideo: ""
      },
      ourStory: {
        storyText1: "We met in the most unexpected way, and from that moment on, we knew our lives would never be the same. Through laughter, adventures, and countless memories, our love has grown stronger each day.",
        storyText2: "Now, we're excited to celebrate this next chapter together with all of you, our family and friends, as we say \"I do\" and begin our journey as husband and wife.",
        image1: "",
        image2: ""
      },
      theWedding: {
        eventDetails: "No events at the moment",
        gettingThere: "Venue details and directions will be provided closer to the date. We can't wait to celebrate with you!",
        accommodation: "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click 'Edit Text' or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I'm a great place for you to tell a story."
      },
      weddingParty: {
        bridesmaids: [
          { name: "Maid of Honor", label: "Maid of Honor", image: "" },
          { name: "Bridesmaid", label: "Bridesmaid", image: "" },
          { name: "Bridesmaid", label: "Bridesmaid", image: "" }
        ],
        groomsmen: [
          { name: "Groomsman", label: "", image: "" },
          { name: "Groomsman", label: "", image: "" },
          { name: "Groomsman", label: "", image: "" }
        ]
      },
      weddingRegistry: {
        registryUrl: "https://www.myregistry.com/wedding-registry/nakia-francis-and-phillip-tritz-lethbridge-ab/4809068",
        password: "nakia&phillip4life"
      }
    };
    await fs.writeFile(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
  }
}

await initializeContent();

// Helper function to read content
async function readContent() {
  const data = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper function to write content
async function writeContent(content) {
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes

// Login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get all content (public)
app.get('/api/content', async (req, res) => {
  try {
    const content = await readContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// Get specific section (public)
app.get('/api/content/:section', async (req, res) => {
  try {
    const content = await readContent();
    const section = req.params.section;
    if (content[section]) {
      res.json(content[section]);
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// Update content (protected)
app.put('/api/content/:section', authenticateToken, async (req, res) => {
  try {
    const content = await readContent();
    const section = req.params.section;
    
    if (!content[section]) {
      return res.status(404).json({ error: 'Section not found' });
    }
    
    content[section] = { ...content[section], ...req.body };
    await writeContent(content);
    res.json({ success: true, data: content[section] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Update entire content (protected)
app.put('/api/content', authenticateToken, async (req, res) => {
  try {
    await writeContent(req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Upload file (protected)
app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = `/uploads/${req.file.mimetype.startsWith('video/') ? 'videos' : 'images'}/${req.file.filename}`;
    res.json({ 
      success: true, 
      filePath: filePath,
      filename: req.file.filename,
      originalName: req.file.originalname
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Delete file (protected)
app.delete('/api/upload/:filename', authenticateToken, async (req, res) => {
  try {
    const filename = req.params.filename;
    // Security: prevent path traversal
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    
    // Try to delete from both images and videos directories
    const imagePath = path.join(UPLOADS_DIR, 'images', filename);
    const videoPath = path.join(UPLOADS_DIR, 'videos', filename);
    
    try {
      await fs.unlink(imagePath);
      res.json({ success: true, message: 'File deleted' });
    } catch {
      try {
        await fs.unlink(videoPath);
        res.json({ success: true, message: 'File deleted' });
      } catch {
        res.status(404).json({ error: 'File not found' });
      }
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Serve React app for all other routes (only if dist exists)
app.get('*', async (req, res) => {
  try {
    await fs.access(DIST_DIR);
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  } catch {
    // In development, return API info instead
    res.status(404).json({ 
      error: 'Not found',
      message: 'This is the CMS API server. In development, the frontend is served by Vite on port 3000.',
      api: {
        content: 'GET /api/content',
        login: 'POST /api/login',
        update: 'PUT /api/content/:section (requires auth)'
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`CMS Server running on http://localhost:${PORT}`);
  console.log(`Admin password: ${ADMIN_PASSWORD}`);
  console.log(`Change ADMIN_PASSWORD environment variable to set a custom password`);
});

