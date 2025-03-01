const express = require("express");
const router = express.Router();

let busLocations = {}; // Store live locations in memory

// API to update bus location (POST)
router.post("/update-location", (req, res) => {
    const { bus_id, latitude, longitude } = req.body;

    if (!bus_id || !latitude || !longitude) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    busLocations[bus_id] = { latitude, longitude, timestamp: new Date() };

    res.json({ message: "Location updated successfully" });
});

// API to get bus locations (GET)
router.get("/get-location", (req, res) => {
    res.json(busLocations);
});

module.exports = router;
