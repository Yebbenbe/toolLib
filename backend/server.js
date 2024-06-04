const express = require('express');
const path = require('path');
const db = require('./db/db');
const app = express();
const PORT = 3001;

const cors = require('cors');

// Use CORS
app.use(cors());

app.use(express.json());

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

// Get all tools
app.get('/api/tools', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Tools');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
