const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
    const { sort_by = "id", order = "ASC" } = req.query;
    
    // Allowed columns for sorting
    const validSortColumns = ["id", "room_number", "type", "price", "status"]; 
    const validOrder = ["ASC", "DESC"];

    // Validate input
    if (!validSortColumns.includes(sort_by) || !validOrder.includes(order.toUpperCase())) {
        return res.status(400).json({ error: "Invalid sort column or order" });
    }

    // Construct safe query
    const query = `SELECT * FROM Rooms ORDER BY ${sort_by} ${order.toUpperCase()}`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// ✅ Add a new room
router.post("/", verifyToken, (req, res) => {
    const { room_number, type, price, status } = req.body;
    const query = "INSERT INTO Rooms (room_number, type, price, status) VALUES (?, ?, ?, ?)";
    
    db.query(query, [room_number, type, price, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Room added successfully!", id: result.insertId });
    });
});

// ✅ Update a room's details
router.put("/:id", verifyToken, (req, res) => {
    const { room_number, type, price, status } = req.body;
    const query = "UPDATE Rooms SET room_number = ?, type = ?, price = ?, status = ? WHERE id = ?";

    db.query(query, [room_number, type, price, status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Room updated successfully!" });
    });
});

// ✅ Delete a room
router.delete("/:id", verifyToken, (req, res) => {
    db.query("DELETE FROM Rooms WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Room deleted successfully!" });
    });
});

module.exports = router;
