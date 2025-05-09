// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ShopContextProvider } from './contexts/ShopContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wallet from './components/Wallet';
import './App.css';

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wallet" element={<Wallet />} />
              {/* You could add a 404 Not Found page here */}
            </Routes>
          </div>
        </div>
      </Router>
    </ShopContextProvider>
  );
}

export default App;