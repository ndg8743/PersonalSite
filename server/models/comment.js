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
}
createTable();

// Get all comments
async function getAllComments() {
  let sql = `SELECT * FROM comments`;
  return await con.query(sql);
}

// Create a new comment
async function createComment(comment) {
  let sql = `
    INSERT INTO comments(project_id, user_id, content, parent_comment_id)
    VALUES(${comment.project_id}, ${comment.user_id}, "${comment.content}", ${comment.parent_comment_id || "NULL"})
  `;
  await con.query(sql);
  return await getAllComments();
}

// Update a comment
async function updateComment(comment) {
  let sql = `
    UPDATE comments
    SET content = "${comment.content}"
    WHERE comment_id = ${comment.comment_id}
  `;
  await con.query(sql);
}

// Delete a comment
async function deleteComment(comment) {
  let sql = `
    DELETE FROM comments
    WHERE comment_id = ${comment.comment_id}
  `;
  await con.query(sql);
}

module.exports = { getAllComments, createComment, updateComment, deleteComment };
