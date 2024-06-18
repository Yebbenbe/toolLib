// load .env data into process.env from main folder
require('dotenv').config({ path: '../.env' });

const express = require('express');
const path = require('path');
const { pool } = require('./db/db'); // Importing pool from db.js
const app = express();
const PORT = 3005;
const cors = require('cors');
// session and auth stuff
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// const toolsRouter = require('./routes/tools');  unused

// Middleware
// app.use('/api', toolsRouter);  unused
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


/* ROUTES
/home - my user page. Should show my requests + status, and any requests submitted to me, plus button to accept
/tools- component showing available tools to borrow
/tools/:toolID - component for single tool and it's history
/user/:userID - component for a specific user, includes any tools they've listed
/requests/:userID - a user's requests (borrower AND lender)
/request/:requestID - a specific request
/help generic help page 

/login - POST route
/register - POST route
/POST route to update user account info, to do
/POST route to submit Request, Approve Request. to do
/login and /register for component? don't think so 
*/

// to do
// history on tool page. 
// POST routes: request, approve, register, login, tool delete, submit review 

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

// Route to get tools available to a user based on location. The main grid page
app.get('/tools', (req, res) => {
  const userId = req.session.userId; // Retrieve UserID from session

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  db.query(`
    SELECT Tools.*, 
      (6371 * acos(cos(radians(Borrower.Latitude)) * cos(radians(Owner.Latitude)) * cos(radians(Owner.Longitude) - radians(Borrower.Longitude)) + sin(radians(Borrower.Latitude)) * sin(radians(Owner.Latitude)))) AS Distance 
    FROM Tools 
    JOIN Users AS Owner ON Tools.OwnerID = Owner.UserID 
    JOIN Users AS Borrower ON Borrower.UserID = ? 
    WHERE Distance <= Owner.LendingDiameter;
  `, [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing available tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing available tools' });
    }
    res.status(200).json({ tools: result });
  });
});

// Combined route to fetch MY user details and tools
app.get('/users/:userID/details', async (req, res) => {
  const userId = req.session.userId; // Retrieve UserID from session

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  try {
    // Fetch user details including Name and Lend Radius
    const userDetailsQuery = 'SELECT Name, LendingDiameter FROM Users WHERE UserID = ?';
    const userResult = await db.query(userDetailsQuery, [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch tools listed by the user
    const toolsQuery = 'SELECT * FROM Tools WHERE OwnerID = ?';
    const toolsResult = await db.query(toolsQuery, [userId]);
    const tools = toolsResult.rows;

    res.status(200).json({ user, tools });
  } catch (err) {
    console.error('Error fetching user details and tools:', err);
    res.status(500).json({ error: 'An error occurred while fetching user details and tools' });
  }
});

// Route to get all tools for a given user aka Tools i'm lending
app.get('/:userId/tools', (req, res) => {
  const userId = req.session.userId; // Retrieve UserID from session

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  db.query('SELECT * FROM Tools WHERE OwnerID = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing user tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing user tools' });
    }
    res.status(200).json({ tools: result });
  });
});

// Route to get a specific tool, and it's associated Requests
app.get('/tool/:toolId', async (req, res) => {
  const toolId = req.params.toolId;

  try {
    // Query to fetch tool details and requests
    const query = `
      SELECT Tools.*, Requests.*
      FROM Tools
      LEFT JOIN Requests ON Tools.ToolID = Requests.ToolID
      WHERE Tools.ToolID = ?
    `;

    const { rows } = await db.query(query, [toolId]);

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
      SELECT * FROM Requests 
      WHERE BorrowerID = $1 OR ToolID IN (SELECT ToolID FROM Tools WHERE OwnerID = $1)
    `;
    const { rows } = await db.query(query, [userID]);

    res.status(200).json({ requests: rows });
  } catch (err) {
    console.error('Error fetching user requests:', err);
    res.status(500).json({ error: 'An error occurred while fetching user requests' });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, address, email, phone, lendingDiameter, latitude, longitude, password } = req.body;
  try {
    // hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
    const insertQuery = `
      INSERT INTO Users ("Name", "Address", "Email", "Phone", "LendingDiameter", "Latitude", "Longitude", "PasswordHash")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING "UserID";
    `;
    const { rows } = await db.query(insertQuery, [name, address, email, phone, lendingDiameter, latitude, longitude, PasswordHash]);

    // set session
    req.session.userId = rows[0].UserID;
    req.session.email = email;
    
    res.status(201).json({ userId: rows[0].UserID, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // grab hashed pass and uid based on email
    const { rows } = await db.query('SELECT "UserID", "PasswordHash" FROM Users WHERE Email = $1', [email]);
    
    // check if there are results
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // extract user data
    const { UserID, PasswordHash } = rows[0];
    
    // compare hashed password from database with provided password
    const passwordMatch = await bcrypt.compare(password, PasswordHash);
    
    // if passwords match, login successful
    if (passwordMatch) {
      // set up session for logged-in user
      req.session.userId = UserID; // Store UserID in session
      req.session.email = email;   // Store email in session

      // respond with success
      return res.status(200).json({ userId: UserID, message: 'Login successful' });
    } else {
      // Passwords do not match
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

app.post('/api/logout', (req, res) => {
  // Clear session data
// req.session.destroy((err) => { ... });
 
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
