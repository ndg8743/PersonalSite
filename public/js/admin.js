document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
    document.getElementById("project-form").addEventListener("submit", createProject);
    document.getElementById("search-form").addEventListener("submit", searchUsers);
});

async function loadUsers() {
    try {
        const response = await fetch('/user');
        const users = await response.json();
        const userList = document.getElementById("user-list");

        // Clear the user list
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }

        users.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = `${user.full_name} (${user.username})`;

            const deleteUserButton = document.createElement("button");
            deleteUserButton.textContent = "Delete";
            deleteUserButton.addEventListener("click", () => deleteUser(user.user_id));

            const editUserButton = document.createElement("button");
            editUserButton.textContent = "Edit";
            editUserButton.addEventListener("click", () => editUser(user));

            li.appendChild(deleteUserButton);
            li.appendChild(editUserButton);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading users:", error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/user/${userId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            loadUsers();
        } else {
            console.error("Error deleting user");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

async function editUser(user) {
    const newFullName = prompt("Enter new full name:", user.full_name);
    const newEmail = prompt("Enter new email:", user.email);

    if (newFullName && newEmail) {
        const updatedUser = {
            user_id: user.user_id,
            full_name: newFullName,
            email: newEmail
        };

        try {
            const response = await fetch('/user/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });
            if (response.ok) {
                loadUsers();
            } else {
                console.error("Error updating user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
}

async function createProject(e) {
    e.preventDefault();
    const projectData = {
        title: document.getElementById("project-title").value,
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

async function searchUsers(e) {
    e.preventDefault();
    const query = document.getElementById("search-query").value;

    try {
        const response = await fetch(`/user/search?query=${query}`);
        const users = await response.json();
        const userList = document.getElementById("user-list");

        // Clear the user list
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }

        users.forEach((user) => {
            const li = document.createElement("li");
            li.textContent = `${user.full_name} (${user.username})`;

            const deleteUserButton = document.createElement("button");
            deleteUserButton.textContent = "Delete";
            deleteUserButton.addEventListener("click", () => deleteUser(user.user_id));

            const editUserButton = document.createElement("button");
            editUserButton.textContent = "Edit";
            editUserButton.addEventListener("click", () => editUser(user));

            li.appendChild(deleteUserButton);
            li.appendChild(editUserButton);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error searching users:", error);
    }
}