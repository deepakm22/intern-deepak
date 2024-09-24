// shop.js
import { fetchProducts } from './api.js';
import { displayProducts } from './product.js';
import { setupSearch } from './search.js';

window.onload = async () => {
    const allProducts = await fetchProducts();
    displayProducts(allProducts);
    setupSearch(allProducts);
};
