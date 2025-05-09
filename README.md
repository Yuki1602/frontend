# E-Shop: A React & Node.js Shopping Cart Application

Welcome to E-Shop! This project is a lightweight, fully functional shopping cart website demonstrating product Browse, a shopping basket, a checkout process (simulated payment via an internal wallet), and a wallet balance display.

**Tech Stack:**

* **Frontend:** React.js
* **Backend:** Node.js with Express.js
* **Styling:** Custom CSS
* **HTTP Client:** Axios (for frontend API calls)
* **Routing:** React Router DOM

## Features

1.  **Product Browse:** View a grid of available products with images, names, and prices.
2.  **Shopping Basket (Cart):**
    * Add products to the cart directly from the product list.
    * View all items currently in the cart.
    * Update the quantity of items in the cart.
    * Remove individual items from the cart.
    * See a running subtotal and grand total for cart items.
3.  **Checkout Process:**
    * Review the order summary before finalizing.
    * "Pay" for the order using the integrated wallet system.
    * (Note: No real payment gateway is integrated. This is a simulation.)
    * Receive confirmation of successful checkout or error messages.
4.  **Wallet Implementation:**
    * Users have a pre-defined wallet balance (managed on the backend).
    * The wallet balance is automatically deducted upon a successful checkout.
    * View the current wallet balance on a dedicated page and in the navigation bar.

## Project Structure

shopping-cart-app/

├── backend/                # Node.js Express server

│   ├── data/               # Mock data for products

│   │   └── products.js

│   ├── node_modules/

│   ├── server.js           # Express server setup and API routes

│   ├── package-lock.json

│   └── package.json

├── frontend/               # React.js application

│   ├── public/             # Static assets for React app

│   ├── src/                # React source code

│   │   ├── components/     # Reusable React components

│   │   ├── contexts/       # React Context for global state management

│   │   ├── App.css         # Main CSS styles

│   │   ├── App.js          # Main application component with routing

│   │   ├── index.css       # Global base styles

│   │   └── index.js        # Entry point for React app

│   ├── node_modules/

│   ├── package-lock.json

│   └── package.json

└── README.md               # This file


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

* **Node.js:** Version 14.x or later is recommended. You can download it from [nodejs.org](https://nodejs.org/).
* **npm (Node Package Manager):** This is usually installed automatically with Node.js.

## Setup and Running the Application Locally

Follow these steps to get the application up and running on your local machine:

**1. Clone the Repository (or Download Files):**

If this project is in a Git repository, clone it:
```bash
git clone <repository-url>

cd shopping-cart-app

If you have the files directly, ensure they are organized as per the Project Structure outlined above in a root folder named shopping-cart-app.

2. Set Up and Start the Backend Server:

a.  Open your terminal or command prompt.
b.  Navigate to the backend directory:
bash cd shopping-cart-app/backend
c.  Install the necessary Node.js dependencies:
bash npm install
d.  Once the dependencies are installed, start the backend server:
bash node server.js

You should see a confirmation message in the terminal:
Backend server running on http://localhost:3001

Keep this terminal window open and running for the backend server to remain active.

3. Set Up and Start the Frontend Application:

a.  Open a new terminal window or command prompt tab (leave the backend server running in its own terminal).

b.  Navigate to the frontend directory:
bash cd shopping-cart-app/frontend

c.  Install the necessary React dependencies:
bash npm install

d.  Once the dependencies are installed, start the React development server:
bash npm start

This command will typically open the E-Shop application automatically in your default web browser at http://localhost:3000. If it doesn't open automatically, you can manually navigate to this URL in your browser.

Congratulations! The E-Shop application should now be running locally. You can browse products, add them to your cart, proceed to checkout, and see your wallet balance update.

How to Use

Browse Products: The homepage (/) displays all available products. Click "Add to Cart" to add an item.
View Cart: Click on the "Cart" link in the navigation bar or navigate to /cart. Here you can adjust quantities or remove items.
Checkout: From the cart page, click "Proceed to Checkout" or navigate to /checkout. Review your order and click "Place Order (Pay with Wallet)".
Wallet: Click on the "Wallet" link in the navigation bar or navigate to /wallet to see your current balance. The balance also updates in the navbar after a successful checkout.
API Endpoints (Backend)
The backend server provides the following API endpoints, accessible by default at http://localhost:3001/api:

Products:
GET /api/products: Fetches all available products.
GET /api/products/:id: Fetches a single product by its ID.

Cart:
GET /api/cart: Retrieves the current state of the shopping cart.
POST /api/cart/add: Adds a specified product and quantity to the cart.

Request Body: { "productId": "string", "quantity": number }
POST /api/cart/remove/:productId: Removes a product entirely from the cart.
POST /api/cart/update: Updates the quantity of an existing item in the cart.
Request Body: { "productId": "string", "quantity": number } (If quantity is 0 or less, the item is removed).

Wallet:
GET /api/wallet: Retrieves the current balance of the user's wallet.

Checkout:
POST /api/checkout: Processes the order. If the wallet balance is sufficient, it deducts the total order amount from the wallet and clears the cart.

Development Choices & Reasoning
React.js (Frontend): Chosen for its component-based architecture, efficient rendering with the Virtual DOM, and a vast ecosystem, facilitating rapid UI development.
Node.js with Express.js (Backend): Selected for its fast development cycle (JavaScript full-stack), non-blocking I/O for handling concurrent requests efficiently, and the extensive NPM library.
React Context API (State Management): Used for managing global state (products, cart, wallet) in a simple and integrated way for an application of this scale. For larger applications, Redux or Zustand might be considered.
Custom CSS: Implemented for direct control over styling and to keep dependencies minimal for this exercise, ensuring a clean and modern look.
In-Memory Data Storage (Backend): For the purpose of this LLD and rapid prototyping, product data, cart, and wallet are stored in memory on the backend. In a production environment, this would be replaced with a persistent database (e.g., PostgreSQL, MongoDB).
This project serves as a demonstration of building a functional web application using modern JavaScript tools and frameworks, with a focus on core e-commerce functionalities.
