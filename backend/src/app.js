
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all requests

const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config(); // Load environment variables

app.use(express.json()); // Middleware for JSON requests

app.use('/api', studentRoutes); // Use student routes

module.exports = app;
