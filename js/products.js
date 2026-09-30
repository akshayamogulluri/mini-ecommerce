// js/products.js - Product Catalog & User-Scoped Add to Cart
const PRODUCTS_API = "/products";

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
    // Ensure user is logged in
    const currentUser = requireAuth();
    if (!currentUser) return;

    const productsContainer = document.getElementById("productsContainer");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortProducts = document.getElementById("sortProducts");

    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await axios.get(PRODUCTS_API);
            allProducts = response.data;

            if (categoryFilter) populateCategories();
            renderProducts(allProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
            if (productsContainer) {
                productsContainer.innerHTML = "<p>Failed to load products. Is JSON Server running?</p>";
            }
        }
    }

    function populateCategories() {
        const categories = ["all", ...new Set(allProducts.map(p => p.category))];
        categoryFilter.innerHTML = categories
            .map(c => `<option value="${c}">${c === "all" ? "All Categories" : c}</option>`)
            .join("");
    }

    function renderProducts(list) {
        if (!productsContainer) return;

        if (list.length === 0) {
            productsContainer.innerHTML = "<p>No electronic devices found matching your criteria.</p>";
            return;
        }

        productsContainer.innerHTML = list.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-wrap">
                    <img src="${product.image}" alt="${product.name}" class="product-card-image">
                    <span class="category-badge">${product.category}</span>
                </div>
                <div class="product-card-body">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">★★★★★</span>
                        <span class="rating-value">${product.rating}</span>
                    </div>
                    <p class="product-price">₹${Number(product.price).toLocaleString("en-IN")}</p>
                    <div class="product-buttons">
                        <button class="details-btn" onclick="viewDetails(${product.id})">Details</button>
                        <button class="add-to-cart-btn" onclick="addToUserCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    // Filter & Search Logic
    function applyFilters() {
        let filtered = [...allProducts];

        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        if (query) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        const selectedCat = categoryFilter ? categoryFilter.value : "all";
        if (selectedCat !== "all") {
            filtered = filtered.filter(p => p.category === selectedCat);
        }

        const sortVal = sortProducts ? sortProducts.value : "default";
        if (sortVal === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortVal === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortVal === "rating-desc") {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (sortVal === "rating-asc") {
            filtered.sort((a, b) => a.rating - b.rating);
        }

        renderProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
    if (sortProducts) sortProducts.addEventListener("change", applyFilters);

    fetchProducts();
});

// View Details navigation
function viewDetails(productId) {
    window.location.href = `products-details.html?id=${productId}`;
}

// Add item to the current logged-in user's isolated cart
function addToUserCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let cart = getUserCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveUserCart(cart);
    alert(`"${product.name}" added to your cart!`);
}
