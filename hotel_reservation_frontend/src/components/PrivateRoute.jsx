// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/" />; // Redirect to login if no token
    }
    return children; // Show protected content if token is present
};

export default PrivateRoute;
