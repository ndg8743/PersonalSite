const isAdmin = true; // Replace with real authentication check

document.addEventListener("DOMContentLoaded", () => {
    const createProjectBtn = document.getElementById("create-project-btn");

    // Show create project button if admin
    if (isAdmin) {
        createProjectBtn.style.display = "block";
        createProjectBtn.addEventListener("click", () => {
            createProject();
        });
    }

    // Fetch and display project details
    fetchProjectDetails();
});

function createProject() {
    const projectData = {
        title: prompt("Enter project title:"),
        description: prompt("Enter project description:"),
        images: [] // You can extend this to allow image uploads
    };

    fetch('/project/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
    })
        .then(res => res.json())
        .then(data => {
            alert("Project created successfully!");
            fetchProjectDetails(); // Refresh project details
        })
        .catch(err => console.error("Error creating project:", err));
}

function fetchProjectDetails() {
    fetch('/project/details')
        .then(res => res.json())
        .then(data => {
            document.getElementById("project-title").textContent = data.title;
            document.getElementById("project-description").textContent = data.description;

            const imagesContainer = document.getElementById("project-images");
            imagesContainer.innerHTML = "";
            data.images.forEach((imageUrl) => {
                const img = document.createElement("img");
                img.src = imageUrl;
                imagesContainer.appendChild(img);
            });
        })
        .catch(err => console.error("Error fetching project details:", err));
}
