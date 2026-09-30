// js/login.js - Validates Registered Users & Routes Roles
const USERS_API = "/users";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            // 1. Query JSON server for the registered email
            const response = await axios.get(`${USERS_API}?email=${encodeURIComponent(email)}`);
            const users = response.data;

            if (!users || users.length === 0) {
                alert("No account found with this email. You must register first!");
                window.location.href = "register.html";
                return;
            }

            const user = users[0];

            // 2. Validate password
            if (user.password !== password) {
                alert("Incorrect password. Please try again.");
                return;
            }

            // 3. Store authenticated session in localStorage
            const userRole = user.role ||
                (user.email.toLowerCase() === "admin@shopease.com"
                    ? "admin"
                    : "customer");

            localStorage.setItem("loggedInUser", JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                role: userRole
            }));

            alert(`Welcome back, ${user.name}!`);

            // 4. Route based on role
            if (userRole === "admin") {
    window.location.href = "admin.html";
} else {
    window.location.href = "products.html";
}

        } catch (error) {
            console.error("Login error:", error);
            alert("Could not connect to the server. Please ensure JSON Server is running.");
        }
    });
});
