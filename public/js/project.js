const isAdmin = true; // Replace with real authentication check

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    fetch("/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          console.log("Admin user detected");
          document.getElementById("admin-link").style.display = "block";
        }
      });
  
    fetchProjectDetails();
  });
  
  function fetchProjectDetails() {
    console.log("Fetching project details");
    fetch("/project")
      .then((res) => res.json())
      .then((projects) => {
        const projectList = document.getElementById("project-list");
        projects.forEach((project) => {
          const projectItem = document.createElement("div");
          projectItem.className = "project-item";
          projectItem.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p><b>Technologies Used:</b> ${project.technologies_used}</p>
            <p><b>GitHub Link:</b> <a href="${project.github_link}" target="_blank">GitHub</a></p>
            <p><b>Demo URL:</b> <a href="${project.demo_url}" target="_blank">Demo</a></p>
          `;
          projectList.appendChild(projectItem);
        });
        console.log("Project details fetched successfully");
      })
      .catch((err) => console.error("Error fetching project details:", err));
  }
/*
document.addEventListener("DOMContentLoaded", () => {
  const createProjectBtn = document.getElementById("create-project-btn");

  // Show create project button if admin
  if (isAdmin) {
    console.log("Admin user detected, showing create project button");
    createProjectBtn.style.display = "block";
    createProjectBtn.addEventListener("click", () => {
      createProject();
    });
  }

  // Fetch and display project details
  fetchProjectDetails();
});
*/
function fetchProjectDetails() {
  console.log("Fetching project details");
  fetch("/project/details")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("project-title").textContent = data.title;
      document.getElementById("project-description").textContent = data.description;

      const imagesContainer = document.getElementById("project-images");
      imagesContainer.innerHTML = "";
      data.images.forEach((imageUrl) => {
        const img = document.createElement("img");
        img.src = imageUrl;
        imagesContainer.appendChild(img);
      });
      console.log("Project details fetched successfully");
    })
    .catch((err) => console.error("Error fetching project details:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  document.getElementById("project-form").addEventListener("submit", createProject);
});

async function loadUsers() {
  try {
    console.log("Loading users");
    const response = await fetch("/user");
    const users = await response.json();
    const userList = document.getElementById("user-list");

    userList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.full_name} (${user.username})`;
      userList.appendChild(li);
    });
    console.log("Users loaded successfully");
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

async function createProject(e) {
  e.preventDefault();
  const projectData = {
    title: document.getElementById("project-title").value,
    content: document.getElementById("project-content").value,
    description: document.getElementById("project-description").value,
    technologies_used: document.getElementById("technologies-used").value,
    github_link: document.getElementById("github-link").value,
    demo_url: document.getElementById("demo-url").value,
  };

  try {
    console.log("Creating project");
    const response = await fetch("/project/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });
    if (response.ok) {
      console.log("Project created successfully");
      alert("Project created successfully!");
    } else {
      console.error("Error creating project");
    }
  } catch (error) {
    console.error("Error creating project:", error);
  }
}