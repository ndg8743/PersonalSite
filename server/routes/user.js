const express = require('express');
const User = require('../models/user');
const Admin = require('../models/admin'); // Import the admin model
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    console.log("Fetching all users");
    const users = await User.getAllUsers();
    res.send(users);
  } catch (err) {
    console.error(`Error fetching users: ${err.message}`);
    res.status(401).send({ message: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    console.log(`Registering new user: ${req.body.username}`);
    const user = await User.register(req.body);
    res.send({ ...user, password: undefined });
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    res.status(401).send({ message: err.message });
  }
});

// Login a user or admin
router.post('/login', async (req, res) => {
  try {
    console.log(`Login attempt for: ${req.body.username}`);

    let user;
    // Try logging in as a regular user
    try {
      console.log("Attempting to log in as a regular user...");
      user = await User.login(req.body);
      req.session.isAdmin = false; // Not an admin
    } catch (userError) {
      console.log(`Regular user login failed: ${userError.message}`);
      // Try logging in as an admin
      console.log("Attempting to log in as an admin...");
      user = await Admin.login(req.body);
      req.session.isAdmin = true; // This is an admin
    }

    // Set session details for both user and admin
    req.session.userId = user.user_id || user.admin_id; // Use appropriate ID
    req.session.username = user.username;

    console.log(`Login successful for: ${req.body.username}`);
    res.send({ success: true, userType: req.session.isAdmin ? "admin" : "user" });

  } catch (err) {
    console.error(`Login failed: ${err.message}`);
    res.status(401).send({ success: false, message: err.message });
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  try {
    console.log(`Updating user: ${req.body.user_id}`);
    const updatedUser = await User.updateUser(req.body);
    res.send({ ...updatedUser, password: undefined });
  } catch (err) {
    console.error(`Error updating user: ${err.message}`);
    res.status(401).send({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting user: ${req.params.id}`);
    await User.deleteUser({ user_id: req.params.id });
    res.send({ success: "User deleted successfully!" });
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`);
    res.status(401).send({ message: err.message });
  }
});

// Search users by username or email
router.get('/search', async (req, res) => {
  try {
    console.log(`Searching users with query: ${req.query.query}`);
    const { query } = req.query;
    const users = await User.searchUsers(query);
    res.send(users);
  } catch (err) {
    console.error(`Error searching users: ${err.message}`);
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;