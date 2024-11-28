const express = require("express");
const Project = require("../models/project");
const router = express.Router();

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
