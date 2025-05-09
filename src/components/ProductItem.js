// frontend/src/components/ProductItem.js
import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';

const ProductItem = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;