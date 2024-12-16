// Common authentication functions
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for session cookies
        body: methodType !== 'GET' ? JSON.stringify(data) : undefined
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

async function checkAuth() {
    const userType = localStorage.getItem('userType');
    const adminLink = document.getElementById('admin-link');
    const loginLinks = document.querySelectorAll('a[href*="login.html"], a[href*="register.html"]');
    const logoutLink = document.querySelector('a[href="javascript:handleLogout()"]');
    
    try {
        // Check admin status with server if user claims to be admin
        if (userType === 'admin') {
            const response = await fetchData('/admin/check', {}, 'GET');
            if (!response.isAdmin) {
                console.log('Admin session expired, logging out');
                await handleLogout();
                return;
            }
        }

        // Update UI based on auth status
        if (adminLink) {
            if (userType === 'admin') {
                adminLink.classList.add('visible');
                adminLink.style.display = 'inline';
            } else {
                adminLink.classList.remove('visible');
                adminLink.style.display = 'none';
            }
        }

        // Update login/logout visibility
        if (userType) {
            // User is logged in
            loginLinks.forEach(link => link.style.display = 'none');
            if (logoutLink) logoutLink.style.display = 'inline';
        } else {
            // User is not logged in
            loginLinks.forEach(link => link.style.display = 'inline');
            if (logoutLink) logoutLink.style.display = 'none';
        }

        // Protect admin page
        if (window.location.pathname.includes('admin.html') && userType !== 'admin') {
            console.log('Unauthorized access to admin page, redirecting');
            window.location.href = '../html/index.html';
        }

    } catch (error) {
        console.error('Auth check failed:', error);
        // If authentication error, log out
        if (error.message.includes('Authentication required') || 
            error.message.includes('Admin access required')) {
            console.log('Session expired, logging out');
            await handleLogout();
        }
    }
}

async function handleLogout() {
    try {
        await fetchData('/admin/logout', {}, 'GET');
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear local storage and redirect
        localStorage.removeItem('userType');
        window.location.href = '../html/index.html';
    }
}

// Initialize auth check when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Add fade effect to navigation links
    const fadeLinks = document.querySelector('.fade-links');
    if (fadeLinks) {
        setTimeout(() => {
            fadeLinks.style.opacity = '1';
        }, 500);
    }
});

// Periodically check auth status
const AUTH_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
setInterval(checkAuth, AUTH_CHECK_INTERVAL);

// Export functions for use in other scripts
window.handleLogout = handleLogout;
window.checkAuth = checkAuth;
window.fetchData = fetchData;

// Handle network errors
window.addEventListener('offline', () => {
    console.log('Network connection lost');
});

window.addEventListener('online', () => {
    console.log('Network connection restored, checking auth status');
    checkAuth();
});
