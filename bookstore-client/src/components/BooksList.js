import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination, DropdownButton, Dropdown, Row, Col, Card, Container, Form, Toast, ToastContainer, Collapse } from 'react-bootstrap';
import axios from 'axios';
import CartSummary from './CartSummary'; // Import Cart Summary Component
import { useNavigate } from 'react-router-dom';  // Import for navigating to the Cart page

const BooksList = () => {
    // State variables
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [category, setCategory] = useState('All');
    const [showToast, setShowToast] = useState(false);  // State to show toast
    const [openFilters, setOpenFilters] = useState(false);  // State to handle collapse of filters
    const navigate = useNavigate(); // Hook to navigate to cart

    // Check for cart in localStorage (Persists throughout session)
    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        return cart;
    };

    // Fetch books data on component mount or state change
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:5095/api/books', {
                params: {
                    page,
                    pageSize,
                    sortBy,
                    sortOrder,
                    category: category === 'All' ? '' : category, // Handle 'All' category case
                },
            });

            setBooks(response.data.books);  // Set books data
            setTotalPages(response.data.totalPages);  // Set total pages for pagination
        };

        fetchBooks(); // Call the fetchBooks function
    }, [page, pageSize, sortBy, sortOrder, category]); // Dependencies to re-fetch on change

    // Handle sorting order change
    const handleSortChange = (newSortOrder) => {
        setSortOrder(newSortOrder);
    };

    // Handle page change in pagination
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage);
    };

    // Handle page size change
    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // Reset to first page on page size change
    };

    // Handle adding book to cart and update localStorage
    const handleAddToCart = (book) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.bookId === book.bookId);

        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if already in cart
        } else {
            cart.push({ ...book, quantity: 1 }); // Add new book to cart
        }

        localStorage.setItem('cart', JSON.stringify(cart));  // Save updated cart
        window.dispatchEvent(new Event('storage'));  // Trigger a storage event

        setShowToast(true);  // Show toast notification
    };

    // Navigate to the Cart page
    const handleViewCart = () => {
        navigate('/cart');
    };

    // Handle category selection change
    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <Container className="my-4">
            <h1 className="mb-4">Online Bookstore</h1>

            {/* Toggle Filters section */}
            <Button
                onClick={() => setOpenFilters(!openFilters)}  // Toggle filter visibility
                aria-controls="filters"
                aria-expanded={openFilters}
                className="mb-4"
            >
                {openFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <Collapse in={openFilters}>
                <div id="filters">
                    <Row className="mb-4">
                        {/* Category Filter */}
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <DropdownButton
                                        title={`Category: ${category || 'All'}`}
                                        onSelect={handleCategoryChange}
                                        className="w-100"
                                    >
                                        {/* Dropdown options for categories */}
                                        <Dropdown.Item eventKey="All">All</Dropdown.Item>
                                        <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                                        <Dropdown.Item eventKey="Biography">Biography</Dropdown.Item>
                                        <Dropdown.Item eventKey="Business">Business</Dropdown.Item>
                                        <Dropdown.Item eventKey="Christian Books">Christian Books</Dropdown.Item>
                                        <Dropdown.Item eventKey="Classic">Classic</Dropdown.Item>
                                        <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
                                        <Dropdown.Item eventKey="Historical">Historical</Dropdown.Item>
                                        <Dropdown.Item eventKey="Self-Help">Self-Help</Dropdown.Item>
                                        <Dropdown.Item eventKey="Thrillers">Thrillers</Dropdown.Item>
                                    </DropdownButton>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Sorting and Pagination Filters */}
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <DropdownButton
                                        title={`Sort by Title (${sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`}
                                        onSelect={handleSortChange}
                                        className="mb-3 w-auto"
                                    >
                                        <Dropdown.Item eventKey="asc">A-Z (Ascending)</Dropdown.Item>
                                        <Dropdown.Item eventKey="desc">Z-A (Descending)</Dropdown.Item>
                                    </DropdownButton>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="m-0">Results per page: </label>
                                        <Form.Control
                                            as="select"
                                            onChange={handlePageSizeChange}
                                            value={pageSize}
                                            className="w-auto"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                        </Form.Control>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Collapse>

            {/* Display list of books */}
            <Row className="mb-4">
                {books.map((book) => (
                    <Col md={4} key={book.bookId} className="mb-4">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                                <Card.Text>
                                    {/* Book details */}
                                    <strong>Publisher:</strong> {book.publisher}<br />
                                    <strong>ISBN:</strong> {book.isbn}<br />
                                    <strong>Category:</strong> {book.category}<br />
                                    <strong>Pages:</strong> {book.pageCount}<br />
                                    <strong>Price:</strong> ${book.price}
                                </Card.Text>
                                {/* Add to Cart Button */}
                                <Button
                                    onClick={() => handleAddToCart(book)}
                                    className="w-100 btn-success"
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination Controls */}
            <Pagination className="mb-4">
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={page === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Cart Summary Section */}
            <Card className="mb-4">
                <Card.Body>
                    <CartSummary />
                </Card.Body>
            </Card>

            {/* View Cart Button */}
            <Button onClick={handleViewCart} className="w-100 btn-warning">
                View Cart
            </Button>

            {/* Toast Notification */}
            <ToastContainer position="top-end">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>Item added to cart!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default BooksList;
