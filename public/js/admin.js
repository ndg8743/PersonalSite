const isAdmin = true; // Replace with real authentication check

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
