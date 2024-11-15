const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.getAllProjects();
    res.send(projects);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Create a new project
router.post('/create', async (req, res) => {
  try {
    const project = await Project.createProject(req.body);
    res.send(project);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Update a project
router.put('/update', async (req, res) => {
  try {
    await Project.updateProject(req.body);
    res.send({ success: "Project updated successfully!" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Delete a project
router.delete('/delete', async (req, res) => {
  try {
    await Project.deleteProject(req.body);
    res.send({ success: "Project deleted successfully!" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
