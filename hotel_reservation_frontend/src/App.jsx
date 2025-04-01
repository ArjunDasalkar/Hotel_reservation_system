// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Route - Login */}
                <Route path="/" element={<Login />} />

                {/* Protected Route - Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* Protected Route - Customers */}
                <Route
                    path="/customers"
                    element={
                        <PrivateRoute>
                            <Customers />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
