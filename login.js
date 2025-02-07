document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Ensure fields are not empty
    if (!email || !password) {
        alert('Please fill all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store userName and userId in localStorage
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('userId', data.userId);
            alert('Login successful!');
            window.location.href = 'farmer_community.html';  // Redirect to community page
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});
