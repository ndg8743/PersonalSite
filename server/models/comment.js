const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS comments (
      comment_id INT NOT NULL AUTO_INCREMENT,
      project_id INT,
      user_id INT,
      content TEXT NOT NULL,
      date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
      parent_comment_id INT,
      CONSTRAINT CommentPK PRIMARY KEY(comment_id),
      FOREIGN KEY (project_id) REFERENCES projects(project_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
    );
  `;
  await con.query(sql);
  console.log("Comments table created or already exists");
}
createTable();

// Get all comments for a project
async function getAllComments(projectId) {
  console.log(`Fetching all comments for project ID: ${projectId}`);
  let sql = `SELECT * FROM comments WHERE project_id = ?`;
  return await con.query(sql, [projectId]);
}

// Create a new comment
async function createComment(comment) {
  console.log(`Creating comment for project ID: ${comment.project_id}`);
  let sql = `
    INSERT INTO comments(project_id, user_id, content, parent_comment_id)
    VALUES(?, ?, ?, ?)
  `;
  const params = [
    comment.project_id,
    comment.user_id,
    comment.content,
    comment.parent_comment_id || null
  ];
  await con.query(sql, params);
  return await getAllComments(comment.project_id);
}

// Update a comment
async function updateComment(comment) {
  console.log(`Updating comment ID: ${comment.comment_id}`);
  let sql = `
    UPDATE comments
    SET content = ?
    WHERE comment_id = ?
  `;
  const params = [
    comment.content,
    comment.comment_id
  ];
  await con.query(sql, params);
}

// Delete a comment
async function deleteComment(commentId) {
  console.log(`Deleting comment ID: ${commentId}`);
  let sql = `
    DELETE FROM comments
    WHERE comment_id = ?
  `;
  await con.query(sql, [commentId]);
}

module.exports = { getAllComments, createComment, updateComment, deleteComment };