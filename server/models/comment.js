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

// Fetch comments for a project
async function getCommentsByProjectId(projectId) {
  console.log(`Fetching comments for project ID: ${projectId}`);
  let sql = `SELECT * FROM comment WHERE project_id = ? ORDER BY date_created DESC`;
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

module.exports = { getCommentsByProjectId, createComment, likeComment };
