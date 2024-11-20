document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(`Login attempt for user: ${username}`);

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result.success) {
        console.log(`Login successful for user: ${username}`);
        window.location.href = '../html/project.html';
    } else {
        console.error(`Login failed for user: ${username}`);
        alert('Invalid login credentials');
    }
});