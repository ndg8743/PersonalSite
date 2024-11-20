const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
    try {
        console.log(`Admin login attempt: ${req.body.username}`);
        const admin = await Admin.login(req.body);
        req.session.isAdmin = true;
        req.session.adminId = admin.admin_id;
        console.log(`Admin ${req.body.username} logged in successfully`);
        res.json({ success: true });
    } catch (err) {
        console.error(`Admin login failed: ${err.message}`);
        res.status(401).json({ success: false, message: err.message });
    }
});

// Admin logout
router.get('/logout', (req, res) => {
    console.log(`Admin logout: ${req.session.adminId}`);
    req.session.destroy();
    res.redirect('/html/login.html');
});

// Check if user is admin
router.get('/check', (req, res) => {
    console.log(`Admin check: ${req.session.adminId}`);
    if (req.session.isAdmin) {
        res.json({ isAdmin: true });
    } else {
        res.json({ isAdmin: false });
    }
});

module.exports = router;