const con = require("./db_connect");
const bcrypt = require('bcrypt');

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS USER (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Ensure unique usernames
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- Ensure unique emails
    full_name VARCHAR(100) NOT NULL UNIQUE, -- Ensure unique full names
    last_login DATETIME
    );
  `;
  await con.query(sql);
  console.log("User table created or already exists");
}
createTable();

// Get all users
async function getAllUsers() {
  console.log("Fetching all users from database");
  let sql = `SELECT * FROM user`;
  return await con.query(sql);
}

// Register (Create) a new user
async function register(user) {
  console.log(`Registering new user: ${user.username}`);

  // Check for duplicate username
  let userExists = await getUserByUsername(user.username);
  if (userExists.length > 0) throw Error("Username already in use!");

  // Check for duplicate email
  let emailExists = await con.query(
    `SELECT * FROM user WHERE email = ?`,
    [user.email]
  );
  if (emailExists.length > 0) throw Error("Email already in use!");

  // Check for duplicate full name
  let fullNameExists = await con.query(
    `SELECT * FROM user WHERE full_name = ?`,
    [user.full_name]
  );
  if (fullNameExists.length > 0) throw Error("Full name already in use!");

  // Hash the password and insert the new user
  const hashedPassword = await bcrypt.hash(user.password, 10);

  let sql = `
    INSERT INTO user (username, password, email, full_name)
    VALUES (?, ?, ?, ?)
  `;
  await con.query(sql, [
    user.username,
    hashedPassword,
    user.email,
    user.full_name,
  ]);

  return await getUserByUsername(user.username);
}


// Login user
async function login(user) {
  console.log(`User login attempt: ${user.username}`);
  let userResult = await getUserByUsername(user.username);
  console.log(`User fetched from database: ${JSON.stringify(userResult)}`);
  if (!userResult[0]) throw Error("Username not found!");

  console.log(`Entered password: ${user.password}`);
  console.log(`Stored hashed password: ${userResult[0].password}`);

  let validPassword = false;

  // First, try to compare with hashed password
  try {
    validPassword = await bcrypt.compare(user.password, userResult[0].password);
  } catch (error) {
    console.error(`Error comparing hashed passwords: ${error.message}`);
  }

  // If hashed comparison fails, fallback to plain text comparison
  if (!validPassword) {
    console.warn("Hashed password comparison failed, trying plain text comparison.");
    validPassword = user.password === userResult[0].password;
  }

  console.log(`Password comparison result: ${validPassword}`);
  if (!validPassword) throw Error("Incorrect password!");

  // Update last_login timestamp
  await con.query(`UPDATE user SET last_login = NOW() WHERE user_id = ${userResult[0].user_id}`);
  console.log(`User ${user.username} logged in successfully`);
  return userResult[0];
}

// Update user information
async function updateUser(user) {
  console.log(`Updating user: ${user.user_id}`);
  let sql = `
    UPDATE user
    SET full_name = "${user.full_name}", email = "${user.email}"
    WHERE user_id = ${user.user_id}
  `;
  await con.query(sql);
  return await getUserById(user.user_id);
}

// Delete user
async function deleteUser(user) {
  console.log(`Deleting user: ${user.user_id}`);
  let sql = `
    DELETE FROM user
    WHERE user_id = ${user.user_id}
  `;
  await con.query(sql);
}

// Search users by username or email
async function searchUsers(query) {
  console.log(`Searching users with query: ${query}`);
  let sql = `
    SELECT * FROM user 
    WHERE username LIKE "%${query}%" OR email LIKE "%${query}%"
  `;
  return await con.query(sql);
}

// Helper function to get user by username
async function getUserByUsername(username) {
  console.log(`Fetching user by username: ${username}`);
  let sql = `
    SELECT * FROM user 
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}

// Helper function to get user by ID
async function getUserById(userId) {
  console.log(`Fetching user by ID: ${userId}`);
  let sql = `
    SELECT * FROM user 
    WHERE user_id = ${userId}
  `;
  return await con.query(sql);
}

module.exports = { getAllUsers, register, login, updateUser, deleteUser, searchUsers };