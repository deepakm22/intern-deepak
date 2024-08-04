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
        if (Object.prototype.hasOwnProperty.call(products, key)) {
            const product = products[key];

            const productCard = document.createElement('section');
            productCard.className = 'product1';

            productCard.innerHTML = `
                <div class="pro-container">
                    <div class="pro">         
                        <img src="${product.url}" alt="${product.productName}">
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
                        </div>
                        <a  class="special-link" >
                            <i class="fa-solid fa-cart-plus"></i> 
                        </a>
                    </div>
                </div>
            `;

            container.appendChild(productCard);
        }
    }
}

window.onload = fetchProducts;
