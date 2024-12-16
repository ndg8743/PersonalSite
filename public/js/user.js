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

// Define the User object with methods for login and logout
const user = {
    username: "",
    password: "",
    email: "",
    id: 0,
    loggedIn: false,
    login: function() {
        console.log(`User logged in: ${this.username}`);
        this.loggedIn = true;
    },
    logout: function() {
        console.log(`User logged out: ${this.username}`);
        this.loggedIn = false;
    }
};

async function registerUser(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const fullName = document.getElementById("fullName").value;
    const errorDiv = document.getElementById("register-error");

    // Create a user object to send to the server
    const newUser = {
        username: username,
        password: password,
        email: email,
        full_name: fullName,
    };

    try {
        const data = await fetchData('/user/register', newUser, 'POST');
        errorDiv.style.display = 'none';
        alert(data.message); // Show success message
        window.location.href = "../html/login.html"; // Redirect to login page
    } catch (error) {
        console.error("Error registering user:", error.message);
        errorDiv.textContent = error.message || "An unexpected error occurred. Please try again.";
        errorDiv.style.display = 'block';
    }
}

async function loginUser(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    console.log(`Login attempt for user: ${username}`);

    // Create a user object to send to the server
    const loginData = {
        username: username,
        password: password
    };

    try {
        const data = await fetchData('/user/login', loginData, 'POST');
        errorDiv.style.display = 'none';
        user.username = data.username;
        user.id = data.id;
        user.login();
        window.location.href = "../html/project.html"; // Redirect to projects page after successful login
    } catch (error) {
        console.error('Error logging in user:', error.message);
        errorDiv.textContent = error.message || "Invalid login credentials";
        errorDiv.style.display = 'block';
    }
}

// Attach event listeners to forms if they exist
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", registerUser);
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
}
