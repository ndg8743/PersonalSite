const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();

/// Get all comments for a project
router.get('/:projectId', async (req, res) => {
  try {
    console.log(`Fetching comments for project ID: ${req.params.projectId}`);
    const comments = await Comment.getAllComments(req.params.projectId);
    res.send(comments);
  } catch (err) {
    console.error(`Error fetching comments: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Create a new comment
router.post('/create', async (req, res) => {
  try {
    console.log(`Creating comment for project ID: ${req.body.projectId}`);
    const comment = await Comment.createComment(req.body);
    res.send(comment);
  } catch (err) {
    console.error(`Error creating comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Update a comment
router.put('/update', async (req, res) => {
  try {
    await Comment.updateComment(req.body);
    res.send({ success: "Comment updated successfully!" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

// Delete a comment
router.delete('/delete', async (req, res) => {
  try {
    await Comment.deleteComment(req.body);
    res.send({ success: "Comment deleted successfully!" });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

module.exports = router;
