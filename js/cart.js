// js/cart.js - Isolated Cart Management for the Logged-in User
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = requireAuth();
    if (!currentUser) return;

    const cartContainer = document.getElementById("cartContainer");
    const totalPriceEl = document.getElementById("totalPrice");
    const checkoutBtn = document.getElementById("checkoutButton");

    function renderCart() {
        const cart = getUserCart();

        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your shopping cart is empty.</p>";
            if (totalPriceEl) totalPriceEl.textContent = "Total: ₹0";
            if (checkoutBtn) checkoutBtn.style.display = "none";
            return;
        }

        if (checkoutBtn) checkoutBtn.style.display = "inline-block";

        let total = 0;

        cartContainer.innerHTML = `
            <div class="cart-table-wrapper">
                ${cart.map((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    return `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <p>₹${Number(item.price).toLocaleString("en-IN")}</p>
                            </div>
                            <div class="cart-qty-controls">
                                <button class="cart-qty-btn" onclick="updateQty(${index}, -1)">−</button>
                                <span>${item.quantity}</span>
                                <button class="cart-qty-btn" onclick="updateQty(${index}, 1)">+</button>
                            </div>
                            <button class="cart-remove-btn" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    `;
                }).join("")}
            </div>
        `;

        if (totalPriceEl) {
            totalPriceEl.textContent = `Total: ₹${total.toLocaleString("en-IN")}`;
        }
    }

    window.updateQty = function(index, change) {
        let cart = getUserCart();
        cart[index].quantity += change;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveUserCart(cart);
        renderCart();
    };

    window.removeFromCart = function(index) {
        let cart = getUserCart();
        cart.splice(index, 1);
        saveUserCart(cart);
        renderCart();
    };

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const cart = getUserCart();
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            window.location.href = "checkout.html";
        });
    }

    renderCart();
});
