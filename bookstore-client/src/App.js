import React from 'react';
import './App.css'; // Custom styles for the app (if any)
import BooksList from './components/BooksList'; // Import the BooksList component
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS for styling

function App() {
    return (
        <div className="App">
            {/* Render the BooksList component which displays the list of books */}
            <BooksList />
        </div>
    );
}

export default App; // Export the App component for use in other parts of the app
