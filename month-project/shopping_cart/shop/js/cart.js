import { fetchProductDetails } from './api.js';

export function addToCart(key) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        alert('Item added to cart!');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(key);
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        const currentUrl = window.location.href;
        localStorage.setItem('redirectAfterLogin', currentUrl);
        window.location.href = '../log-in/';
    }
}

export function buyNow(key) {
    localStorage.setItem('selectedProductKey', key);
    window.location.href = 'payment.html';
}

export function goBackToShop() {
    window.location.href = '../shop/';
}

window.onload = () => {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.getElementById('total-price');
    const placeOrderButton = document.getElementById('place-order');

    const updateCartDisplay = async () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty!</p>';
            totalPriceContainer.innerText = 'Total Price: Rs 0';
            placeOrderButton.style.display = 'none';
        } else {
            for (let productId of cart) {
                const product = await fetchProductDetails(productId);
                if (product) {
                    const productPrice = Number(product.price) || 0; 
                    totalPrice += productPrice;

                    cartContainer.innerHTML += `
                        <div class="row">
                            <div class="col-md-12">
                                <div class="cart-item d-flex">
                                    <img src="${product.url}" alt="${product.productName}">
                                    <div class="cart-item-info">
                                        <h4>${product.productName}</h4>
                                        <p>${product.productDescription}</p>
                                        <p>Size: ${localStorage.getItem('selectedSize') || 'Not Selected'}</p>
                                        <p>Rs ${product.price}</p>
                                        <button class="remove-btn" data-product-id="${productId}">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }

            totalPriceContainer.innerText = `Total Price: Rs ${totalPrice}`;
            placeOrderButton.style.display = 'block';
        }
    };

    const removeProductFromCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product !== productId); 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        console.log('Updated Cart:', cart); 
    };

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            removeProductFromCart(productId); 
            updateCartDisplay(); 
        }
    });

    placeOrderButton.addEventListener('click', () => {
        alert('Order placed successfully!');
        localStorage.removeItem('cart'); 
        updateCartDisplay(); 
    });

    updateCartDisplay(); 
};
