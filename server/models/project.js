const con = require("./db_connect");

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
      FOREIGN KEY (author_id) REFERENCES admin(admin_id)
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
    VALUES("${project.title}", "${project.content}", "${project.description}", "${project.technologies_used}", ${project.author_id}, "${project.github_link}", "${project.demo_url}")
  `;
  await con.query(sql);
  return await getAllProjects();
}

// Update a project
async function updateProject(project) {
  let sql = `
    UPDATE projects
    SET title = "${project.title}", content = "${project.content}", description = "${project.description}"
    WHERE project_id = ${project.project_id}
  `;
  await con.query(sql);
}

// Delete a project
async function deleteProject(project) {
  let sql = `
    DELETE FROM projects
    WHERE project_id = ${project.project_id}
  `;
  await con.query(sql);
}

module.exports = { getAllProjects, createProject, updateProject, deleteProject };
