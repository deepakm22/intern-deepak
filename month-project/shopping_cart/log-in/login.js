document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit');

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get the values from the form
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        const url = "https://shopping-cart-912ad-default-rtdb.firebaseio.com/signup.json";

        try {
            const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const users = await response.json();
            const user = Object.values(users).find(user => user.Email === email && user.Password === password);

            if (user) {
                window.location.href = "/month-project/shopping_cart/home"; // Replace with your actual redirect URL
            } else {
                alert('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});






// const button = document.getElementById('submit');

// const validateForm = async () => {

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert('Please enter a valid email address.');
//         return false;
//     }

//     if (password.length < 6) {
//         alert('Password must be at least 6 characters long.');
//         return false;
//     }

//             return true;

// };

// button.addEventListener('click', validateForm);
