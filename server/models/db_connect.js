require('dotenv').config();
const mysql = require('mysql2/promise'); // Use promise-based mysql2 for async/await support

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSERNAME || 'root',
  password: process.env.MYSQLPSWD || 'password',
  database: process.env.MYSQLDB || 'test',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute queries
const query = async (sql, bindings = []) => {
  try {
    const [rows] = await pool.query(sql, bindings);
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

// Function to test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

// Test the connection on initialization
testConnection();

module.exports = { pool, query };