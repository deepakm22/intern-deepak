const validateForm = () => {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var conform_password = document.getElementById('conform_password').value;

    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || conform_password.trim() === '') {
        alert('Please fill in all fields.');
        return false;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }
    if (password !== conform_password) {
        alert('Password does not match.');
        return false;
    }

    const user = {
        Username: username,
        Email: email,
        Password: password,
        Conform_password: conform_password,
        isAdmin: false
    };

    const url = "https://shopping-cart-912ad-default-rtdb.firebaseio.com/signup.json";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Sign-up Successfully');
        window.location.href = "../home/"; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while signing up. Please try again later.');
    });

    return true;
};

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('form');

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            signUpForm.reset();
        }
    });
});
