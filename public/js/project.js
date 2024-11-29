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

  // Change slot direction and speed based on mouse position
  const slotMachine = document.getElementById("slotmachine");
  slotMachine.addEventListener("mousemove", (e) => {
    const rect = slotMachine.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    // Calculate speed based on distance from the center
    const distanceFromCenter = Math.abs(mouseY - rect.height / 2);
    const speed = Math.max(0.5, 2 - distanceFromCenter / 100); // Adjust speed (min 0.5s, max 2s)

    // If mouse is in the top half, move up; otherwise, move down
    if (mouseY < rect.height / 2) {
      changeSlotDirection(true, speed); // Move up
    } else {
      changeSlotDirection(false, speed); // Move down
    }
  });
});

async function fetchProjects() {
  try {
    const response = await fetch("/project");
    if (!response.ok) throw new Error("Failed to fetch projects");

    const projects = await response.json();
    const slotMachineList = document.getElementById("slotmachine-list");
    slotMachineList.innerHTML = ""; // Clear existing items

    projects.forEach((project) => {
      const listItem = document.createElement("li");
      listItem.textContent = project.title; // Project name
      listItem.style.textAlign = "center"; // Center-align text
      listItem.addEventListener("click", () => openProjectModal(project));
      slotMachineList.appendChild(listItem);
    });

    // Initialize the selection wheel
    updateSelectionWheel();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

let currentIndex = 0; // Keep track of the currently selected project
let isRotating = false; // Prevent rapid firing of mousemove events

function changeSlotDirection(moveUp, speed) {
  if (isRotating) return; // Prevent multiple rapid calls

  const slotMachineList = document.getElementById("slotmachine-list");
  const items = Array.from(slotMachineList.children);

  // Determine new index
  if (moveUp) {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around to the last item
  } else {
    currentIndex = (currentIndex + 1) % items.length; // Wrap around to the first item
  }

  isRotating = true;

  // Apply smooth scrolling effect with dynamic speed
  slotMachineList.style.transition = `transform ${speed}s ease-out`;
  slotMachineList.style.transform = `translateY(-${currentIndex * 200}px)`; // Adjust for item height (200px)

  setTimeout(() => {
    isRotating = false; // Allow the next rotation after animation ends
  }, speed * 1000);

  // Update the visual indication for the selected item
  updateSelectionWheel();
}

function updateSelectionWheel() {
  const slotMachineList = document.getElementById("slotmachine-list");
  const items = Array.from(slotMachineList.children);

  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.color = "white"; // Highlight the selected item
      item.style.fontSize = "2em"; // Make it larger
    } else {
      item.style.color = "#666"; // De-emphasize unselected items
      item.style.fontSize = "1.5em"; // Keep other items smaller
    }
  });
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
