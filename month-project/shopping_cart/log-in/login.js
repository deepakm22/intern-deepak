document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const RedirectTo = new URLSearchParams(window.location.search).get('redirectTo');

        if (isAdmin) {
            window.location.href = RedirectTo || "/month-project/shopping_cart/admin_page";
        } else {
            window.location.href = RedirectTo || "../home/";
        }
        return; 
    }

    const button = document.getElementById('submit');

    button.addEventListener('click', async (event) => {
        event.preventDefault();

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
                console.log('Login successful for user:', user);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isAdmin', user.isAdmin);
                localStorage.setItem('isLoggedIn', 'true');

                localStorage.setItem('userId', user.userId); 

                const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
                if (redirectAfterLogin) {
                    localStorage.removeItem('redirectAfterLogin');  
                    window.location.href = redirectAfterLogin;
                } else {
                    const RedirectTo = new URLSearchParams(window.location.search).get('redirectTo');
                    if (user.isAdmin) {
                        window.location.href = RedirectTo || "/month-project/shopping_cart/admin_page";
                    } else {
                        window.location.href = RedirectTo || "../home/";
                    }
                }
            } else {
                alert('This user is not available, please sign up first.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
