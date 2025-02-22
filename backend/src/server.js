const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes');

// Middleware
app.use(express.json());
app.use(cors()); // CORS FIX

// Routes
app.use('/api', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
