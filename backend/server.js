// Load .env data into process.env
require('dotenv').config({ path: '../.env' });

const express = require('express');
const path = require('path');
const { pool } = require('./db/db'); // Importing pool from db.js
const app = express();
const PORT = 3005;
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cookieParser());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // not using https
}));

// Database Test Route
app.get('/test/db', (req, res) => {
  console.log('Executing query...');
  pool.query('SELECT * FROM "Users"', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
    console.log('Query result:', result.rows); // Log query result for further inspection
    res.status(200).json({ users: result.rows });
  });
});

// Route to get tools available to a user based on location
app.get('/tools', (req, res) => {
  const userId = req.query.userId; // Assume userId is passed as a query parameter

  const query = `
    SELECT "Tools".*, 
      (6371 * acos(cos(radians(Borrower."Latitude")) * cos(radians(Owner."Latitude")) * cos(radians(Owner."Longitude") - radians(Borrower."Longitude")) + sin(radians(Borrower."Latitude")) * sin(radians(Owner."Latitude")))) AS Distance 
    FROM "Tools" 
    JOIN "Users" AS Owner ON "Tools"."OwnerID" = Owner."UserID" 
    JOIN "Users" AS Borrower ON Borrower."UserID" = $1
    WHERE (6371 * acos(cos(radians(Borrower."Latitude")) * cos(radians(Owner."Latitude")) * cos(radians(Owner."Longitude") - radians(Borrower."Longitude")) + sin(radians(Borrower."Latitude")) * sin(radians(Owner."Latitude")))) <= Owner."LendingDiameter";
  `;

  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing available tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing available tools' });
    }
    res.status(200).json({ tools: result.rows });
  });
});

// Combined route to fetch user details and tools
app.get('/users/:userID/details', async (req, res) => {
  const userId = req.params.userID;

  try {
    // Fetch user details including Name and Lend Radius
    const userDetailsQuery = 'SELECT "Name", "LendingDiameter" FROM "Users" WHERE "UserID" = $1';
    const userResult = await pool.query(userDetailsQuery, [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch tools listed by the user
    const toolsQuery = 'SELECT * FROM "Tools" WHERE "OwnerID" = $1';
    const toolsResult = await pool.query(toolsQuery, [userId]);
    const tools = toolsResult.rows;

    res.status(200).json({ user, tools });
  } catch (err) {
    console.error('Error fetching user details and tools:', err);
    res.status(500).json({ error: 'An error occurred while fetching user details and tools' });
  }
});

// Route to get all tools for a given user (Tools I'm lending)
app.get('/:userId/tools', (req, res) => {
  const userId = req.params.userId;
  pool.query('SELECT * FROM "Tools" WHERE "OwnerID" = $1', [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing user tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing user tools' });
    }
    res.status(200).json({ tools: result.rows });
  });
});

// Route to get a specific tool and its associated requests
app.get('/tool/:toolId', async (req, res) => {
  const toolId = req.params.toolId;

  try {
    // Query to fetch tool details and requests
    const query = `
      SELECT "Tools".*, "Requests".*
      FROM "Tools"
      LEFT JOIN "Requests" ON "Tools"."ToolID" = "Requests"."ToolID"
      WHERE "Tools"."ToolID" = $1
    `;

    const { rows } = await pool.query(query, [toolId]);

    // Separate tool details and requests from the query result
    const toolDetails = {
      ToolID: rows[0].ToolID,
      // Include other fields from Tools table as needed
      // Example: Name, Description, OwnerID, etc.
    };

    // Filter requests associated with the tool
    const requests = rows
      .filter(row => row.RequestID !== null) // Assuming RequestID is non-null for requests
      .map(row => ({
        RequestID: row.RequestID,
        // Include other fields from Requests table as needed
        // Example: BorrowerID, Status, DateCreated, etc.
      }));

    res.status(200).json({ tool: toolDetails, requests });
  } catch (err) {
    console.error('Error fetching tool details and requests:', err);
    res.status(500).json({ error: 'An error occurred while fetching tool details and requests' });
  }
});

// Route to get all requests for a user (borrower or lender)
app.get('/requests/:userID', async (req, res) => {
  const userID = req.params.userID;

  try {
    const query = `
      SELECT * FROM "Requests" 
      WHERE "BorrowerID" = $1 OR "ToolID" IN (SELECT "ToolID" FROM "Tools" WHERE "OwnerID" = $1)
    `;
    const { rows } = await pool.query(query, [userID]);

    res.status(200).json({ requests: rows });
  } catch (err) {
    console.error('Error fetching user requests:', err);
    res.status(500).json({ error: 'An error occurred while fetching user requests' });
  }
});

// Route to register a new user
app.post('/api/register', async (req, res) => {
  const { name, address, email, phone, lendingDiameter, latitude, longitude, password } = req.body;
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
    const insertQuery = `
      INSERT INTO "Users" ("Name", "Address", "Email", "Phone", "LendingDiameter", "Latitude", "Longitude", "PasswordHash")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING "UserID";
    `;
    const { rows } = await pool.query(insertQuery, [name, address, email, phone, lendingDiameter, latitude, longitude, hashedPassword]);
    
    res.status(201).json({ userId: rows[0].UserID, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

// Route to log in a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM "Users" WHERE "Email" = $1', [email]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    
    // Set up session or token for logged-in user (e.g., using JWT)
    // Example: res.json({ userId: user.UserID, token: 'your_generated_token_here' });
    res.status(200).json({ userId: user.UserID, message: 'Login successful' });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// Route to log out a user
app.post('/api/logout', (req, res) => {
  // Clear session data
  // req.session.destroy((err) => { ... });
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
``
