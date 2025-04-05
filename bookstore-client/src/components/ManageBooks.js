import React, { useState, useEffect } from 'react';
import { Button, Container, ListGroup, Row, Col, Pagination, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5095/api/books', {
                    params: {
                        page,
                        pageSize,
                    },
                });
                setBooks(response.data.books);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching books:", error);
                setBooks([]);
            }
        };

        fetchBooks();
    }, [page, pageSize]);

    const handleDeleteBook = (bookId) => {
        navigate(`/admin/manage-books/delete/${bookId}`);  // Navigate to the DeleteBook page with the bookId
    };

    const handleEditBook = (bookId) => {
        navigate(`/admin/manage-books/edit/${bookId}`);  // Navigate to the EditBook page with the bookId
    };

    const handleAddBook = () => {
        navigate('/admin/manage-books/add');  // Navigate to the AddBook page
    };

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to books list page
    };

    return (
        <Container className="my-4">
            <h1 className="mb-4">Manage Books</h1>
            <Button onClick={handleBack} className="mb-4" variant="secondary">Back to Bookstore</Button>

            <Button onClick={handleAddBook} className="mb-4" variant="success">
                Add Book
            </Button>

            <Row className="mb-4">
                {Array.isArray(books) && books.length > 0 ? (
                    <ListGroup>
                        {books.map((book) => (
                            <ListGroup.Item key={book.bookId} className="d-flex justify-content-between">
                                <div>
                                    <h5>{book.title}</h5>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Publisher:</strong> {book.publisher}</p>
                                    <p><strong>Price:</strong> ${book.price}</p>
                                </div>
                                <div>
                                    <Button onClick={() => handleEditBook(book.bookId)} className="me-2" variant="warning">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDeleteBook(book.bookId)} variant="danger">
                                        Delete
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p>No books available.</p>
                )}
            </Row>

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

            <div className="mb-4">
                <label>Results per page:</label>
                <select onChange={handlePageSizeChange} value={pageSize}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>

            {/* Toast notification */}
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default ManageBooks;
