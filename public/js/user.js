// Define the User object with methods for login and logout
const user = {
    username: "",
    password: "",
    email: "",
    id: 0,
    loggedIn: false,
    login: function() {
      this.loggedIn = true;
    },
    logout: function() {
      this.loggedIn = false;
    }
  };
  
  // Function to handle user registration
  function registerUser(event) {
    event.preventDefault(); // Prevent form from submitting traditionally
  
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
  
    // Create a user object to send to the server
    const newUser = {
      username: username,
      password: password,
      email: email
    };
  
    // Send the user data to the server
    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Registration successful:', data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  }
  
  // Attach event listener to the registration form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
  }
  
  // Function to handle user login
  function loginUser(event) {
    event.preventDefault(); // Prevent form from submitting traditionally
  
    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
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
  