const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");
const studentRoutes = require("./src/routes/student");

const app = express();
app.use(express.json());
app.use(cors());

// Register routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

// Debugging log to ensure server starts correctly
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
