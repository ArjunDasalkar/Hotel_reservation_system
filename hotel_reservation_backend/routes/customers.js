const express = require("express");
const router = express.Router();
const db = require("../db"); // Import database connection
const verifyToken = require("../middleware/auth");

// Create a new customer (POST)
router.post("/", (req, res) => {
    const { name, email, phone, aadhaar } = req.body;
    const query = "INSERT INTO Customers (name, email, phone, aadhaar) VALUES (?, ?, ?, ?)";
    
    db.query(query, [name, email, phone, aadhaar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer added successfully!", id: result.insertId });
    });
});

// Get all customers with sorting (GET)
router.get("/", verifyToken, (req, res) => {
    const { sort_by = "id", order = "ASC" } = req.query;

    // Allowed sorting columns
    const validSortColumns = ["id", "name"];
    const validOrder = ["ASC", "DESC"];

    // Validate input
    if (!validSortColumns.includes(sort_by) || !validOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid sort column or order" });
    }

    // Construct and execute query
    const query = `SELECT * FROM Customers ORDER BY ${sort_by} ${order.toUpperCase()}`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update a customer (PUT)
router.put("/:id", (req, res) => {
    const { name, email, phone, aadhaar } = req.body;
    const query = "UPDATE Customers SET name=?, email=?, phone=?, aadhaar=? WHERE id=?";
    
    db.query(query, [name, email, phone, aadhaar, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer updated successfully!" });
    });
});

// Delete a customer (DELETE)
router.delete("/:id", (req, res) => {
    const query = "DELETE FROM Customers WHERE id=?";
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer deleted successfully!" });
    });
});

module.exports = router;
