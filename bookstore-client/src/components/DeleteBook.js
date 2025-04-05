import React, { useState, useEffect } from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
    const [book, setBook] = useState(null);  // Book to be deleted
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const navigate = useNavigate();
    const { bookId } = useParams();  // Get bookId from URL params

    useEffect(() => {
        // Fetch book details when component loads
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5095/api/books/${bookId}`);
                setBook(response.data);
                setIsLoading(false);  // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBook();
    }, [bookId]);

    // Handle deletion of the book
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5095/api/books/${bookId}`);
            navigate('/admin/manage-books');  // Redirect to the manage books page after deletion
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    // Handle cancel deletion and go back
    const handleCancel = () => {
        navigate('/admin/manage-books');  // Redirect back to the manage books page
    };

    if (isLoading) {
        return <div>Loading...</div>;  // Show loading message while data is being fetched
    }

    return (
        <Container className="my-4">
            <h1>Delete Book</h1>
            <Alert variant="danger">
                <h4>Are you sure you want to delete this book?</h4>
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
            </Alert>
            <Button variant="danger" onClick={handleDelete} className="me-2">
                Delete
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
                Cancel
            </Button>
        </Container>
    );
};

export default DeleteBook;
