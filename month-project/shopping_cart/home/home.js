document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const userEmailElement = document.getElementById('user-email');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {
        loginLink.style.display = 'none';   
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block';
        userEmailElement.style.display = 'block';
        userEmailElement.textContent = userEmail;
    }

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        window.location.href = '../home/';
    });
});


const fb = document.getElementById("fb")
const insta = document.getElementById("insta")
const twiter = document.getElementById("twiter")
const ytube = document.getElementById("ytube")

fb.addEventListener('click', () => {
    window.location.href = "https://www.facebook.com/"
})

insta.addEventListener('click', () => {
    window.location.href = "https://www.instagram.com/"
})

twiter.addEventListener('click', () => {
    window.location.href = "https://twitter.com/"
})

ytube.addEventListener('click', () => {
    window.location.href = "https://www.youtube.com/"
})