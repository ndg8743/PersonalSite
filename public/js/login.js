// Function to handle user login
async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // Try admin login first
        const adminResponse = await fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (adminResponse.ok) {
            const data = await adminResponse.json();
            if (data.success) {
                // Admin login successful
                if (typeof window.updateNavbar === 'function') {
                    await window.updateNavbar();
                    // Small delay to ensure navbar updates before redirect
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 100);
                } else {
                    window.location.href = '/';
                }
                return;
            }
        }

        // If admin login fails, try regular user login
        const userResponse = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (userResponse.ok) {
            const data = await userResponse.json();
            if (data.success) {
                // User login successful
                if (typeof window.updateNavbar === 'function') {
                    await window.updateNavbar();
                    // Small delay to ensure navbar updates before redirect
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 100);
                } else {
                    window.location.href = '/';
                }
            } else {
                alert('Invalid username or password');
            }
        } else {
            alert('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login');
    }
}

// Attach event listener to the login form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});
