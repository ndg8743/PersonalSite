const con = require("./db_connect");

// Create the project table if it doesn't exist
async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS PROJECT (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    intro_picture VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    intro TEXT,
    picture1 VARCHAR(255),
    paragraph1 TEXT,
    picture2 VARCHAR(255),
    paragraph2 TEXT,
    picture3 VARCHAR(255),
    paragraph3 TEXT,
    technologies_used VARCHAR(255),
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    author_id INT,
    num_likes INT DEFAULT 0,
    num_comments INT DEFAULT 0,
    github_link VARCHAR(255),
    demo_url VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES ADMIN(admin_id) ON DELETE CASCADE
    );
  `;
  await con.query(sql);
  console.log("Project table created or already exists");
}
createTable();

// Get all projects
async function getAllProjects() {
  console.log("Fetching all projects from database");
  let sql = `SELECT * FROM project`;
  return await con.query(sql);
}

// Get a single project by ID
async function getProjectById(projectId) {
  console.log(`Fetching project by ID: ${projectId}`);
  let sql = `SELECT * FROM project WHERE project_id = ?`;
  const rows = await con.query(sql, [projectId]);
  return rows[0];
}

// Like a project
async function likeProject(projectId) {
  console.log(`Liking project ID: ${projectId}`);
  let sql = `
    UPDATE project
    SET num_likes = num_likes + 1
    WHERE project_id = ?
  `;
  await con.query(sql, [projectId]);

  // Return the updated project with the new like count
  return await getProjectById(projectId);
}

module.exports = { getAllProjects, getProjectById, likeProject };
