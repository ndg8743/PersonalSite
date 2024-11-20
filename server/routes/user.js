const express = require('express');
const User = require('../models/user');
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

// Login a user
router.post('/login', async (req, res) => {
  try {
    console.log(`User login attempt: ${req.body.username}`);
    const user = await User.login(req.body);
    res.send({ success: true, ...user, password: undefined });
  } catch (err) {
    console.error(`User login failed: ${err.message}`);
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