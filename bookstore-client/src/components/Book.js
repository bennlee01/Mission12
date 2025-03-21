// src/components/Book.js
import React from 'react';

// Functional component to display book details in a card format
const Book = ({ book }) => {
    return (
        <div className="card">
            <div className="card-body">
                {/* Book title displayed as a header */}
                <h3 className="card-title">{book.title}</h3>

                {/* Display author name */}
                <p className="card-text"><strong>Author:</strong> {book.author}</p>

                {/* Display publisher information */}
                <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>

                {/* Display ISBN number */}
                <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>

                {/* Display book category */}
                <p className="card-text"><strong>Category:</strong> {book.category}</p>

                {/* Display number of pages */}
                <p className="card-text"><strong>Pages:</strong> {book.pageCount}</p>

                {/* Display book price */}
                <p className="card-text"><strong>Price:</strong> ${book.price}</p>
            </div>
        </div>
    );
};

export default Book; // Export Book component for use in other parts of the app
