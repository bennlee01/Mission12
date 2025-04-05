import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Custom styles for the app (if any)
import App from './App'; // Main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import reportWebVitals from './reportWebVitals';

// Create the root of the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component wrapped in React.StrictMode (helps with debugging)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Optionally measure performance and log results
reportWebVitals();
