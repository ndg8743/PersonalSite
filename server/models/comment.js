const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS COMMENT (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    user_id INT,
    content TEXT NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    parent_comment_id INT,
    num_likes INT DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES PROJECT(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES COMMENT(comment_id) ON DELETE CASCADE
    );
  `;
  await con.query(sql);
  console.log("Comment table created or already exists");
}
createTable();

// Get all comment for a project
async function getAllcomment(projectId) {
  console.log(`Fetching all comments for project ID: ${projectId}`);
  let sql = `SELECT * FROM comment WHERE project_id = ?`;
  return await con.query(sql, [projectId]);
}

// Create a new comment
async function createComment(comment) {
  console.log(`Creating comment for project ID: ${comment.project_id}`);
  let sql = `
    INSERT INTO comment(project_id, user_id, content, parent_comment_id)
    VALUES(?, ?, ?, ?)
  `;
  const params = [
    comment.project_id,
    comment.user_id,
    comment.content,
    comment.parent_comment_id || null
  ];
  await con.query(sql, params);
  return await getAllcomment(comment.project_id);
}

// Update a comment
async function updateComment(comment) {
  console.log(`Updating comment ID: ${comment.comment_id}`);
  let sql = `
    UPDATE comment
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
    DELETE FROM comment
    WHERE comment_id = ?
  `;
  await con.query(sql, [commentId]);
}

module.exports = { getAllcomment, createComment, updateComment, deleteComment };