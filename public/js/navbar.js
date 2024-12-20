// Function to check if user is logged in and update navbar
async function updateNavbar() {
    try {
        // Check login status
        const loginResponse = await fetch('/user/check-login');
        const loginData = await loginResponse.json();
        
        // Check admin status
        const adminResponse = await fetch('/admin/check');
        const adminData = await adminResponse.json();
        
        const nav = document.querySelector('nav.fade-links');
        if (!nav) return;

        // Clear existing navigation
        nav.innerHTML = '';

        if (loginData.isLoggedIn) {
            // User is logged in
            nav.innerHTML = '<a href="../html/project.html">Projects</a>';

            // Add admin link if user is admin
            if (adminData.isAdmin) {
                nav.innerHTML += ' | <a href="../html/admin.html">Admin</a>';
            }

            // Add logout link
            nav.innerHTML += ' | <a href="/admin/logout">Logout</a>';
        } else {
            // User is not logged in
            nav.innerHTML = `
                <a href="../html/register.html">Register</a> |
                <a href="../html/login.html">Login</a> |
                <a href="../html/project.html">Projects</a>
            `;
        }
    } catch (error) {
        console.error('Error updating navbar:', error);
    }
}

// Call updateNavbar when the page loads
document.addEventListener('DOMContentLoaded', updateNavbar);

// Also update navbar when user logs in/out
window.updateNavbar = updateNavbar;
