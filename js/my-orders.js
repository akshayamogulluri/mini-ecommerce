// js/my-orders.js - Displays Current User's Orders

const ORDERS_API = "/orders";

document.addEventListener("DOMContentLoaded", async () => {

    const currentUser = requireAuth();

    if (!currentUser) return;

    const ordersContainer = document.getElementById("myOrdersContainer");

    if (!ordersContainer) return;

    try {

        const response = await axios.get(ORDERS_API);

        const allOrders = response.data;

        // Display only current user's orders
        const userOrders = allOrders.filter(
            order => String(order.userId) === String(currentUser.id)
        );

        if (userOrders.length === 0) {

            ordersContainer.innerHTML =
                "<p>You have not placed any orders yet.</p>";

            return;
        }

        ordersContainer.innerHTML = userOrders.map(order => `

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

                        <strong>Order #${order.id}</strong>

                        <span style="
                            color: #6b7280;
                            font-size: 0.85rem;
                            margin-left: 8px;
                        ">

                            ${order.orderDate || ""}

                        </span>

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


                <!-- PRODUCT DETAILS -->

                <div>

                    ${order.products.map(p => `

                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 20px;
                            padding: 15px 0;
                            border-bottom: 1px solid #e5e7eb;
                        ">


                            <!-- PRODUCT IMAGE -->

                            <img
                                src="${p.image || 'https://via.placeholder.com/120'}"
                                alt="${p.name}"
                                style="
                                    width: 120px;
                                    height: 120px;
                                    object-fit: contain;
                                    border-radius: 10px;
                                    background: #f8f8f8;
                                "
                            >


                            <!-- PRODUCT INFORMATION -->

                            <div style="flex: 1;">

                                <h3 style="
                                    margin: 0 0 8px 0;
                                    font-size: 1rem;
                                ">

                                    ${p.name}

                                </h3>


                                <p style="
                                    margin: 5px 0;
                                    color: #6b7280;
                                ">

                                    Category: ${p.category || "Not available"}

                                </p>


                                <p style="margin: 5px 0;">

                                    Price:
                                    ₹${Number(p.price).toLocaleString("en-IN")}

                                </p>


                                <p style="
                                    margin: 5px 0;
                                    color: #6b7280;
                                ">

                                    Quantity: ${p.quantity}

                                </p>

                            </div>


                            <!-- TOTAL PRICE -->

                            <div style="
                                font-weight: 700;
                                color: var(--primary, #7B2BFF);
                            ">

                                ₹${Number(
                                    p.price * p.quantity
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

                        ₹${Number(order.totalAmount).toLocaleString("en-IN")}

                    </span>

                </div>


            </div>

        `).join("");


    } catch (error) {

        console.error("Error loading user orders:", error);

        ordersContainer.innerHTML =
            "<p>Failed to load orders. Please try again later.</p>";

    }

});