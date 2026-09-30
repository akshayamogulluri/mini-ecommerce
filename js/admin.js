// js/admin.js - Displays All Orders for Admin

const ORDERS_API = "/orders";

document.addEventListener("DOMContentLoaded", async () => {

    // Check whether admin is logged in
    const currentUser = requireAuth();

    if (!currentUser) return;

    // Get the orders container from HTML
    const ordersContainer = document.getElementById("ordersContainer");

    if (!ordersContainer) {
        console.error("Orders container not found");
        return;
    }

    try {

        // Get all orders from JSON Server
        const response = await axios.get(ORDERS_API);

        const allOrders = response.data;

        // Admin can see ALL orders
        if (allOrders.length === 0) {

            ordersContainer.innerHTML =
                "<p>No orders have been received yet.</p>";

            return;
        }

        // Display all orders
        ordersContainer.innerHTML = allOrders.map(order => `

            <div class="cart-table-wrapper"
                 style="
                    margin-bottom: 1.5rem;
                    padding: 1.5rem;
                 ">

                <!-- ORDER HEADER -->

                <div style="
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 0.8rem;
                    margin-bottom: 1rem;
                ">

                    <div>

                        <h3 style="margin: 0;">
                            Order #${order.id}
                        </h3>

                        <p style="
                            color: #6b7280;
                            font-size: 0.9rem;
                        ">

                            Date: ${order.orderDate || "Not available"}

                        </p>

                        <p style="
                            color: #6b7280;
                            font-size: 0.9rem;
                        ">

                            User ID: ${order.userId}

                        </p>

                    </div>

                    <div>

                        <span style="
                            background: #e0f2fe;
                            color: #0284c7;
                            padding: 5px 12px;
                            border-radius: 12px;
                            font-size: 0.8rem;
                            font-weight: 600;
                        ">

                            ${order.status || "Pending"}

                        </span>

                    </div>

                </div>


                <!-- PRODUCTS -->

                <div>

                    ${order.products.map(product => `

                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            padding: 1rem 0;
                            border-bottom: 1px solid #f0f0f0;
                        ">

                            <!-- PRODUCT IMAGE -->

                            <img
                                src="${product.image ||
                                    product.imageUrl ||
                                    'https://via.placeholder.com/100'}"

                                alt="${product.name}"

                                style="
                                    width: 100px;
                                    height: 100px;
                                    object-fit: contain;
                                    border-radius: 10px;
                                    background: #f8f8f8;
                                "
                            >


                            <!-- PRODUCT INFORMATION -->

                            <div style="flex: 1;">

                                <h3 style="
                                    margin: 0 0 6px 0;
                                    font-size: 1rem;
                                ">

                                    ${product.name}

                                </h3>

                                <p style="
                                    margin: 4px 0;
                                    color: #6b7280;
                                ">

                                    Category:
                                    ${product.category || "Not available"}

                                </p>

                                <p style="margin: 4px 0;">

                                    Price:
                                    ₹${Number(product.price)
                                        .toLocaleString("en-IN")}

                                </p>

                                <p style="
                                    margin: 4px 0;
                                    color: #6b7280;
                                ">

                                    Quantity: ${product.quantity}

                                </p>

                            </div>


                            <!-- PRODUCT TOTAL -->

                            <div style="
                                font-weight: 700;
                                color: var(--primary, #7B2BFF);
                            ">

                                ₹${Number(
                                    product.price * product.quantity
                                ).toLocaleString("en-IN")}

                            </div>

                        </div>

                    `).join("")}

                </div>


                <!-- ORDER TOTAL -->

                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 1rem;
                    padding-top: 0.75rem;
                    border-top: 1px dashed #e5e7eb;
                    font-weight: 700;
                ">

                    <span>Total Amount:</span>

                    <span style="
                        color: var(--primary, #7B2BFF);
                    ">

                        ₹${Number(order.totalAmount)
                            .toLocaleString("en-IN")}

                    </span>

                </div>

            </div>

        `).join("");


    } catch (error) {

        console.error("Error loading all orders:", error);

        ordersContainer.innerHTML =
            "<p>Failed to load orders. Please try again later.</p>";

    }

});