import React, { useState } from 'react';
import { Button, Container, Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn, setIsbn] = useState('');
    const [category, setCategory] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [price, setPrice] = useState('');
    const [classification, setClassification] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!title || !author || !publisher || !price || !isbn || !category || !pageCount || !classification) {
            setToastMessage('Please fill all fields');
            setShowToast(true);
            return;
        }

        try {
            const newBook = {
                title,
                author,
                publisher,
                isbn,
                category,
                pageCount: parseInt(pageCount),
                price: parseFloat(price),
                classification,
            };

            // Make a POST request to save the new book to the database
            await axios.post('http://localhost:5095/api/books', newBook);

            // Show success toast
            setToastMessage('Book added successfully!');
            setShowToast(true);

            // Redirect to manage books page
            navigate('/admin/manage-books');
        } catch (error) {
            console.error('Error adding book:', error);
            setToastMessage('Error adding book. Please try again.');
            setShowToast(true);
        }
    };

    const handleBack = () => {
        navigate('/admin/manage-books');
    };

    return (
        <Container className="my-4">
            <h1>Add New Book</h1>
            <Button onClick={handleBack} className="mb-4" variant="secondary">Back to Manage Books</Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter book title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter publisher name"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Page Count</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter page count"
                        value={pageCount}
                        onChange={(e) => setPageCount(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="Enter book price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Classification</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter book classification"
                        value={classification}
                        onChange={(e) => setClassification(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Book
                </Button>
            </Form>

            {/* Toast notification */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default AddBook;
