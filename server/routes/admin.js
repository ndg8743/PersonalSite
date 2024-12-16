const express = require('express');
const Admin = require('../models/admin');
const Project = require('../models/project');
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

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
};

// Create new project (admin only)
router.post('/project/create', isAdmin, async (req, res) => {
    try {
        console.log('Creating new project:', req.body.title);
        const project = await Project.createProject({
            ...req.body,
            admin_id: req.session.adminId
        });
        console.log('Project created successfully:', project.title);
        res.json({ success: true, project });
    } catch (err) {
        console.error('Error creating project:', err.message);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update project (admin only)
router.put('/project/update/:id', isAdmin, async (req, res) => {
    try {
        console.log(`Updating project ${req.params.id}`);
        const project = await Project.updateProject({
            ...req.body,
            project_id: req.params.id
        });
        console.log('Project updated successfully:', project.title);
        res.json({ success: true, project });
    } catch (err) {
        console.error('Error updating project:', err.message);
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete project (admin only)
router.delete('/project/:id', isAdmin, async (req, res) => {
    try {
        console.log(`Deleting project ${req.params.id}`);
        await Project.deleteProject(req.params.id);
        console.log('Project deleted successfully');
        res.json({ success: true });
    } catch (err) {
        console.error('Error deleting project:', err.message);
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
