window.onload = () => {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPriceContainer = document.getElementById('total-price');
    const placeOrderButton = document.getElementById('place-order');

    console.log('Cart contents:', cart);

    const fetchProductDetails = async (productId) => {
        try {
            const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
            const response = await fetch(productURL);

            if (!response.ok) {
                throw new Error('Fetching Failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    };

    const updateCartDisplay = async () => {
        cartContainer.innerHTML = '';
        let totalPrice = 0; // Ensure this is a number

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty!</p>';
            totalPriceContainer.innerText = 'Total Price: Rs 0';
            placeOrderButton.style.display = 'none';
        } else {
            for (let productId of cart) {
                console.log('Processing productId:', productId);

                if (typeof productId === 'object' && productId !== null) {
                    productId = productId.id || '';
                }

                if (!productId) {
                    console.warn('Skipping invalid productId:', productId);
                    continue;
                }

                const product = await fetchProductDetails(productId);
                if (product) {
                    // Convert price to a number to ensure proper calculation
                    const productPrice = Number(product.price) || 0; // Default to 0 if conversion fails
                    totalPrice += productPrice;

                    cartContainer.innerHTML += `
                        <div class="row">
                            <div class="col-md-12">
                                <div class="cart-item d-flex" data-product-id="${productId}">
                                    <img src="${product.url}" alt="${product.productName}">
                                    <div>
                                        <h5>${product.productName}</h5>
                                        <p>Rs ${productPrice}</p>
                                        <div class="cart-item-actions">
                                            <button class="remove-btn" data-product-id="${productId}">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    console.warn(`Product not found for ID: ${productId}`);
                }
            }
            totalPriceContainer.innerText = `Total Price: Rs ${totalPrice}`;
            placeOrderButton.style.display = 'block';
        }
    };

    const removeProductFromCart = (productId) => {
        productId = String(productId);
        cart = cart.filter(product => String(product) !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    };

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-product-id');
            removeProductFromCart(productId);
        }
    });

    placeOrderButton.addEventListener('click', () => {
        alert('Order placed successfully!');
    });

    updateCartDisplay();
};
