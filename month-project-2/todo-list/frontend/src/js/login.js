document.addEventListener('DOMContentLoaded', function () {

    if(localStorage.getItem('userToken')){
        window.location.href = 'index.html'
    }else{

    const loginForm = document.getElementById('loginForm');
    const modalMessage = document.getElementById('modalMessage');
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            const result = await response.json();

            if (response.ok) {
                if (result.token) {
                    localStorage.setItem('userToken', result.token);
                    localStorage.setItem('username', result.username);
                    modalMessage.textContent = result.message || 'Login successful';
                    messageModal.show();
                    setTimeout(() => {
                        window.location.href = 'index.html'; 
                    }, 1500); 
                } else {
                    modalMessage.textContent = result.message || 'Invalid user';
                    messageModal.show();
                }
            } else {
                modalMessage.textContent = 'Login failed';
                messageModal.show();
            }
        } catch (error) {
            console.error('Error:', error);
            modalMessage.textContent = 'An unexpected error occurred. Please try again later.';
            messageModal.show();
        }
    });
}
});
