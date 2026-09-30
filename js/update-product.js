const PRODUCTS_API = "http://localhost:3000/products";

const updateProductForm =
    document.getElementById("updateProductForm");

const updateProductSelect =
    document.getElementById("updateProductSelect");


// 1. Load products into dropdown

async function loadProducts() {
    try {
        const response = await axios.get(PRODUCTS_API);

        const products = response.data;

        products.forEach(function (product) {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent = product.name;

            updateProductSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading products:", error);
        alert("Failed to load products.");
    }
}


// 2. Display selected product details

updateProductSelect.addEventListener("change", async function () {

    const productId = updateProductSelect.value;

    if (!productId) return;

    try {
        const response = await axios.get(
            `${PRODUCTS_API}/${productId}`
        );

        const product = response.data;

        document.getElementById("updateProductName").value =
            product.name;

        document.getElementById("updateProductPrice").value =
            product.price;

        document.getElementById("updateProductCategory").value =
            product.category;

        document.getElementById("updateProductImage").value =
            product.image;

        document.getElementById("updateProductDescription").value =
            product.description;

        document.getElementById("updateProductStock").value =
            product.stock;

        document.getElementById("updateProductRating").value =
            product.rating;

    } catch (error) {
        console.error("Error loading selected product:", error);
    }
});


// 3. Update product

updateProductForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const productId = updateProductSelect.value;

    if (!productId) {
        alert("Please select a product first.");
        return;
    }

    const updatedProduct = {
        name: document.getElementById("updateProductName").value.trim(),

        price: Number(
            document.getElementById("updateProductPrice").value
        ),

        category: document.getElementById("updateProductCategory").value.trim(),

        image: document.getElementById("updateProductImage").value.trim(),

        description: document.getElementById("updateProductDescription").value.trim(),

        stock: Number(
            document.getElementById("updateProductStock").value
        ),

        rating: Number(
            document.getElementById("updateProductRating").value
        )
    };

    try {

        console.log("Updating product ID:", productId);
        console.log("Updated data:", updatedProduct);

        const response = await axios.patch(
            `${PRODUCTS_API}/${productId}`,
            updatedProduct
        );

        console.log("Updated product:", response.data);

        alert("Product updated successfully! 🎉");

        // Reload the page to show updated data
        window.location.reload();

    } catch (error) {

        console.error(
            "Error updating product:",
            error.response || error
        );

        alert("Failed to update product. Check JSON Server.");

    }

});


// Start loading products
loadProducts();