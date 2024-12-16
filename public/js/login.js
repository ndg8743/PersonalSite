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

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        const result = await fetchData('/user/login', { username, password }, 'POST');
        if (result.success) {
            console.log(`Login successful for user: ${username}`);
            // Store user type in localStorage for other pages to use
            localStorage.setItem('userType', result.userType);
            // Redirect based on user type
            if (result.userType === 'admin') {
                window.location.href = '../html/admin.html';
            } else {
                window.location.href = '../html/project.html';
            }
        }
    } catch (error) {
        console.error(`Login failed for user: ${username}:`, error.message);
        errorDiv.textContent = error.message || 'Invalid login credentials';
        errorDiv.style.display = 'block';
    }
});

// Function to check admin status and show/hide admin link
function updateAdminVisibility() {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        const userType = localStorage.getItem('userType');
        if (userType === 'admin') {
            adminLink.classList.add('visible');
        } else {
            adminLink.classList.remove('visible');
        }
    }
}

// Check admin status when page loads
document.addEventListener('DOMContentLoaded', updateAdminVisibility);
