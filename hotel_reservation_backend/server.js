require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const verifyToken = require("./middleware/auth"); // Import the middleware

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL database ✅");
});

// Admin Registration Route (One-time setup)
app.post(
    "/admin/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = "INSERT INTO Admins (username, password) VALUES (?, ?)";
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Admin registered successfully!" });
        });
    }
);

// Admin Login Route
app.post(
    "/admin/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    (req, res) => {
        const { username, password } = req.body;

        const query = "SELECT * FROM Admins WHERE username = ?";
        db.query(query, [username], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

            const admin = results[0];
            if (!bcrypt.compareSync(password, admin.password))
                return res.status(401).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
                expiresIn: "72h",
            });

            res.json({ message: "Login successful", token });
        });
    }
);

// Protected Route Example
app.get("/admin/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard", admin: req.admin });
});

// Import Routes
const customersRouter = require("./routes/customers");
const roomRoutes = require("./routes/rooms");
const reservationRoutes = require("./routes/reservations");

app.use("/customers", verifyToken, customersRouter); // Customers API (protected)
app.use("/rooms", verifyToken, roomRoutes); // Ensure rooms are protected
app.use("/reservations", verifyToken, reservationRoutes); // Ensure reservations are protected

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});
