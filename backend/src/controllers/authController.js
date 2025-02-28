const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Signup
exports.signup = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ where: { phone_number } });
    if (user) return res.status(400).json({ message: "Phone number already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    user = await User.create({ phone_number, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { phone_number } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
