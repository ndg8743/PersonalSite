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
        const projects = await window.fetchData('/project', {}, 'GET');
        const slotMachineList = document.getElementById("slotmachine-list");
        slotMachineList.innerHTML = ""; // Clear existing items

        projects.forEach((project) => {
            const listItem = document.createElement("li");
            listItem.textContent = project.title;
            listItem.style.textAlign = "center";
            listItem.addEventListener("click", () => openProjectModal(project));
            slotMachineList.appendChild(listItem);
        });

        // Initialize the selection wheel
        updateSelectionWheel();
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        showError("Failed to load projects. Please try again later.");
    }
}

let currentIndex = 0;
let isRotating = false;

function changeSlotDirection(moveUp, speed) {
    if (isRotating) return;

    const slotMachineList = document.getElementById("slotmachine-list");
    const items = Array.from(slotMachineList.children);
    if (items.length === 0) return;

    isRotating = true;

    // Determine new index
    if (moveUp) {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    } else {
        currentIndex = (currentIndex + 1) % items.length;
    }

    // Apply smooth scrolling effect
    slotMachineList.style.transition = `transform ${speed}s ease-out`;
    slotMachineList.style.transform = `translateY(-${currentIndex * 200}px)`;

    setTimeout(() => {
        isRotating = false;
    }, speed * 1000);

    updateSelectionWheel();
}

function updateSelectionWheel() {
    const slotMachineList = document.getElementById("slotmachine-list");
    const items = Array.from(slotMachineList.children);

    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.color = "white";
            item.style.fontSize = "2em";
        } else {
            item.style.color = "#666";
            item.style.fontSize = "1.5em";
        }
    });
}

function openProjectModal(project) {
    const modal = document.querySelector("#modal");
    modal.dataset.projectId = project.project_id;

    // Update modal content
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-description").innerText = project.description || project.intro;
    document.getElementById("modal-technologies").innerText = project.technologies_used;
    document.getElementById("modal-date").innerText = new Date(project.date_created).toLocaleDateString();
    
    // Update links
    const githubLink = document.getElementById("modal-github");
    const demoLink = document.getElementById("modal-demo");
    
    githubLink.href = project.github_link || "#";
    demoLink.href = project.demo_url || "#";
    
    githubLink.style.display = project.github_link ? "inline-block" : "none";
    demoLink.style.display = project.demo_url ? "inline-block" : "none";
    
    // Update likes
    document.getElementById("modal-likes").innerText = project.num_likes || 0;

    // Load comments
    loadComments(project.project_id);
    
    // Show modal with animation
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("shown"), 10);

    // Add event listener for clicking outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector("#modal");
    modal.classList.remove("shown");
    setTimeout(() => modal.style.display = "none", 300); // Wait for animation
}

async function likeProject(projectId) {
    try {
        const updatedProject = await window.fetchData(`/project/like/${projectId}`, {}, 'POST');
        document.getElementById("modal-likes").innerText = updatedProject.num_likes;
    } catch (error) {
        console.error("Error liking project:", error.message);
        showError("Failed to like project. Please try again.");
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
    
    const main = document.querySelector('main');
    main.insertBefore(errorDiv, main.firstChild);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

// Close modal when pressing escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
