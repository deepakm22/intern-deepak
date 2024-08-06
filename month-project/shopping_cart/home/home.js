document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const userEmailElement = document.getElementById('user-email');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'block';
        userEmailElement.style.display = 'block';
        userEmailElement.textContent = userEmail;
    }

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        window.location.href = '../home/';
    });
});

function renderSearchResults(items) {
    searchResults.innerHTML = '';
    items.forEach(item => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('search-result-card');
        resultCard.dataset.id = item.id;
        resultCard.innerHTML = `
            <img src="${item.imageUrl || 'default-image.jpg'}" alt="${item.name}">
            <h4>${item.name}</h4>
        `;
        resultCard.addEventListener('click', () => {
            window.location.href = `result.html?query=${encodeURIComponent(item.name)}`;
        });
        searchResults.appendChild(resultCard);
    });
    searchResults.classList.remove('hidden');
}

async function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase();
    if (searchTerm) {
        console.log('Search term:', searchTerm);
        const items = await getFromDatabase('items');
        if (items) {
            const filteredItems = Object.values(items).filter(item => item.name.toLowerCase().includes(searchTerm));
            console.log('Filtered items:', filteredItems);

            // Sort by relevance (length of the match could be a heuristic)
            filteredItems.sort((a, b) => b.name.toLowerCase().indexOf(searchTerm) - a.name.toLowerCase().indexOf(searchTerm));

            renderSearchResults(filteredItems);
        }
    } else {
        searchResults.innerHTML = '';
        searchResults.classList.add('hidden');
    }
}

searchBar.addEventListener('input', handleSearch);
