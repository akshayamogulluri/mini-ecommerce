// js/register.js - Handles New User Registration
const USERS_API = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const mobile = document.getElementById("mobile").value.trim();

        if (!name || !email || !password || !mobile) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Check if email already exists
            const checkRes = await axios.get(`${USERS_API}?email=${encodeURIComponent(email)}`);
            if (checkRes.data && checkRes.data.length > 0) {
                alert("An account with this email already exists! Please log in.");
                window.location.href = "login.html";
                return;
            }


            // Create new user record
            const newUser = {
                name: name,
                email: email,
                password: password,
                mobile: mobile,
                role: "customer"
            };

            await axios.post(USERS_API, newUser);
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html";

        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Make sure JSON Server is running on port 3000.");
        }
    });
});
