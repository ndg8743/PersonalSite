const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send({ message: "Please log in to comment" });
  }
};

// Middleware to check if user owns the comment
const isCommentOwner = async (req, res, next) => {
  try {
    const comment = await Comment.getCommentById(req.params.id);
    if (comment && comment.user_id === req.session.userId) {
      next();
    } else {
      res.status(403).send({ message: "You can only modify your own comments" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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
router.post("/create", isLoggedIn, async (req, res) => {
  try {
    console.log(`Creating comment for project ID: ${req.body.projectId}`);
    const comments = await Comment.createComment({
      projectId: req.body.projectId,
      userId: req.session.userId,
      content: req.body.content,
    });
    res.send(comments);
  } catch (err) {
    console.error(`Error creating comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Update a comment
router.put("/:id", isLoggedIn, isCommentOwner, async (req, res) => {
  try {
    console.log(`Updating comment ID: ${req.params.id}`);
    const comment = await Comment.updateComment(req.params.id, req.body.content);
    res.send(comment);
  } catch (err) {
    console.error(`Error updating comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Delete a comment
router.delete("/:id", isLoggedIn, isCommentOwner, async (req, res) => {
  try {
    console.log(`Deleting comment ID: ${req.params.id}`);
    await Comment.deleteComment(req.params.id);
    res.send({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(`Error deleting comment: ${err.message}`);
    res.status(500).send({ message: err.message });
  }
});

// Like a comment
router.post("/like/:id", isLoggedIn, async (req, res) => {
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
