const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./src/routes/auth");
const studentRoutes = require("./src/routes/student");

const app = express();
app.use(express.json());
app.use(cors());

// Create an HTTP server and attach WebSockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to match your frontend URL
    methods: ["GET", "POST"],
  },
});

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle student request to join a bus
  socket.on("student_request", (data) => {
    console.log("Student request received:", data);

    // Emit the request to all bus owners (or filter based on data)
    io.emit("new_request", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Register routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
