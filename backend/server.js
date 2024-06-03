// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');

// Use CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add this inside your server.js, after setting up the middleware

// Sample data array
const tools = [
    { id: 1, name: 'Hammer', description: 'Useful for driving nails into wood.', image: 'path/to/hammer.jpg' },
    { id: 2, name: 'Screwdriver', description: 'Ideal for turning screws.', image: 'path/to/screwdriver.jpg' },
    { id: 3, name: 'Wrench', description: 'Perfect for gripping and turning nuts and bolts.', image: 'path/to/wrench.jpg' }
  ];
  
  // Route to fetch tools
  app.get('/api/tools', (req, res) => {
    res.status(200).json(tools);
  });
  
