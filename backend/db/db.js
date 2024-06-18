// This initializes the database connection, and runs the schema.sql file to create the database schema.

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// read environment variables (.env from main folder)
require('dotenv').config({ path: '../../.env' });

// database configuration
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// read schema file
const initSql = fs.readFileSync(path.join(__dirname, 'schema', 'schema.sql'), 'utf8');

// initialize database schema
pool.query(initSql, (err, result) => {
  if (err) {
    console.error('Error executing schema.sql:', err);
  } else {
    console.log('schema.sql executed successfully');
  }
});

module.exports = {
  pool: pool
};