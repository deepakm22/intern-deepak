document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = Object.fromEntries(formData);

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const result = await response.json();
        const modalMessage = document.getElementById('modalMessage');
        const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));

        if (response.ok) {
            modalMessage.textContent = result.message || 'Registration successful';
            messageModal.show();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500); 
        } else {
            modalMessage.textContent = result.message || 'Registration failed';
            messageModal.show();
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('modalMessage').textContent = 'An unexpected error occurred. Please try again later.';
        new bootstrap.Modal(document.getElementById('messageModal')).show();
    }
});
