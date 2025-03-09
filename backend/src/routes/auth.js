const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // Database connection
const router = express.Router();


// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    const { name, phone, password } = req.body; // Ensure `name` is included

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "Name, phone, and password are required" });
    }

    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await pool.query("INSERT INTO users (name, phone, password, role) VALUES ($1, $2, $3, 'student')", [
      name, phone, hashedPassword,
    ]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Send user details, including role
    res.status(200).json({
      message: "Login successful",
      phone: result.rows[0].phone,
      role: result.rows[0].role,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
