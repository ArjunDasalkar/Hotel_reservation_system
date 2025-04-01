// src/components/Customers.jsx
import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../api';

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
            .then((data) => setCustomers(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
