const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get Student Info by phone
router.get("/:phone", async (req, res) => {
    try {
        const { phone } = req.params;

        // Fetch student details using phone number (including all relevant fields)
        const studentResult = await pool.query(
            "SELECT name, university, location, schedule, attendance, phone FROM students WHERE phone = $1",
            [phone]
        );

        if (studentResult.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Fetch the user info (if needed, e.g., for name and phone confirmation)
        const userResult = await pool.query(
            "SELECT name, phone FROM users WHERE phone = $1",
            [phone]
        );

        // Merge student and user data (including university, location, etc.)
        const studentData = { ...studentResult.rows[0], ...userResult.rows[0] };

        res.status(200).json(studentData); // Send merged data (including all fields)
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
