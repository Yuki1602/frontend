// frontend/src/components/Wallet.js
import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import '../App.css';

const Wallet = () => {
    const { wallet, fetchWallet, isLoading, error } = useContext(ShopContext);

    useEffect(() => {
        fetchWallet(); // Fetch latest wallet balance when component mounts
    }, [fetchWallet]);

    if (isLoading && !wallet.balance) return <div className="spinner-container"><div className="spinner"></div></div>;
    if (error) return <p className="message error">{error}</p>;

    return (
        <div className="wallet-page">
            <h1 className="page-title">My Wallet</h1>
            <div className="wallet-details">
                <p className="wallet-info">Current Balance:</p>
                <p className="wallet-balance">
                    ${wallet.balance !== undefined && wallet.balance !== null ? wallet.balance.toFixed(2) : 'Loading...'}
                </p>
                {/* In a real app, you might add options to add funds or view transaction history */}
            </div>
        </div>
    );
};

export default Wallet;