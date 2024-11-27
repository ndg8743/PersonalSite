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

function registerUser(event) {
  event.preventDefault(); // Prevent form from submitting traditionally

  // Get form values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  const fullName = document.getElementById("fullName").value;

  // Create a user object to send to the server
  const newUser = {
    username: username,
    password: password,
    email: email,
    full_name: fullName,
  };

  // Send the user data to the server
  fetch("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); // Show alert for duplicate username/email/full name
        return;
      }
      const data = await response.json();
      alert(data.message); // Show success message
      window.location.href = "/html/login.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      alert("An unexpected error occurred. Please try again.");
    });
}

// Attach event listener to the registration form
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}


// Function to handle user login
function loginUser(event) {
  event.preventDefault(); // Prevent form from submitting traditionally

  // Get form values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  console.log(`Login attempt for user: ${username}`);

  // Create a user object to send to the server
  const loginData = {
    username: username,
    password: password
  };

  // Send login data to the server
  fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login successful:', data);
      user.username = data.username;
      user.id = data.id;
      user.login();
    })
    .catch(error => {
      console.error('Error logging in user:', error);
    });
}

// Attach event listener to the login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', loginUser);
}