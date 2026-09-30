// js/product-details.js
// Dedicated script for rendering side-by-side product view

const API_URL = "/products";
const productDetails = document.getElementById("productDetails");

// 1. Extract the product ID from URL query parameters (e.g. ?id=2)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (!productId) {
    productDetails.innerHTML = `
        <div class="error-box">
            <h3>No device selected</h3>
            <p>Please return to the catalog and choose an electronic device.</p>
            <a href="products.html" class="btn-primary" style="display:inline-block; margin-top:1rem; text-decoration:none;">Go to Catalog</a>
        </div>
    `;
} else {
    // 2. Fetch specific electronic product by ID
    axios.get(`${API_URL}/${productId}`)
        .then(function(response) {
            const product = response.data;
            renderProductDetails(product);
        })
        .catch(function(error) {
            console.error("Error fetching device details:", error);
            productDetails.innerHTML = `
                <div class="error-box">
                    <h3>Device not found</h3>
                    <p>Could not retrieve specifications from the database.</p>
                    <a href="products.html" class="btn-primary" style="display:inline-block; margin-top:1rem; text-decoration:none;">Back to Electronics</a>
                </div>
            `;
        });
}

// 3. Render side-by-side: Image on the Left, Details on the Right
function renderProductDetails(product) {
    const starCount = Math.floor(product.rating || 5);
    const stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);

    productDetails.innerHTML = `
        <div class="details-wrapper">
            
            <!-- LEFT SIDE: PRODUCT IMAGE -->
            <div class="details-image-side">
                <div class="details-image-card">
                    <img src="${product.image}" alt="${product.name}" class="details-image" id="productImageElement">
                    <span class="category-badge-large">${product.category}</span>
                </div>
            </div>

            <!-- RIGHT SIDE: PRODUCT DETAILS -->
            <div class="details-info-side">
                <span class="device-category-tag">${product.category}</span>
                <h1 class="details-title">${product.name}</h1>

                <div class="details-rating-row">
                    <span class="stars">${stars}</span>
                    <span class="rating-value">${product.rating} / 5.0</span>
                    <span class="verified-tag">✓ Verified Tech</span>
                </div>

                <div class="details-price-row">
                    <span class="details-price">₹${Number(product.price).toLocaleString()}</span>
                    <span class="tax-note">Inclusive of all taxes</span>
                </div>

                <div class="spec-divider"></div>

                <div class="details-description">
                    <h3>Overview</h3>
                    <p>${product.description}</p>
                </div>

                <div class="stock-status">
                    <span class="stock-dot"></span>
                    <span>In Stock (${product.stock} units available)</span>
                </div>

                <!-- ACTIONS -->
                <div class="details-action-buttons">
                    <button id="addToCartBtn" class="add-to-cart-btn btn-large">
                        🛒 Add to Cart
                    </button>
                    <a href="cart.html" class="btn-secondary btn-large" style="text-decoration:none; text-align:center;">
                        View Cart
                    </a>
                </div>
            </div>

        </div>
    `;

    // 4. Attach Add to Cart listener
    document.getElementById("addToCartBtn").addEventListener("click", () => {
        addToCart(product);
    });
}

// 5. Cart Storage Helper
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added "${product.name}" to your cart!`);
}
