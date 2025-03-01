const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db"); // Database connection
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, phone, password, role = "owner" } = req.body; // Default role: owner

        // Check if user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user with role
        const newUser = await pool.query(
            "INSERT INTO users (name, phone, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, phone, role",
            [name, phone, hashedPassword, role]
        );

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Send user details, including role
        res.status(200).json({
            message: "Login successful",
            id: user.rows[0].user_id,
            name: user.rows[0].name,
            role: user.rows[0].role,
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
