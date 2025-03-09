const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
const studentRoutes = require("./src/routes/student");
app.use("/students", studentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
