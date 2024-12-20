const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS COMMENT (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    num_likes INT DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES PROJECT(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES USER(user_id) ON DELETE CASCADE
    );
  `;
  await con.query(sql);
  console.log("Comment table created or already exists");
}
createTable();

// Get a single comment by ID
async function getCommentById(commentId) {
  console.log(`Fetching comment by ID: ${commentId}`);
  let sql = `SELECT * FROM comment WHERE comment_id = ?`;
  const rows = await con.query(sql, [commentId]);
  return rows[0];
}

// Fetch comments for a project
async function getCommentsByProjectId(projectId) {
  console.log(`Fetching comments for project ID: ${projectId}`);
  let sql = `
    SELECT c.*, u.username, 
           DATE_FORMAT(c.date_created, '%Y-%m-%d %H:%i:%s') as formatted_date_created
    FROM comment c
    JOIN USER u ON c.user_id = u.user_id 
    WHERE c.project_id = ? 
    ORDER BY c.date_created DESC
  `;
  return await con.query(sql, [projectId]);
}

// Create a new comment
async function createComment(comment) {
  console.log(`Creating comment for project ID: ${comment.projectId}`);
  let sql = `
    INSERT INTO comment (project_id, user_id, content)
    VALUES (?, ?, ?)
  `;
  const params = [comment.projectId, comment.userId, comment.content];
  await con.query(sql, params);

  // Return all comments for the project
  return await getCommentsByProjectId(comment.projectId);
}

// Update a comment
async function updateComment(commentId, content) {
  console.log(`Updating comment ID: ${commentId}`);
  let sql = `
    UPDATE comment
    SET content = ?
    WHERE comment_id = ?
  `;
  await con.query(sql, [content, commentId]);

  // Return the updated comment
  return await getCommentById(commentId);
}

// Delete a comment
async function deleteComment(commentId) {
  console.log(`Deleting comment ID: ${commentId}`);
  let sql = `DELETE FROM comment WHERE comment_id = ?`;
  return await con.query(sql, [commentId]);
}

// Like a comment
async function likeComment(commentId) {
  console.log(`Liking comment ID: ${commentId}`);
  let sql = `
    UPDATE comment
    SET num_likes = num_likes + 1
    WHERE comment_id = ?
  `;
  await con.query(sql, [commentId]);
}

module.exports = { 
  getCommentById,
  getCommentsByProjectId, 
  createComment, 
  updateComment,
  deleteComment,
  likeComment
};
