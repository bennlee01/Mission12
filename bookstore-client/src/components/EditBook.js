import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const { bookId } = useParams(); // Get the bookId from the route params
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        category: '',
        pageCount: '',
        price: '',
    });

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`http://localhost:5095/api/books/${bookId}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchBookData();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5095/api/books/${bookId}`, formData);
            navigate('/admin/manage-books');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleBack = () => {
        navigate('/admin/manage-books');
    };

    return (
        <Container className="my-4">
            <h1>Edit Book</h1>
            <Button onClick={handleBack} className="mb-4" variant="secondary">Back to Manage Books</Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="publisher">
                    <Form.Label>Publisher</Form.Label>
                    <Form.Control
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="pageCount">
                    <Form.Label>Page Count</Form.Label>
                    <Form.Control
                        type="number"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" className="mt-4" variant="primary">Save Changes</Button>
            </Form>
        </Container>
    );
};

export default EditBook;
