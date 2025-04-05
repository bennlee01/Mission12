import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book }) => {
    // If no book data is provided, show a message
    if (!book) return <p>No book data available.</p>;

    // Fallback image URL in case the book does not have a cover image
    const bookImage = book.imageUrl || 'https://via.placeholder.com/150'; // Placeholder image

    return (
        <div className="card mb-4">
            {/* Book cover image with max height and cover style */}
            <img src={bookImage} alt={`${book.title} cover`} className="card-img-top" style={{ maxHeight: '200px', objectFit: 'cover' }} />
            <div className="card-body">
                {/* Book details displayed inside the card */}
                <h3 className="card-title">{book.title}</h3>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>
                <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                <p className="card-text"><strong>Category:</strong> {book.category}</p>
                <p className="card-text"><strong>Pages:</strong> {book.pageCount}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price}</p>
                {/* Link to view more details about the book */}
                <a href={`/books/${book.bookId}`} className="btn btn-primary">
                    More Info
                </a>
            </div>
        </div>
    );
};

// Prop validation to ensure the book object structure
Book.propTypes = {
    book: PropTypes.shape({
        bookId: PropTypes.number.isRequired,  // Unique book ID
        title: PropTypes.string.isRequired,   // Book title
        author: PropTypes.string.isRequired,  // Book author
        publisher: PropTypes.string.isRequired, // Publisher name
        isbn: PropTypes.string.isRequired,    // ISBN number
        category: PropTypes.string.isRequired, // Book category
        pageCount: PropTypes.number.isRequired, // Total pages in the book
        price: PropTypes.number.isRequired,    // Price of the book
        imageUrl: PropTypes.string,            // Optional book cover image URL
    }).isRequired,
};

export default Book;
