import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Pagination, Form, Row, Col, Container } from "react-bootstrap"; // Importing Bootstrap components

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState("Title");

    useEffect(() => {
        fetchBooks();
    }, [page, pageSize, sortBy]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5095/api/books?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}`
            );
            setBooks(response.data);
            setTotalPages(Math.ceil(response.data.length / pageSize));
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setPage(1); // Reset to the first page when page size changes
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <Container>
            {/* Header Section */}
            <Row className="mt-4 mb-4">
                <Col className="text-center">
                    <h1 className="display-4">Online Bookstore</h1>
                    <p className="lead">Browse through our collection of books</p>
                </Col>
            </Row>

            {/* Filter Section */}
            <Row className="mb-3">
                <Col md={6} className="d-flex align-items-center">
                    <Form.Label className="mr-2">Sort by:</Form.Label>
                    <Form.Control as="select" onChange={handleSortChange} value={sortBy} style={{ width: '150px' }}>
                        <option value="Title">Title</option>
                        <option value="Author">Author</option>
                        <option value="Price">Price</option>
                    </Form.Control>
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <Form.Label className="mr-2">Results per page:</Form.Label>
                    <Form.Control as="select" onChange={handlePageSizeChange} value={pageSize} style={{ width: '100px' }}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Form.Control>
                </Col>
            </Row>

            {/* Table Section */}
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Category</th>
                    <th>Pages</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.bookId}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.isbn}</td>
                        <td>{book.category}</td>
                        <td>{book.pageCount}</td>
                        <td>{book.price}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Pagination Section */}
            <Pagination className="justify-content-center">
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page <= 1} />
                {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item key={idx} active={idx + 1 === page} onClick={() => handlePageChange(idx + 1)}>
                        {idx + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} />
            </Pagination>
        </Container>
    );
};

export default BooksList;
