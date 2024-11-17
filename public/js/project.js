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

/*function createProject() {
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
*/
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
document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    document.getElementById("project-form").addEventListener("submit", createProject);
});

async function loadUsers() {
    try {
        const response = await fetch('/user');
        const users = await response.json();
        const userList = document.getElementById("user-list");

        userList.innerHTML = "";
        users.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = `${user.full_name} (${user.username})`;
            userList.appendChild(li);
        });
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
        const response = await fetch('/project/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData),
        });
        if (response.ok) alert("Project created successfully!");
    } catch (error) {
        console.error("Error creating project:", error);
    }
}
