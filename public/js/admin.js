async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: methodType !== 'GET' ? JSON.stringify(data) : undefined
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is admin
    checkAdminStatus();
    
    // Initialize event listeners
    loadUsers();
    document.getElementById("project-form").addEventListener("submit", createProject);
    document.getElementById("search-form").addEventListener("submit", searchUsers);
});

async function checkAdminStatus() {
    try {
        const response = await fetchData('/admin/check', {}, 'GET');
        if (!response.isAdmin) {
            window.location.href = '../html/index.html';
        }
    } catch (error) {
        console.error("Admin check failed:", error.message);
        window.location.href = '../html/index.html';
    }
}

async function loadUsers() {
    try {
        const users = await fetchData('/user', {}, 'GET');
        const userList = document.getElementById("user-list");
        userList.innerHTML = "";

        users.forEach((user) => {
            const li = document.createElement("li");
            
            const userInfo = document.createElement("div");
            userInfo.className = "user-info";
            userInfo.textContent = `${user.full_name} (${user.username}) - ${user.email}`;
            
            const actions = document.createElement("div");
            actions.className = "user-actions";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteUser(user.user_id));

            const editBtn = document.createElement("button");
            editBtn.className = "edit";
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editUser(user));

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(userInfo);
            li.appendChild(actions);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading users:", error.message);
        showError('user-management', error.message);
    }
}

async function createProject(e) {
    e.preventDefault();
    const projectError = document.getElementById("project-error");
    
    try {
        const projectData = {
            title: document.getElementById("project-title").value,
            description: document.getElementById("project-description").value,
            technologies_used: document.getElementById("technologies-used").value,
            github_link: document.getElementById("github-link").value,
            demo_url: document.getElementById("demo-url").value,
            date_created: new Date().toISOString()
        };

        await fetchData('/admin/project/create', projectData, 'POST');
        showSuccess('project-creation', 'Project created successfully!');
        e.target.reset(); // Clear form
    } catch (error) {
        console.error("Error creating project:", error.message);
        showError('project-creation', error.message);
    }
}

async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    
    try {
        await fetchData(`/user/${userId}`, {}, 'DELETE');
        showSuccess('user-management', 'User deleted successfully!');
        loadUsers();
    } catch (error) {
        console.error("Error deleting user:", error.message);
        showError('user-management', error.message);
    }
}

async function editUser(user) {
    const newFullName = prompt("Enter new full name:", user.full_name);
    const newEmail = prompt("Enter new email:", user.email);

    if (newFullName && newEmail) {
        try {
            await fetchData('/user/update', {
                user_id: user.user_id,
                full_name: newFullName,
                email: newEmail
            }, 'PUT');
            showSuccess('user-management', 'User updated successfully!');
            loadUsers();
        } catch (error) {
            console.error("Error updating user:", error.message);
            showError('user-management', error.message);
        }
    }
}

async function searchUsers(e) {
    e.preventDefault();
    const query = document.getElementById("search-query").value;

    try {
        const users = await fetchData(`/user/search?query=${query}`, {}, 'GET');
        const userList = document.getElementById("user-list");
        userList.innerHTML = "";

        if (users.length === 0) {
            showInfo('user-management', 'No users found matching your search.');
            return;
        }

        users.forEach((user) => {
            const li = document.createElement("li");
            
            const userInfo = document.createElement("div");
            userInfo.className = "user-info";
            userInfo.textContent = `${user.full_name} (${user.username}) - ${user.email}`;
            
            const actions = document.createElement("div");
            actions.className = "user-actions";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteUser(user.user_id));

            const editBtn = document.createElement("button");
            editBtn.className = "edit";
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editUser(user));

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(userInfo);
            li.appendChild(actions);
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error searching users:", error.message);
        showError('user-management', error.message);
    }
}

// Helper functions for showing messages
function showError(section, message) {
    const errorDiv = document.getElementById(`${section}-error`);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
}

function showSuccess(section, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.getElementById(section).insertBefore(successDiv, document.getElementById(section).firstChild);
    setTimeout(() => successDiv.remove(), 5000);
}

function showInfo(section, message) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-message';
    infoDiv.textContent = message;
    document.getElementById(section).insertBefore(infoDiv, document.getElementById(section).firstChild);
    setTimeout(() => infoDiv.remove(), 5000);
}
