const express = require("express");
const db = require("../db");

// Create a router instance
const router = express.Router();

// Route to get tools available to a user based on location
router.get('/tools', (req, res) => {
  const userId = req.query.userId; // Assume userId is passed as a query parameter
  db.query(`
    SELECT Tools.*, 
      (6371 * acos(cos(radians(Borrower.Latitude)) * cos(radians(Owner.Latitude)) * cos(radians(Owner.Longitude) - radians(Borrower.Longitude)) + sin(radians(Borrower.Latitude)) * sin(radians(Owner.Latitude)))) AS Distance 
    FROM Tools 
    JOIN Users AS Owner ON Tools.OwnerID = Owner.UserID 
    JOIN Users AS Borrower ON Borrower.UserID = ? 
    HAVING Distance <= Owner.LendingDiameter;
  `, [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing available tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing available tools' });
    }
    res.status(200).json({ tools: result });
  });
});

// Route to get all tools for a given user aka Tools i'm lending
router.get('/tools/user/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM Tools WHERE OwnerID = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing user tools:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing user tools' });
    }
    res.status(200).json({ tools: result });
  });
});

// Route to get all requests where user is OwnerID aka ALL lent
router.get('/requests/owner/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM Requests WHERE OwnerID = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing owner requests:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing owner requests' });
    }
    res.status(200).json({ requests: result });
  });
});

// Route to get all requests where user is BorrowerID aka All borrowed
router.get('/requests/borrower/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM Requests WHERE BorrowerID = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error grabbing borrower requests:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing borrower requests' });
    }
    res.status(200).json({ requests: result });
  });
});

// Route to get all requests for a given tool  AKA All users of THIS tool
router.get('/requests/tool/:toolId', (req, res) => {
  const toolId = req.params.toolId;
  db.query('SELECT * FROM Requests WHERE ToolID = ?', [toolId], (err, result) => {
    if (err) {
      console.error('Error grabbing tool requests:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing tool requests' });
    }
    res.status(200).json({ requests: result });
  });
});

module.exports = router;
