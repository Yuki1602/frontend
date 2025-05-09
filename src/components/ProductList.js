// frontend/src/components/ProductList.js
import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import ProductItem from './ProductItem';
import '../App.css'; // Or a dedicated ProductList.css

const ProductList = () => {
    const { products, isLoading, error } = useContext(ShopContext);

    if (isLoading) return <div className="spinner-container"><div className="spinner"></div></div>;
    if (error) return <p className="message error">{error}</p>;

    return (
        <div>
            <h1 className="page-title">Our Products</h1>
            {products.length === 0 && !isLoading ? <p>No products available at the moment.</p> : null}
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;