// js/add-product.js - Adds New Electronic Device to db.json
const PRODUCTS_API = "http://localhost:3000/products";

document.addEventListener("DOMContentLoaded", () => {
    // Admin check
    const currentUser = requireAuth();
    if (!currentUser) return;

    const isAdmin =
    currentUser.role === "admin" ||
    currentUser.user_type === "admin" ||
    currentUser.email === "admin@shopease.com";
    if (!isAdmin) {
        alert("Access Denied: Only administrators can add products!");
        window.location.href = "products.html";
        return;
    }

    const form = document.getElementById("productForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Capture and parse form values
        const name = document.getElementById("productName").value.trim();
        const price = parseFloat(document.getElementById("productPrice").value);
        const category = document.getElementById("productCategory").value.trim();
        const image = document.getElementById("productImage").value.trim();
        const description = document.getElementById("productDescription").value.trim();
        const stock = parseInt(document.getElementById("productStock").value, 10);
        const rating = parseFloat(document.getElementById("productRating").value);

        if (!name || isNaN(price) || !category || !image || !description || isNaN(stock) || isNaN(rating)) {
            alert("Please provide valid information for all product fields.");
            return;
        }

                // Check if product name already exists
        const checkRes = await axios.get(
            `${PRODUCTS_API}?name=${encodeURIComponent(name)}`
        );

        if (checkRes.data && checkRes.data.length > 0) {
            alert("This product name already exists!");
            return;
        }

        const newProduct = {
            name: name,
            price: price,
            category: category,
            image: image,
            description: description,
            stock: stock,
            rating: rating
        };

try {
    console.log("Product being added:", newProduct);

    const response = await axios.post(PRODUCTS_API, newProduct);

    console.log("Product added successfully:", response.data);

    alert(`Product "${name}" added successfully!`);

    window.location.href = "admin.html";

} catch (error) {
    console.error("Error adding product:", error.response || error);

    alert("Failed to add product. Make sure JSON Server is running.");
}
    });
});
