// frontend/src/components/Cart.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import CartItem from './CartItem';
import '../App.css';

const Cart = () => {
    const { cart, getTotalCartAmount, isLoading, error } = useContext(ShopContext);

    if (isLoading && cart.length === 0) return <div className="spinner-container"><div className="spinner"></div></div>; // Show spinner if cart is initially loading
    if (error) return <p className="message error">{error}</p>;

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="page-title">Your Shopping Cart</h1>
                <p className="empty-cart">Your cart is currently empty.</p>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/" className="btn">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 className="page-title">Your Shopping Cart</h1>
            <div className="cart-items-container">
                {cart.map(item => (
                    <CartItem key={item.productId} item={item} />
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: ${getTotalCartAmount().toFixed(2)}</h3>
                <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;