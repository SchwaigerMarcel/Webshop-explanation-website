const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const JWT_SECRET = 'dein_super_geheimes_passwort_123';

// --- 1. DATENBANK & LIMITS ---
app.use(express.json({ limit: '2000mb' }));
app.use(express.urlencoded({ limit: '2000mb', extended: true }));

const pool = new Pool({
  user: 'marcel',
  host: 'db', 
  database: 'messerschmiede_db',
  password: 'e`RqjC6W1(k1',
  port: 5432,
});

// --- 2. MIDDLEWARE (CORS) ---
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://messerschmiede-schwaiger.at', 
    'https://www.messerschmiede-schwaiger.at', 
    'http://localhost:5173'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Static Files
const imagesPath = path.join(__dirname, 'images');
const galleryPath = path.join(imagesPath, 'gallery');
const galleryTrashPath = path.join(galleryPath, 'trash');

if (!fs.existsSync(galleryPath)) fs.mkdirSync(galleryPath, { recursive: true });
if (!fs.existsSync(galleryTrashPath)) fs.mkdirSync(galleryTrashPath, { recursive: true });

app.use('/images', express.static(imagesPath));
app.use('/api/images', express.static(imagesPath));

// --- 3. MULTER KONFIGURATION ---

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`);
  }
});

// Wir erlauben hier Multi-Upload, aber nutzen im Frontend Einzel-Upload für Stabilität
const uploadGallery = multer({ storage: galleryStorage }).array('galleryFiles', 50);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let folderName = req.body.image;
    if (!folderName && req.params.id) {
        try {
            const result = await pool.query('SELECT image FROM products WHERE id = $1', [req.params.id]);
            folderName = result.rows[0]?.image;
        } catch (e) { console.error(e); }
    }
    const uploadPath = path.join(imagesPath, folderName || 'default');
    const finalPath = (file.fieldname === 'mainImage') ? path.join(uploadPath, 'main') : uploadPath;
    
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(finalPath, { recursive: true, mode: 0o775 });
    }
    cb(null, finalPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = file.originalname.toLowerCase().replace(/\s+/g, '-');
    if (file.fieldname === 'mainImage') {
        cb(null, `main-${Date.now()}${ext}`);
    } else {
        cb(null, `${Date.now()}-${cleanName}`);
    }
  }
});

const uploadFields = multer({ storage }).fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'gallery', maxCount: 20 }
]);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Nicht angemeldet" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Sitzung abgelaufen" });
    req.user = user;
    next();
  });
};

// --- HILFSFUNKTIONEN GALERIE (Stabiler gemacht) ---
const getSortedGalleryFiles = () => {
  return fs.readdirSync(galleryPath)
    .filter(file => fs.lstatSync(path.join(galleryPath, file)).isFile() && /\.(jpg|jpeg|png|webp|mp4|mov)$/i.test(file))
    .sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (isNaN(numA) || isNaN(numB)) return a.localeCompare(b);
      return numA - numB;
    });
};

const reindexGallery = () => {
  const files = getSortedGalleryFiles();
  if (files.length === 0) return;

  // 1. Erstelle eine Liste der Umbenennungen
  const operations = files.map((file, i) => {
    const ext = path.extname(file);
    return {
      old: path.join(galleryPath, file),
      temp: path.join(galleryPath, `temp_${Date.now()}_${i}${ext}`),
      final: path.join(galleryPath, `${i + 1}${ext}`)
    };
  });

  try {
    // 2. Alle ZUERST auf Temp (verhindert, dass 1.jpg mit neuem 1.jpg kollidiert)
    operations.forEach(op => {
      if (fs.existsSync(op.old)) fs.renameSync(op.old, op.temp);
    });

    // 3. Dann alle auf Final
    operations.forEach(op => {
      if (fs.existsSync(op.temp)) fs.renameSync(op.temp, op.final);
    });
  } catch (err) {
    console.error("Fehler beim Reindizieren:", err);
  }
};

// --- ROUTES ---

app.get('/api/gallery', (req, res) => {
  try {
    const files = getSortedGalleryFiles();
    res.json(files);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/gallery/upload', authenticateToken, uploadGallery, (req, res) => {
  try {
    reindexGallery(); 
    res.json({ message: "Upload und Reihung erfolgreich" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/gallery/reorder', authenticateToken, (req, res) => {
  try {
    const { oldIndex, newIndex } = req.body; 
    let files = getSortedGalleryFiles();
    const [movedFile] = files.splice(oldIndex, 1);
    files.splice(newIndex, 0, movedFile);
    
    files.forEach((file, i) => {
      const ext = path.extname(file);
      fs.renameSync(path.join(galleryPath, file), path.join(galleryPath, `temp_${i}${ext}`));
    });
    const tempFiles = fs.readdirSync(galleryPath).filter(f => f.startsWith('temp_'));
    tempFiles.sort((a,b) => parseInt(a.split('_')[1]) - parseInt(b.split('_')[1])).forEach((file, i) => {
      const ext = path.extname(file);
      fs.renameSync(path.join(galleryPath, file), path.join(galleryPath, `${i + 1}${ext}`));
    });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/gallery/:filename', authenticateToken, (req, res) => {
  try {
    const fileName = req.params.filename;
    const oldPath = path.join(galleryPath, fileName);
    const newPath = path.join(galleryTrashPath, `${Date.now()}-${fileName}`);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      reindexGallery();
      res.json({ message: "In Papierkorb verschoben" });
    } else {
      res.status(404).json({ error: "Datei nicht gefunden" });
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PRODUKT ROUTES ---

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'marcel' && password === 'schmiede2024') {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: "Zugriff verweigert" });
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE deleted = false ORDER BY id ASC');
    const productsWithImages = result.rows.map(product => {
        const folder = product.image || 'default';
        const pPath = path.join(imagesPath, folder);
        let mainImage = null;
        const mainPath = path.join(pPath, 'main');
        if (fs.existsSync(mainPath)) {
            const files = fs.readdirSync(mainPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
            if (files.length > 0) mainImage = `${folder}/main/${files[0]}`;
        }
        return { ...product, mainImage };
    });
    res.json(productsWithImages);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Produkt nicht gefunden" });
        const product = result.rows[0];
        const folder = product.image || 'default';
        const pPath = path.join(imagesPath, folder);
        const mainPath = path.join(pPath, 'main');
        let allImages = [];
        if (fs.existsSync(mainPath)) {
            const mainFiles = fs.readdirSync(mainPath).filter(f => /\.(jpg|jpeg|png|webp|jfif)$/i.test(f)).map(f => `main/${f}`); 
            allImages = [...mainFiles];
        }
        if (fs.existsSync(pPath)) {
            const galleryFiles = fs.readdirSync(pPath).filter(f => fs.lstatSync(path.join(pPath, f)).isFile() && /\.(jpg|jpeg|png|webp|jfif)$/i.test(f));
            allImages = [...allImages, ...galleryFiles];
        }
        res.json({ ...product, images: allImages });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/products/:id/images', async (req, res) => {
    try {
        const result = await pool.query('SELECT image FROM products WHERE id = $1', [req.params.id]);
        const folder = result.rows[0]?.image;
        if (!folder) return res.json([]);
        const pPath = path.join(imagesPath, folder);
        if (!fs.existsSync(pPath)) return res.json([]);
        const files = fs.readdirSync(pPath).filter(f => fs.lstatSync(path.join(pPath, f)).isFile() && /\.(jpg|jpeg|png|webp)$/i.test(f));
        res.json(files);
    } catch (err) { res.status(500).json(err); }
});

app.put('/api/products/:id/main-image', authenticateToken, async (req, res) => {
    try {
        const { filename } = req.body; 
        const result = await pool.query('SELECT image FROM products WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Produkt nicht gefunden" });
        const folder = result.rows[0].image;
        const productDir = path.join(imagesPath, folder);
        const mainDir = path.join(productDir, 'main');
        if (!fs.existsSync(mainDir)) fs.mkdirSync(mainDir, { recursive: true, mode: 0o775 });
        const currentMainFiles = fs.readdirSync(mainDir).filter(f => /\.(jpg|jpeg|png|webp|jfif)$/i.test(f));
        currentMainFiles.forEach(oldMainFile => {
            const oldMainPath = path.join(mainDir, oldMainFile);
            const moveBackPath = path.join(productDir, oldMainFile);
            if (fs.existsSync(oldMainPath)) {
                let finalDest = moveBackPath;
                if (fs.existsSync(moveBackPath)) finalDest = path.join(productDir, `old_${Date.now()}_${oldMainFile}`);
                fs.renameSync(oldMainPath, finalDest);
            }
        });
        const sourceFile = path.join(productDir, filename);
        const destFile = path.join(mainDir, filename);
        if (fs.existsSync(sourceFile)) {
            fs.renameSync(sourceFile, destFile);
            res.json({ success: true, message: "Ringtausch erfolgreich" });
        } else {
            res.status(404).json({ error: "Quelldatei nicht gefunden." });
        }
    } catch (err) { res.status(500).json({ error: "Serverfehler" }); }
});

app.post('/api/products/:id/upload', authenticateToken, uploadFields, (req, res) => {
    res.json({ message: "Upload ok" });
});

app.delete('/api/products/:id/images/:filename', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT image FROM products WHERE id = $1', [req.params.id]);
        const filePath = path.join(imagesPath, result.rows[0].image, req.params.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.json({ message: "Gelöscht" });
    } catch (err) { res.status(500).json(err); }
});

app.post('/api/products', authenticateToken, uploadFields, async (req, res) => {
  try {
    const { name, category, price, description, long_description, image, features, specifications } = req.body;
    const fArray = typeof features === 'string' ? JSON.parse(features) : features;
    const sJson = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
    const result = await pool.query(
        `INSERT INTO products (name, category, price, description, long_description, image, features, specifications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, category, parseFloat(price), description, long_description, image, fArray, JSON.stringify(sJson)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/products/:id', authenticateToken, uploadFields, async (req, res) => {
  try {
    const { name, category, price, description, long_description, image, features, specifications } = req.body;
    const fArray = typeof features === 'string' ? JSON.parse(features) : features;
    const sJson = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
    await pool.query(
        `UPDATE products SET name=$1, category=$2, price=$3, description=$4, long_description=$5, image=$6, features=$7, specifications=$8 WHERE id=$9`,
        [name, category, price, description, long_description, image, fArray, JSON.stringify(sJson), req.params.id]
    );
    res.json({ message: "Update ok" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/trash', authenticateToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM products WHERE deleted = true');
    res.json(result.rows);
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
    await pool.query('UPDATE products SET deleted = true WHERE id = $1', [req.params.id]);
    res.json({ message: "Papierkorb" });
});

app.post('/api/products/:id/restore', authenticateToken, async (req, res) => {
    await pool.query('UPDATE products SET deleted = false WHERE id = $1', [req.params.id]);
    res.json({ message: "Wiederhergestellt" });
});

app.delete('/api/products/:id/hard', authenticateToken, async (req, res) => {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ message: "Endgültig gelöscht" });
});

app.post('/api/gallery/restore/:filename', authenticateToken, (req, res) => {
  try {
    const fileName = req.params.filename;
    const trashPath = path.join(galleryTrashPath, fileName);
    const originalName = fileName.split('-').slice(1).join('-');
    const targetPath = path.join(galleryPath, originalName);
    if (fs.existsSync(trashPath)) {
      fs.renameSync(trashPath, targetPath);
      reindexGallery();
      res.json({ message: "Wiederhergestellt" });
    } else { res.status(404).json({ error: "Nicht gefunden" }); }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/gallery/trash', authenticateToken, (req, res) => {
  try {
    const files = fs.readdirSync(galleryTrashPath).filter(file => fs.lstatSync(path.join(galleryTrashPath, file)).isFile());
    res.json(files);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SERVER START MIT TIMEOUT FIX ---
const server = app.listen(3000, '0.0.0.0', () => console.log('Backend aktiv auf Port 3000'));
server.timeout = 900000; // 15 Min Zeit für 700MB Uploads