# 🛒 Mini-Commerce

> A simple and responsive e-commerce web application built using HTML, CSS, JavaScript, Axios, and JSON Server.

---

## ✨ Features

- 🔐 User Registration & Login
- 🛍️ Product Browsing & Product Details
- 🛒 User-Specific Shopping Cart
- 📦 Checkout & Order Placement
- 📋 User-Specific Order History
- 👨‍💼 Admin Dashboard
- 📊 Admin Order Management
- ➕ Add New Products
- ✏️ Update Product Details
- 🗑️ Delete Products
- 💾 LocalStorage Cart Management
- 🔄 CRUD Operations using JSON Server

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling & responsive UI |
| JavaScript | Application logic |
| Axios | API requests |
| JSON Server | Backend & data storage |
| LocalStorage | Cart management |

---

## 📁 Project Structure

```text
mini-ecommerce/
│
├── 📁 css/
├── 📁 images/
├── 📁 js/
│
├── 📄 index.html
├── 📄 login.html
├── 📄 register.html
├── 📄 products.html
├── 📄 products-details.html
├── 📄 cart.html
├── 📄 checkout.html
├── 📄 my-orders.html
├── 📄 admin.html
├── 📄 add-product.html
├── 📄 update-product.html
│
├── 📄 db.json
├── 📄 package.json
└── 📄 package-lock.json
````

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/akshayamogulluri/mini-ecommerce.git
```

### 2. Open the Project

```bash
cd mini-ecommerce
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### 5. Run the Frontend

Open `index.html` using **Live Server** in VS Code.

---

## 🔄 Application Flow

```text
User
 │
 ├── Register / Login
 │
 ├── Browse Products
 │
 ├── Add Products to Cart
 │
 ├── Checkout
 │
 └── View Own Orders

Admin
 │
 ├── View Products
 ├── Add Products
 ├── Update Products
 ├── Delete Products
 └── View Customer Orders
```

---

## 👤 User Features

Users can:

* Create an account
* Login to the application
* Browse products
* Add products to their own cart
* Place orders
* View their own order history

---

## 👨‍💼 Admin Features

The admin can:

* View customer orders
* Add new products
* Update existing products
* Delete products
* Manage the product catalog

---

## 🔧 API Endpoints

```text
GET     /products
POST    /products
PUT     /products/:id
DELETE  /products/:id

GET     /users
POST    /users

GET     /orders
POST    /orders
```

---

## 📌 Project Highlights

* Frontend-backend communication using Axios
* REST API integration with JSON Server
* CRUD operations
* User-specific cart and order management
* Role-based admin functionality
* LocalStorage-based cart persistence


```
```
