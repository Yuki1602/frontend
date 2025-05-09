// frontend/src/contexts/ShopContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const API_URL = 'http://localhost:3001/api'; // Your backend URL

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wallet, setWallet] = useState({ balance: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [checkoutMessage, setCheckoutMessage] = useState('');


    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/products`);
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/cart`);
            setCart(response.data);
        } catch (err) {
            setError('Failed to fetch cart.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchWallet = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/wallet`);
            setWallet(response.data);
        } catch (err) {
            setError('Failed to fetch wallet balance.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchCart();
        fetchWallet();
    }, [fetchProducts, fetchCart, fetchWallet]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity });
            setCart(response.data);
            setCheckoutMessage(''); // Clear previous checkout messages
        } catch (err) {
            console.error("Error adding to cart:", err);
            setError(err.response?.data?.message || 'Failed to add item to cart.');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await axios.post(`${API_URL}/cart/remove/${productId}`);
            setCart(response.data);
        } catch (err) {
            console.error("Error removing from cart:", err);
            setError(err.response?.data?.message || 'Failed to remove item from cart.');
        }
    };

    const updateCartQuantity = async (productId, quantity) => {
        try {
            const response = await axios.post(`${API_URL}/cart/update`, { productId, quantity });
            setCart(response.data);
        } catch (err) {
            console.error("Error updating cart quantity:", err);
            setError(err.response?.data?.message || 'Failed to update cart quantity.');
        }
    };

    const getTotalCartAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getTotalCartItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);
        setCheckoutMessage('');
        try {
            const response = await axios.post(`${API_URL}/checkout`);
            setCart([]); // Clear cart on frontend
            setWallet({ balance: response.data.newBalance });
            setCheckoutMessage(`Checkout successful! Order ID: ${response.data.order.orderId}. Your new balance is $${response.data.newBalance.toFixed(2)}`);
            return { success: true, order: response.data.order };
        } catch (err) {
            const message = err.response?.data?.message || 'Checkout failed. Please try again.';
            setError(message);
            setCheckoutMessage(message); // Show error in checkout message area as well
            console.error("Checkout error:", err);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };


    const contextValue = {
        products,
        cart,
        wallet,
        isLoading,
        error,
        setError, // To allow components to clear errors
        fetchProducts,
        fetchCart,
        fetchWallet,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getTotalCartAmount,
        getTotalCartItems,
        handleCheckout,
        checkoutMessage,
        setCheckoutMessage
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};