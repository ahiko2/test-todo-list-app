const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');
const db = require('./db/connection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Error handling
app.use(errorHandler);

// Get port from environment variable with fallback
const PORT = process.env.PORT || 8888;

// Only start server if database connection is successful
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  connection.release();
  
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
});