const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

// Get comments by project ID
router.get("/:projectId", async (req, res) => {
  try {
    console.log(`Fetching comments for project ID: ${req.params.projectId}`);
    const comments = await Comment.getCommentsByProjectId(req.params.projectId);
    res.send(comments);
  } catch (err) {
    console.error(`Error fetching comments: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Create a comment
router.post("/create", async (req, res) => {
  try {
    console.log(`Creating comment for project ID: ${req.body.projectId}`);
    const comments = await Comment.createComment({
      projectId: req.body.projectId,
      userId: req.body.userId,
      content: req.body.content,
    });
    res.send(comments);
  } catch (err) {
    console.error(`Error creating comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Like a comment
router.post("/like/:id", async (req, res) => {
  try {
    console.log(`Liking comment ID: ${req.params.id}`);
    await Comment.likeComment(req.params.id);
    res.send({ success: "Comment liked successfully" });
  } catch (err) {
    console.error(`Error liking comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
