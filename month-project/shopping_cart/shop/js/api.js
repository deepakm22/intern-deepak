// api.js
export async function fetchProducts() {
    try {
        const productURL = 'https://shopping-cart-912ad-default-rtdb.firebaseio.com/products.json';
        const response = await fetch(productURL);
        if (!response.ok) throw new Error('Fetching Failed');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products');
        return {};
    }
}

export async function fetchProductDetails(productId) {
    try {
        const productURL = `https://shopping-cart-912ad-default-rtdb.firebaseio.com/products/${productId}.json`;
        const response = await fetch(productURL);
        if (!response.ok) throw new Error('Fetching Failed');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to fetch product');
        return null;
    }
}
