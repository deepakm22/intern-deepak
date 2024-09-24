// search.js
import { displayProducts } from './product.js';

export function setupSearch(allProducts) {
    const searchForm = document.getElementById('search-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const searchInput = document.getElementById('search-input');
            if (searchInput) { 
                const searchValue = searchInput.value.toLowerCase();
                
                const filteredProducts = filterProducts(allProducts, searchValue);
                displayProducts(filteredProducts);
            }
        });
    }
}

function filterProducts(products, searchName) {
    const result = {};
    
    for (const key in products) {
        if (products.hasOwnProperty(key)) {
            const product = products[key];
            if (product.productName.toLowerCase().includes(searchName)) {
                result[key] = product;
            }
        }
    }
    
    return result;
}
