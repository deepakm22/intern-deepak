document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productIdElement = document.getElementById('productId');
    const productId = productIdElement ? productIdElement.value : null;
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
        let productURL = 'https://shopping-cart-912ad-default-rtdb.firebaseio.com/products.json';
        let method = 'POST';

        if (productId) {
            productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
            method = 'PUT';
        }

        const response = await fetch(productURL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: upload_image,
                productName: productName,
                productDescription: productDescription,
                price: price
            })
        });

        if (response.ok) {
            alert(productId ? 'Product updated successfully' : 'Product added successfully');
            document.getElementById('adminForm').reset();
            fetchProducts();
        } else {
            alert('Error occurred while adding/updating the product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving product');
    }
});

// upload
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

document.getElementById('upload-image').addEventListener('change', getFile);


async function fetchProducts() {
    try {
        const productURL = 'https://shopping-cart-912ad-default-rtdb.firebaseio.com/products.json';
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products');
    }
}

function displayProducts(products) {
    const container = document.getElementById('product1');
    container.innerHTML = '';

    const productArray = Object.entries(products); 

    for (const [key, product] of productArray) {
        const productCard = document.createElement('div');
        productCard.className = 'productCard';

        productCard.innerHTML = `
            <img src="${product.url}" alt="${product.productName}">
            <div class="des">
                <h3>${product.productName}</h3>
                <p>${product.productDescription}</p>

                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>Rs ${product.price}</h4>
                <button onclick="editProduct('${key}')">Edit</button>
                <button onclick="deleteProduct('${key}')" id="delete">Delete</button>
            </div>
        `;

        container.prepend(productCard); 
    }
}

// Edit
window.editProduct = function(productId) {
    const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;

    fetch(productURL)
    .then(response => response.json())
    .then(product => {
        document.getElementById('productId').value = productId;
        document.getElementById('productName').value = product.productName;
        document.getElementById('productDescription').value = product.productDescription;
        document.getElementById('price').value = product.price;
        document.getElementById('upload-image').dataset.url = product.url;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.getElementById('btn-Submit').style.display = 'none';
        document.getElementById('btn-update').style.display = 'block';
    })
    .catch(error => console.error('Error fetching product:', error));
}

// Update product function
function updateProduct() {
    const productId = document.getElementById('productId').value;
    const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;

    const updatedProduct = {
        productName: document.getElementById('productName').value,
        productDescription: document.getElementById('productDescription').value,
        price: document.getElementById('price').value,
        url: document.getElementById('upload-image').dataset.url,
    };

    fetch(productURL, {
        method: 'PUT', 
        body: JSON.stringify(updatedProduct),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            console.log('Product updated successfully!');
            resetForm(); 
        } else {
            console.error('Error updating product:', response.statusText);
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('upload-image').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onloadend = function () {
            document.getElementById('upload-image').dataset.url = reader.result;
        };

        reader.readAsDataURL(file);
    }
});

function resetForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('price').value = '';
    document.getElementById('upload-image').dataset.url = '';
    document.getElementById('btn-Submit').style.display = 'block'; 
    document.getElementById('btn-update').style.display = 'none'; 
}

document.getElementById('btn-update').onclick = updateProduct;



// Delete
async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
            const response = await fetch(productURL, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Product deleted successfully');
                fetchProducts();
            } else {
                alert('Error occurred while deleting the product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting product');
        }
    }
}

window.onload = fetchProducts;

document.addEventListener('DOMContentLoaded', function() {


    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            console.log('Logout button clicked.');
            window.location.href = '/month-project/shopping_cart/home/';
                });
    }

    
});
