window.onload = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = '/month-project/shopping_cart/log-in/index.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
        alert('Product ID not found.');
    }
};

async function fetchProductDetails(productId) {
    try {
        const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
        console.log('Fetching product details from:', productURL);

        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const product = await response.json();
    
        console.log('Fetched product:', product);
        displayProduct(product, productId);

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
            <i class="fa-solid fa-xmark" id="cancel" onclick="goBackToShop()"></i>
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

                <div class="size-options">
                    <span>Select Size:</span>
                    <div class="size-buttons">
                        <button class="size-btn" onclick="selectSize('S')">S</button>
                        <button class="size-btn" onclick="selectSize('L')">L</button>
                        <button class="size-btn" onclick="selectSize('XL')">XL</button>
                        <button class="size-btn" onclick="selectSize('XXL')">XXL</button>
                    </div>
                </div>

                <div class="quantity-controls">
                    <button id="decrease-btn" onclick="decreaseQuantity()">-</button>
                    <input type="number" id="quantity" value="1" min="1" readonly>
                    <button id="increase-btn" onclick="increaseQuantity()">+</button>
                </div>

                <button id="add-btn" onclick="addToCart('${key}')">Add to Cart</button>
                <button id="buy-btn" onclick="buyNow('${key}')" id="buy-now">Buy Now</button>
            </div>
        </div>
    `;
}

function selectSize(size) {
    localStorage.setItem('selectedSize', size);
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCart(key) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        alert('Item added to cart!');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(key);
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        const currentUrl = window.location.href;
        localStorage.setItem('redirectAfterLogin', currentUrl);

        window.location.href = '/month-project/shopping_cart/log-in/index.html';
    }
}

function buyNow(key) {

    localStorage.setItem('selectedProductKey', key);

    window.location.href = 'payment.html';
}


function goBackToShop() {
    window.location.href = '/month-project/shopping_cart/shop/';
}

