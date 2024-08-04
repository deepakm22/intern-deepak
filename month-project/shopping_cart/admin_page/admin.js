document.getElementById('adminForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = document.getElementById('productId').value; 
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
            productURL += `/${productId}.json`;
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
            if (productId) {
                alert('Product updated successfully');
            } else {
                alert('Product added successfully');
            }
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

// display 

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

// Display 

function displayProducts(products) {
    const container = document.getElementById('product1');
    container.innerHTML = '';

    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const product = products[key];

            const productCard = document.createElement('div');
            productCard.className = 'productCard';

            productCard.innerHTML = `
                <img src="${product.url}" alt="${product.productName}">
                <div class="des">
                    <h3>${product.productName}</h3>
                    <h3>${product.productDescription}</h3>

                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>Rs ${product.price}</h4>
                    <button onclick="editProduct('${key}')">Edit</button>
                    <button onclick="deleteProduct('${key}')">Delete</button>
                </div>
            `;

            container.appendChild(productCard);
        }
    }
}

// Edit

function editProduct(productId) {
    const product = products[productId]; 
    if (product) {
        document.getElementById('productId').value = productId;
        document.getElementById('productName').value = product.productName;
        document.getElementById('price').value = product.price;
        document.getElementById('productDescription').value = product.productDescription;
        document.getElementById('upload-image').dataset.url = product.url;
    } else {
        console.error('Product not found:', productId);
        alert('Product not found. Please try again.');
    }
}

//  Delete 
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
