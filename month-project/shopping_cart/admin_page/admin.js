document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const productDescription = document.getElementById('productDescription').value;
    const upload_image = document.getElementById('upload-image').dataset.url;
    
    if (productName === '' || price === '' || productDescription === '') {
        alert('Please fill in all fields.');
        return false;
    }

    if (!upload_image) {
        alert('Please upload a file.');
        return;
    }

    try {
        const productURL = 'https://shopping-cart-912ad-default-rtdb.firebaseio.com/product.json';
        
        const response = await fetch(productURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: upload_image,
                productName,
                productDescription,
                price
            })
        });

        if (response.ok) {
            alert('Product added successfully');
        } else {
            alert('Error occurred while adding the product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product');
    }
});

function getFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
            document.getElementById('upload-image').dataset.url = reader.result;
        };

        reader.readAsDataURL(file);
    }
}

document.getElementById('fileInput').addEventListener('change', getFile);
