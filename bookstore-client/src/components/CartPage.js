import React, { useState, useEffect } from 'react';
import { Button, Table, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation

const CartPage = () => {
    // State to manage cart data from localStorage
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    const [showToast, setShowToast] = useState(false);  // To control Toast visibility
    const navigate = useNavigate();  // For navigating back to the main page (book list)

    // Update localStorage whenever cart data changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Get the total items and total price in the cart
    const getCartSummary = () => {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        return { totalItems, totalPrice };
    };

    // Remove an item from the cart
    const removeFromCart = (bookId) => {
        const updatedCart = cart.filter(item => item.bookId !== bookId);
        setCart(updatedCart);
    };

    // Increase the quantity of a specific item
    const increaseQuantity = (bookId) => {
        const updatedCart = cart.map(item =>
            item.bookId === bookId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        setShowToast(true);  // Show toast when item quantity is increased
    };

    // Decrease the quantity of a specific item
    const decreaseQuantity = (bookId) => {
        const updatedCart = cart.map(item =>
            item.bookId === bookId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        setShowToast(true);  // Show toast when item quantity is decreased
    };

    const { totalItems, totalPrice } = getCartSummary();  // Get summary of the cart

    // Handle navigating back to the main shopping page
    const handleContinueShopping = () => {
        navigate('/');  // Navigate back to the main page (book list)
    };

    return (
        <div>
            <h1>Your Cart</h1>
            {totalItems === 0 ? (  // If cart is empty, show empty message
                <div>
                    <p>Your cart is empty! Continue shopping to add items to your cart.</p>
                    <Button onClick={handleContinueShopping}>Continue Shopping</Button>
                </div>
            ) : (
                <>
                    {/* Table displaying cart items */}
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item) => (
                            <tr key={item.bookId}>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>
                                    {/* Buttons to increase and decrease quantity */}
                                    <Button onClick={() => decreaseQuantity(item.bookId)} className="mx-1">-</Button>
                                    {item.quantity}
                                    <Button onClick={() => increaseQuantity(item.bookId)} className="mx-1">+</Button>
                                </td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => removeFromCart(item.bookId)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <h3>Total: ${totalPrice}</h3>
                    <Button onClick={handleContinueShopping}>Continue Shopping</Button>
                </>
            )}

            {/* Toast notification that shows when item quantity is updated */}
            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>Item quantity updated in cart!</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default CartPage;
