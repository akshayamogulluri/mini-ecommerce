// js/common.js - Shared Authentication & Storage Helpers

// 1. Get the currently logged-in user
function getLoggedInUser() {
    const userStr = localStorage.getItem("loggedInUser");
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch (e) {
        return null;
    }
}

// 2. Protect pages: redirect to login if not logged in
function requireAuth() {
    const user = getLoggedInUser();
    if (!user) {
        alert("Please log in to continue.");
        window.location.href = "login.html";
        return null;
    }
    return user;
}

// 3. User-specific cart storage key (ensures User A cannot see User B's cart)
function getUserCartKey() {
    const user = getLoggedInUser();
    if (!user) return "cart_guest";
    return `cart_user_${user.id}`;
}

// 4. Get active user's cart items
function getUserCart() {
    const key = getUserCartKey();
    const cartStr = localStorage.getItem(key);
    return cartStr ? JSON.parse(cartStr) : [];
}

// 5. Save active user's cart items
function saveUserCart(cartItems) {
    const key = getUserCartKey();
    localStorage.setItem(key, JSON.stringify(cartItems));
}

// 6. Global Logout Handler (binds to #logoutButton on any page)
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            alert("Logged out successfully!");
            window.location.href = "login.html";
        });
    }
});