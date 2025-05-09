// frontend/src/components/Checkout.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import '../App.css';

const Checkout = () => {
    const { cart, getTotalCartAmount, wallet, handleCheckout, isLoading, checkoutMessage, setCheckoutMessage, error, setError } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    // Clear messages when component mounts or cart changes
    useEffect(() => {
        setCheckoutMessage('');
        setError(null); // Clear general errors as well
    }, [setCheckoutMessage, setError, cart]);


    const totalAmount = getTotalCartAmount();

    const onPlaceOrder = async () => {
        setIsProcessing(true);
        const result = await handleCheckout();
        setIsProcessing(false);
        if (result.success) {
            // Message is set by handleCheckout, navigate after a delay or on user action
            // For now, the message will appear, and user can navigate away
            // navigate('/order-confirmation'); // Or some other page
        }
    };

    if (cart.length === 0 && !checkoutMessage) { // Don't show if there's already a success/failure message
        return (
            <div className="checkout-page">
                <h1 className="page-title">Checkout</h1>
                <p className="empty-cart">Your cart is empty. Add some products to proceed.</p>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/" className="btn">Shop Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="page-title">Checkout</h1>

            {checkoutMessage && <div className={`message ${error ? 'error' : 'success'}`}>{checkoutMessage}</div>}
            {error && !checkoutMessage && <div className="message error">{error}</div>} {/* Show general error if no specific checkout message */}


            {!checkoutMessage.toLowerCase().includes('successful') && cart.length > 0 && ( // Only show form if checkout not yet successful and cart has items
                <div className="checkout-form">
                    {/* Simplified: No address form for this LLD */}
                    <div className="checkout-summary">
                        <h4>Order Summary</h4>
                        {cart.map(item => (
                            <p key={item.productId}>
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </p>
                        ))}
                        <hr />
                        <p className="total">
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </p>
                        <p>
                            <span>Your Wallet Balance:</span>
                            <span>${wallet.balance ? wallet.balance.toFixed(2) : '0.00'}</span>
                        </p>
                        {totalAmount > (wallet.balance || 0) && (
                            <p className="message error" style={{textAlign: 'center'}}>Insufficient wallet balance.</p>
                        )}
                    </div>

                    <button
                        onClick={onPlaceOrder}
                        className="place-order-btn"
                        disabled={isProcessing || isLoading || totalAmount === 0 || totalAmount > (wallet.balance || 0)}
                    >
                        {isProcessing || isLoading ? 'Processing...' : 'Place Order (Pay with Wallet)'}
                    </button>
                </div>
            )}

            {checkoutMessage.toLowerCase().includes('successful') && (
                 <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to="/" className="btn">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
};

export default Checkout;