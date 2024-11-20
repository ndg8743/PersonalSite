const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    console.log("Fetching all projects");
    const projects = await Project.getAllProjects();
    res.send(projects);
  } catch (err) {
    console.error(`Error fetching projects: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});


// Create a new project
router.post('/create', async (req, res) => {
  try {
    console.log(`Creating project: ${req.body.title}`);
    const project = await Project.createProject(req.body);
    res.send(project);
  } catch (err) {
    console.error(`Error creating project: ${err.message}`);
    res.status(500).send({ message: err.message });
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

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching project by ID: ${req.params.id}`);
    const project = await Project.getProjectById(req.params.id);
    res.send(project);
  } catch (err) {
    console.error(`Error fetching project: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;
