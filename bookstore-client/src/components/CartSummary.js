import React, { useState, useEffect } from 'react';

const CartSummary = () => {
    // Clear localStorage for debugging purposes - Remove this once you've tested it.
    useEffect(() => {
        localStorage.removeItem('cart'); // Clears the cart in localStorage to ensure a fresh start
    }, []); // Empty dependency array makes sure this only runs once when the component is first mounted.

    // Initialize the cart state from localStorage or default to an empty array
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : []; // Default to empty array if no cart in localStorage
    });

    // Calculate the total items and total price from the cart state
    const getCartSummary = () => {
        const totalItems = cart.length ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
        const totalPrice = cart.length ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) : '0.00';
        return { totalItems, totalPrice };
    };

    // Handle updating the cart dynamically when localStorage changes (for example, from another tab)
    useEffect(() => {
        const updateCartSummary = () => {
            const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(updatedCart); // Update state with the new cart data from localStorage
        };

        // Listen for changes in localStorage
        window.addEventListener('storage', updateCartSummary);

        // Clean up listener when the component unmounts
        return () => {
            window.removeEventListener('storage', updateCartSummary);
        };
    }, []);

    const { totalItems, totalPrice } = getCartSummary();

    return (
        <div className="cart-summary">
            <h3>Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
};

export default CartSummary;
