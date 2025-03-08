const express = require('express');
const cors = require('cors');
// Load environment variables
require('dotenv').config();
const db = require('./db/connection');

const app = express();
app.use(cors());
app.use(express.json());

// Import and use routes
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);

// Get port from environment variable with fallback to 8888
const PORT = process.env.PORT || 8888;

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});