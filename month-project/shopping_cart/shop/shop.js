
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
    console.log(products);

    for (const key in products) {
        if (products.hasOwnProperty(key)) {
        const product = products[key];
        
        const productCard = document.createElement('div');
        productCard.className = 'pro';
        productCard.setAttribute('data-key', key)
        
        productCard.innerHTML = `
        <img src="${product.url}" alt="${product.productName}" >
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
        
        `;
        
        
            productCard.addEventListener('click', () => {
                // const productId = product.productId;

            window.location.href = `item.html?product=${key}`;
            });

            container.appendChild(productCard);
        }
    }
}



window.onload = fetchProducts();
    