async function fetchProductDetails(productId) {
    try {
        const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
        console.log('Fetching product details from:', productURL); // Logging the URL

        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const product = await response.json();
    
        console.log('Fetched product:', product); // Logging the fetched product
        displayProduct(product, productId); // Pass the productId as the key

    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product');
    }
}
function displayProduct(product, key) {
    const container = document.getElementById('product1');

    container.innerHTML = `
        <div class="pro-container" data-product-id="${key}">
            <div class="image-container">
                <img src="${product.url}" alt="${product.productName}">
            </div>
            <div class="des">
                <span>${product.productName}</span>
                <h5>${product.productDescription}</h5>

                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>Rs ${product.price}</h4>
                <button id="add-btn" onclick="addToCart('${key}')">Add to Cart</button>
                <button id="buy-btn" onclick="buyNow('${key}')" id="delete">Buy Now</button>
            </div>
        </div>
    `;
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
        alert('Product ID not found.');
    }
};

// Function to check if the user is logged in
function isLoggedIn() {
    // Assuming you store a token or user info in localStorage when the user logs in
    return !!localStorage.getItem('userToken');
}

function addToCart(productId) {
    if (!isLoggedIn()) {
        alert('You must be logged in to add products to the cart.');
        window.location.href = '/month-project/shopping_cart/log-in/'; 
        return;
    }

    const productContainer = document.querySelector(`.pro-container[data-product-id="${productId}"]`);
    
    if (productContainer) {
        const productName = productContainer.querySelector('span').innerText;
        const productPrice = productContainer.querySelector('h4').innerText.replace('Rs ', '');
        const productImageUrl = productContainer.querySelector('img').src;

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImageUrl,
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart!');
    }
}
