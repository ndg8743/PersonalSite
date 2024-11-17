const con = require("./db_connect");

// Create the Projects table if it doesn't exist
async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS projects (
      project_id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      description TEXT,
      technologies_used VARCHAR(255),
      date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
      author_id INT,
      num_likes INT DEFAULT 0,
      num_comments INT DEFAULT 0,
      github_link VARCHAR(255),
      demo_url VARCHAR(255),
      CONSTRAINT ProjectPK PRIMARY KEY(project_id),
      FOREIGN KEY (author_id) REFERENCES admin(admin_id) ON DELETE CASCADE
    );
  `;
  await con.query(sql);
}
createTable();

// Get all projects
async function getAllProjects() {
  let sql = `SELECT * FROM projects`;
  return await con.query(sql);
}

// Create a new project
async function createProject(project) {
  let sql = `
    INSERT INTO projects(title, content, description, technologies_used, author_id, github_link, demo_url)
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
  return await getAllProjects();
}

// Update a project
async function updateProject(project) {
  let sql = `
    UPDATE projects
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
  let sql = `
    DELETE FROM projects
    WHERE project_id = ?
  `;
  await con.query(sql, [projectId]);
}

module.exports = { getAllProjects, createProject, updateProject, deleteProject };

async function getProjectById(projectId) {
  let sql = `SELECT * FROM projects WHERE project_id = ?`;
  const rows = await con.query(sql, [projectId]);
  return rows[0];
}

module.exports = { getAllProjects, createProject, updateProject, deleteProject, getProjectById };
