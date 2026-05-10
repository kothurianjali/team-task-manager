async function signup() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch(
        'http://localhost:5000/api/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                role
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    window.location = 'index.html';
}