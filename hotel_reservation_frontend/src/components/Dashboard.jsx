// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <Link to="/customers">View Customers</Link>
            </nav>
        </div>
    );
};

export default Dashboard;
