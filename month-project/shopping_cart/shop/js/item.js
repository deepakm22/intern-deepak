// item.js
import { fetchProductDetails } from './api.js';
import { addToCart, buyNow, goBackToShop } from './cart.js';

window.addToCart = addToCart;
window.buyNow = buyNow;
window.goBackToShop = goBackToShop;

window.onload = async () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        window.location.href = '../log-in/';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId) {
        const product = await fetchProductDetails(productId);
        if (product) displayProduct(product, productId);
    } else {
        console.error('Product ID not found in URL');
        alert('Product ID not found.');
    }
};

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
                <button id="buy-btn" onclick="buyNow('${key}')">Buy Now</button>
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

