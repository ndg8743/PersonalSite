const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body);
    res.send({ ...user, password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body);
    res.send({ ...user, password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Update user profile
router.put('/update', async (req, res) => {
  try {
    const updatedUser = await User.updateUser(req.body);
    res.send({ ...updatedUser, password: undefined });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Delete a user
router.delete('/delete', async (req, res) => {
  try {
    await User.deleteUser(req.body);
    res.send({ success: "User deleted successfully!" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
