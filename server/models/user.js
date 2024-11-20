const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      full_name VARCHAR(100),
      last_login DATETIME,
      CONSTRAINT UserPK PRIMARY KEY(user_id)
    );
  `;
  await con.query(sql);
  console.log("User table created or already exists");
}
createTable();

// Get all users
async function getAllUsers() {
  console.log("Fetching all users from database");
  let sql = `SELECT * FROM users`;
  return await con.query(sql);
}

// Register (Create) a new user
async function register(user) {
  console.log(`Registering new user: ${user.username}`);
  let userExists = await getUserByUsername(user.username);
  if (userExists.length > 0) throw Error("Username already in use!");

  let sql = `
    INSERT INTO users (username, password, email, full_name)
    VALUES ("${user.username}", "${user.password}", "${user.email}", "${user.full_name}")
  `;
  await con.query(sql);
  return await getUserByUsername(user.username);
}

// Login user
async function login(user) {
  console.log(`User login attempt: ${user.username}`);
  let userResult = await getUserByUsername(user.username);
  if (!userResult[0]) throw Error("Username not found!");
  if (userResult[0].password !== user.password) throw Error("Incorrect password!");

  // Update last_login timestamp
  await con.query(`UPDATE users SET last_login = NOW() WHERE user_id = ${userResult[0].user_id}`);
  console.log(`User ${user.username} logged in successfully`);
  return userResult[0];
}

// Update user information
async function updateUser(user) {
  console.log(`Updating user: ${user.user_id}`);
  let sql = `
    UPDATE users
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
    DELETE FROM users
    WHERE user_id = ${user.user_id}
  `;
  await con.query(sql);
}

// Search users by username or email
async function searchUsers(query) {
  console.log(`Searching users with query: ${query}`);
  let sql = `
    SELECT * FROM users 
    WHERE username LIKE "%${query}%" OR email LIKE "%${query}%"
  `;
  return await con.query(sql);
}

// Helper function to get user by username
async function getUserByUsername(username) {
  console.log(`Fetching user by username: ${username}`);
  let sql = `
    SELECT * FROM users 
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}

// Helper function to get user by ID
async function getUserById(userId) {
  console.log(`Fetching user by ID: ${userId}`);
  let sql = `
    SELECT * FROM users 
    WHERE user_id = ${userId}
  `;
  return await con.query(sql);
}

module.exports = { getAllUsers, register, login, updateUser, deleteUser, searchUsers };