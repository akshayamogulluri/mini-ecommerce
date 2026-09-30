// js/checkout.js - Creates an Order Linked to Current User
const ORDERS_API = "http://localhost:3000/orders";

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = requireAuth();
    if (!currentUser) return;

    const checkoutForm = document.getElementById("checkoutForm");
    if (!checkoutForm) return;

    // Auto-fill user's name if empty
    const nameInput = document.getElementById("name");
    if (nameInput && !nameInput.value) {
        nameInput.value = currentUser.name || "";
    }

    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const cart = getUserCart();
        if (cart.length === 0) {
            alert("Your cart is empty. Add products before placing an order.");
            window.location.href = "products.html";
            return;
        }

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const orderData = {
            userId: currentUser.id,
            userEmail: currentUser.email,
            customer: {
                name: document.getElementById("name").value.trim(),
                mobile: document.getElementById("mobile").value.trim(),
                address: document.getElementById("address").value.trim(),
                city: document.getElementById("city").value.trim(),
                pincode: document.getElementById("pincode").value.trim()
            },
            products: cart,
            totalAmount: totalAmount,
            status: "Pending",
            orderDate: new Date().toLocaleDateString("en-GB")
        };

        try {
            await axios.post(ORDERS_API, orderData);

            // Clear ONLY this user's cart
            saveUserCart([]);

            alert("Order placed successfully!");
            window.location.href = "my-orders.html";

        } catch (error) {
            console.error("Order checkout error:", error);
            alert("Could not place order. Please try again.");
        }
    });
});
