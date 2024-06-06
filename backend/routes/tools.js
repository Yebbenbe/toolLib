const express = require("express");
const db = require("../db");

// Create a router instance
const router = express.Router();

router.get('/tools', (req, res) => {
  db.query('SELECT * , (6371 * acos(cos(radians(Borrower.Latitude)) * cos(radians(Owner.Latitude)) * cos(radians(Owner.Longitude) - radians(Borrower.Longitude)) + sin(radians(Borrower.Latitude)) * sin(radians(Owner.Latitude)))) AS Distance FROM Tools JOIN Users AS Owner ON Tools.OwnerID = Owner.UserID JOIN Users AS Borrower ON Borrower.UserID = ? WHERE Distance <= Owner.LendingDiameter;', [userId], (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      return res.status(500).json({ error: 'An error occurred while grabbing available tools' });
    }
    res.status(200).json({ message: 'Collected available tools' });
  });
});

module.exports = router;