console.log("Loading admin.js in models directory");
const { query } = require("./db_connect");
console.log("Loaded db_connect.js successfully");
const bcrypt = require('bcrypt');

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS admins (
      admin_id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      full_name VARCHAR(100),
      last_login DATETIME,
      CONSTRAINT AdminPK PRIMARY KEY(admin_id)
    );
  `;
  await query(sql);
  console.log("Admin table created or already exists");
}
createTable();

// Admin login
async function login(admin) {
  console.log(`Attempting to log in admin: ${admin.username}`);
  let adminResult = await getAdminByUsername(admin.username);
  if (!adminResult[0]) throw Error("Username not found!");
  const validPassword = await bcrypt.compare(admin.password, adminResult[0].password);
  if (!validPassword) throw Error("Incorrect password!");

  // Update last_login timestamp
  await query(`UPDATE admins SET last_login = NOW() WHERE admin_id = ${adminResult[0].admin_id}`);
  console.log(`Admin ${admin.username} logged in successfully`);
  return adminResult[0];
}

// Helper function to get admin by username
async function getAdminByUsername(username) {
  console.log(`Fetching admin by username: ${username}`);
  let sql = `
    SELECT * FROM admins 
    WHERE username = ?
  `;
  return await query(sql, [username]);
}

// Helper function to get admin by ID
async function getAdminById(adminId) {
  console.log(`Fetching admin by ID: ${adminId}`);
  let sql = `
    SELECT * FROM admins 
    WHERE admin_id = ?
  `;
  return await query(sql, [adminId]);
}

module.exports = { login, getAdminByUsername, getAdminById };