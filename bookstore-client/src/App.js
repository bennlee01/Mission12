import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch in React Router v6
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import BooksList from './components/BooksList'; // Import Books List component
import CartPage from './components/CartPage'; // Import Cart Page component
import ManageBooks from './components/ManageBooks'; // Import ManageBooks component
import EditBook from './components/EditBook'; // Import EditBook component
import AddBook from './components/AddBook'; // Import AddBook component
import DeleteBook from './components/DeleteBook'; // Import DeleteBook component

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Use Routes to handle routing in React Router v6 */}
                    <Route path="/" element={<BooksList />} /> {/* Route to Books List page */}
                    <Route path="/cart" element={<CartPage />} /> {/* Route to Cart page */}
                    <Route path="/admin/manage-books" element={<ManageBooks />} /> {/* Route to Manage Books Page */}
                    <Route path="/admin/manage-books/edit/:bookId" element={<EditBook />} /> {/* Route to Edit Book Page */}
                    <Route path="/admin/manage-books/add" element={<AddBook />} /> {/* Route to Add Book Page */}
                    <Route path="/admin/manage-books/delete/:bookId" element={<DeleteBook />} /> {/* Route to Delete Book Page */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
