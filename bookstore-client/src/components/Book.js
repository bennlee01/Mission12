// src/components/Book.js
import React from 'react';

const Book = ({ book }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>
                <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                <p className="card-text"><strong>Category:</strong> {book.category}</p>
                <p className="card-text"><strong>Pages:</strong> {book.numberOfPages}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price}</p>
            </div>
        </div>
    );
};

export default Book;
