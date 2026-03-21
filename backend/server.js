const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'marcel',           // Dein Username aus der docker-compose
  host: 'db',               // WICHTIG: In Docker heißt der Host wie der Service-Name in der yaml (meist 'db')
  database: 'webshop-db',   // Der Name der Datenbank
  password: 'dein-passwort', // Dein Passwort aus der docker-compose
  port: 5432,               // Standard Postgres Port
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("DETAIL-FEHLER IM BACKEND:", err.message); // Das zeigt uns den echten Grund im Docker-Log
    res.status(500).json({ error: err.message }); // Schickt den echten Fehler ans Frontend
  }
});

// Diese Route fehlt aktuell!
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params; // Holt die ID aus der URL (z.B. "1")
  
  try {
    // Wir fragen die DB nach genau dieser ID
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // Falls die ID nicht existiert
      return res.status(404).json({ error: "Messer nicht gefunden" });
    }

    // Wir schicken nur das EINE gefundene Messer zurück
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Fehler beim Laden des Messers:", err.message);
    res.status(500).json({ error: "Datenbankfehler" });
  }
});

app.listen(3000, () => console.log('Backend läuft auf Port 3000'));