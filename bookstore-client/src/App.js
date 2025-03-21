import React from 'react';
import './App.css';
import BooksList from './components/BooksList';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

function App() {
    return (
        <div className="App">
            <BooksList />
        </div>
    );
}

export default App;
