// frontend/src/components/CartItem.js
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../contexts/ShopContext';

const CartItem = ({ item }) => {
    const { updateCartQuantity, removeFromCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity); // Update local state immediately for responsiveness
        if (newQuantity > 0) {
            updateCartQuantity(item.productId, newQuantity);
        } else if (newQuantity === 0) {
            removeFromCart(item.productId); // Or handle as removal
        }
    };

    const handleRemove = () => {
        removeFromCart(item.productId);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-details">
                <img src={item.image || `https://via.placeholder.com/80x80.png?text=${encodeURIComponent(item.name)}`} alt={item.name} />
                <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="cart-item-actions">
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="0" // Allow 0 for potential removal, backend handles >=1 for update
                />
                <span>Subtotal: ${(item.price * quantity).toFixed(2)}</span>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;