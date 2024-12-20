const express = require("express");
const Project = require("../models/project");
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized: Admin access required" });
  }
};

// Get all projects
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all projects");
    const projects = await Project.getAllProjects();
    res.send(projects);
  } catch (err) {
    console.error(`Error fetching projects: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Get project by ID
router.get("/:id", async (req, res) => {
  try {
    console.log(`Fetching project by ID: ${req.params.id}`);
    const project = await Project.getProjectById(req.params.id);
    res.send(project);
  } catch (err) {
    console.error(`Error fetching project: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Create new project (admin only)
router.post("/create", isAdmin, async (req, res) => {
  try {
    console.log("Creating new project:", req.body);
    const project = await Project.createProject(req.body);
    res.status(201).send(project);
  } catch (err) {
    console.error(`Error creating project: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Like a project
router.post("/like/:id", async (req, res) => {
  try {
    console.log(`Liking project ID: ${req.params.id}`);
    const project = await Project.likeProject(req.params.id);
    res.send(project);
  } catch (err) {
    console.error(`Error liking project: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
