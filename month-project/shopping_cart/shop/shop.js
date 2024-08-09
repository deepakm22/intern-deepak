async function fetchProducts() {
    try {
        const productURL = 'https://shopping-cart-912ad-default-rtdb.firebaseio.com/products.json';
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error('Fetching Failed');
        }

        const products = await response.json();
        displayProducts(products);
        return products; // Return the fetched products
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products');
        return {}; // Return an empty object on error
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
            productCard.setAttribute('data-key', key);
            
            productCard.innerHTML = `
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
            `;
            
            productCard.addEventListener('click', () => {
                window.location.href = `item.html?product=${key}`;
            });

            container.appendChild(productCard);
        }
    }
}

const searchForm = document.getElementById('search-form');
let allProducts = {}; // Store all products for filtering

if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        const searchInput = document.getElementById('search-input');
        if (searchInput) { // Check if searchInput exists
            const searchValue = searchInput.value.toLowerCase();
            console.log('Search Input:', searchValue); // Debug log
            
            // Call filterProducts and display results
            const filteredProducts = filterProducts(allProducts, searchValue);
            displayProducts(filteredProducts);
            
            // Log the filtered results for debugging
            console.log('Filtered Products:', filteredProducts);
        } else {
            console.error('Search input not found');
        }
    });
}

function filterProducts(products, searchName) {
    const result = {};
    
    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const product = products[key];
            // Log each product name for debugging
            console.log('Checking product:', product.productName);

            if (product.productName.toLowerCase().includes(searchName)) {
                result[key] = product;
            }
        }
    }
    
    return result;
}

window.onload = async () => {
    allProducts = await fetchProducts(); // Store fetched products for filtering
    console.log('All Products Loaded:', allProducts); // Debug log to check products
};
