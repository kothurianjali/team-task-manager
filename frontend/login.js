async function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(
        'https://team-task-manager-4-qcu4.onrender.com/api/auth/login',
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (data.token) {

        localStorage.setItem(
            'token',
            data.token
        );

        localStorage.setItem(
            'role',
            data.role || 'User'
        );

        alert('Login Successful');

        window.location = 'dashboard.html';

    } else {

        alert(data.message);
    }
}