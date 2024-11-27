console.log("Loading admin.js in models directory");
const { query } = require("./db_connect");
console.log("Loaded db_connect.js successfully");
const bcrypt = require('bcrypt');

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS ADMIN (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Ensure unique usernames
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Ensure unique emails
    full_name VARCHAR(100) NOT NULL UNIQUE, -- Ensure unique full names
    last_login DATETIME
    );
  `;
  await query(sql);
  console.log("Admin table created or already exists");
}
createTable();

// Admin login
async function login(admin) {
  console.log(`Attempting to log in admin: ${admin.username}`);
  
  // Fetch admin by username
  const adminResult = await getAdminByUsername(admin.username);
  if (!adminResult[0]) throw Error("Username not found!");
  
  console.log(`Entered password: ${admin.password}`);
  console.log(`Stored hashed password: ${adminResult[0].password}`);

  let validPassword = false;

  // First, try to compare with hashed password
  try {
    validPassword = await bcrypt.compare(admin.password, adminResult[0].password);
  } catch (error) {
    console.error(`Error comparing hashed passwords: ${error.message}`);
  }

  // If hashed comparison fails, fallback to plain text comparison
  if (!validPassword) {
    console.warn("Hashed password comparison failed, trying plain text comparison.");
    validPassword = admin.password === adminResult[0].password;
  }

  console.log(`Password comparison result: ${validPassword}`);
  if (!validPassword) throw Error("Incorrect password!");

  // Update last_login timestamp
  await query(`UPDATE admin SET last_login = NOW() WHERE admin_id = ?`, [adminResult[0].admin_id]);
  console.log(`Admin ${admin.username} logged in successfully`);
  return adminResult[0];
}

// Helper function to get admin by username
async function getAdminByUsername(username) {
  console.log(`Fetching admin by username: ${username}`);
  let sql = `
    SELECT * FROM admin 
    WHERE username = ?
  `;
  return await query(sql, [username]);
}

// Helper function to get admin by ID
async function getAdminById(adminId) {
  console.log(`Fetching admin by ID: ${adminId}`);
  let sql = `
    SELECT * FROM admin 
    WHERE admin_id = ?
  `;
  return await query(sql, [adminId]);
}

// Fetch all admins
async function getAllAdmins() {
  console.log("Fetching all admins from database");
  let sql = `SELECT * FROM admin`;
  return await query(sql);
}

module.exports = { login, getAdminByUsername, getAdminById, getAllAdmins };