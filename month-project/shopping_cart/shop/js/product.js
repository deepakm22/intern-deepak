// product.js
export function displayProducts(products) {
    const container = document.getElementById('product1');
    container.innerHTML = '';

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
