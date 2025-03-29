import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch in React Router v6
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import BooksList from './components/BooksList'; // Import Books List component
import CartPage from './components/CartPage'; // Import Cart Page component

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Use Routes to handle routing in React Router v6 */}
                    <Route path="/" element={<BooksList />} /> {/* Route to Books List page */}
                    <Route path="/cart" element={<CartPage />} /> {/* Route to Cart page */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
