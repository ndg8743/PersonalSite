document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();

  // Handle comment submission
  document.getElementById("modal-comment-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const projectId = document.querySelector("#modal").dataset.projectId;
      const commentContent = document.getElementById("modal-comment").value;
      submitComment(projectId, commentContent);
  });

  // Handle likes
  document.getElementById("modal-like-btn").addEventListener("click", () => {
      const projectId = document.querySelector("#modal").dataset.projectId;
      likeProject(projectId);
  });
});

async function fetchProjects() {
  try {
      const response = await fetch("/project");
      if (!response.ok) throw new Error("Failed to fetch projects");

      const projects = await response.json();
      const container = document.getElementById("project-container");
      container.innerHTML = ""; // Clear existing content

      projects.forEach((project) => {
          const projectCard = document.createElement("div");
          projectCard.className = "proj";
          projectCard.style.backgroundImage = `url('${project.intro_picture}')`;
          projectCard.innerHTML = `<h3 style="text-align: center; color: white;">${project.title}</h3>`;
          projectCard.addEventListener("click", () => openProjectModal(project));
          container.appendChild(projectCard);
      });
  } catch (error) {
      console.error("Error fetching projects:", error);
  }
}

function openProjectModal(project) {
  const modal = document.querySelector("#modal");
  modal.dataset.projectId = project.project_id;

  document.getElementById("modal-title").innerText = project.title;
  document.getElementById("modal-description").innerText = project.intro;
  document.getElementById("modal-technologies").innerText = project.technologies_used;
  document.getElementById("modal-date").innerText = new Date(project.date_created).toLocaleDateString();
  document.getElementById("modal-github").href = project.github_link || "#";
  document.getElementById("modal-demo").href = project.demo_url || "#";
  document.getElementById("modal-likes").innerText = project.num_likes;

  loadComments(project.project_id);
  modal.classList.add("shown");
}

function closeModal() {
  document.querySelector("#modal").classList.remove("shown");
}

async function likeProject(projectId) {
  try {
      const response = await fetch(`/project/like/${projectId}`, { method: "POST" });
      if (!response.ok) throw new Error("Failed to like project");

      const updatedProject = await response.json();
      document.getElementById("modal-likes").innerText = updatedProject.num_likes;
  } catch (error) {
      console.error("Error liking project:", error);
  }
}
