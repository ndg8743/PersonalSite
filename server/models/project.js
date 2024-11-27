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

// Get all project
async function getAllproject() {
  console.log("Fetching all project from database");
  let sql = `SELECT * FROM project`;
  return await con.query(sql);
}

// Create a new project
async function createProject(project) {
  console.log(`Creating project: ${project.title}`);
  let sql = `
    INSERT INTO project(title, content, description, technologies_used, author_id, github_link, demo_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    project.title,
    project.content,
    project.description,
    project.technologies_used,
    project.author_id,
    project.github_link,
    project.demo_url,
  ];
  await con.query(sql, params);
  return await getAllproject();
}

// Update a project
async function updateProject(project) {
  console.log(`Updating project ID: ${project.project_id}`);
  let sql = `
    UPDATE project
    SET title = ?, content = ?, description = ?, technologies_used = ?, github_link = ?, demo_url = ?
    WHERE project_id = ?
  `;
  const params = [
    project.title,
    project.content,
    project.description,
    project.technologies_used,
    project.github_link,
    project.demo_url,
    project.project_id,
  ];
  await con.query(sql, params);
}

// Delete a project
async function deleteProject(projectId) {
  console.log(`Deleting project ID: ${projectId}`);
  let sql = `
    DELETE FROM project
    WHERE project_id = ?
  `;
  await con.query(sql, [projectId]);
}

async function getProjectById(projectId) {
  console.log(`Fetching project by ID: ${projectId}`);
  let sql = `SELECT * FROM project WHERE project_id = ?`;
  const rows = await con.query(sql, [projectId]);
  return rows[0];
}

module.exports = { getAllproject, createProject, updateProject, deleteProject, getProjectById };