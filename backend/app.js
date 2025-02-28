const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sequelize = require("./config/database"); // PostgreSQL connection
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to PostgreSQL
sequelize.sync()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
