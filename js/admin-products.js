// js/admin-products.js
// Admin can view and delete products

const PRODUCTS_API = "/products";

document.addEventListener("DOMContentLoaded", async () => {

    const productsContainer =
        document.getElementById("productsContainer");

    if (!productsContainer) {
        console.error("Products container not found");
        return;
    }

    try {

        // Get all products
        const response = await axios.get(PRODUCTS_API);

        const products = response.data;

        if (products.length === 0) {
            productsContainer.innerHTML =
                "<p>No products available.</p>";
            return;
        }

        // Display all products
        productsContainer.innerHTML = products.map(product => `

            <div style="
                display: flex;
                align-items: center;
                gap-right: 5px;
                padding: 30px;
                margin: 15px 0;
                border: 1px solid #ddd;
                border-radius: 12px;
            ">

                <img
                    src="${product.image || 'https://via.placeholder.com/100'}"
                    alt="${product.name}"
                    style="
                        width: 100px;
                        height: 100px;
                        object-fit: contain;
                    "
                >

                <div style="flex: 1;">

                    <h3>${product.name}</h3>

                    <p>Category: ${product.category || "Not available"}</p>

                    <p>
                        Price: ₹${Number(product.price)
                            .toLocaleString("en-IN")}
                    </p>

                </div>

                <button
    onclick="deleteProduct(${product.id})"
    style="
        background: #dc2626;
        color: white;
        border: none;
        width: 50px;
        height: 32px;
        padding: 0;
        font-size: 12px;
        border-radius: 6px;
        cursor: pointer;
        flex-shrink: 0;
        white-space: nowrap;
    "
>
    Delete
</button>

            </div>

        `).join("");

    } catch (error) {

        console.error("Error loading products:", error);

        productsContainer.innerHTML =
            "<p>Failed to load products.</p>";

    }

});


// Delete product function
async function deleteProduct(productId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await axios.delete(
            `${PRODUCTS_API}/${productId}`
        );

        alert("Product deleted successfully!");

        // Reload page after deletion
        location.reload();

    } catch (error) {

        console.error("Error deleting product:", error);

        alert("Failed to delete product.");

    }

}