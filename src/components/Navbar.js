// frontend/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import '../App.css'; // Assuming Navbar styles are in App.css or a dedicated file

const Navbar = () => {
    const { getTotalCartItems, wallet } = useContext(ShopContext);
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">E-Shop</Link>
            <ul className="nav-links">
                <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Products</Link></li>
                <li><Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''}>Cart ({getTotalCartItems()})</Link></li>
                <li><Link to="/checkout" className={location.pathname === '/checkout' ? 'active' : ''}>Checkout</Link></li>
                <li><Link to="/wallet" className={location.pathname === '/wallet' ? 'active' : ''}>Wallet</Link></li>
            </ul>
            <div className="nav-wallet">
                Balance: ${wallet.balance ? wallet.balance.toFixed(2) : '0.00'}
            </div>
        </nav>
    );
};

export default Navbar;