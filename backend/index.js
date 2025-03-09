const express = require('express');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/production');
const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');
const db = require('./db/connection');

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/todos', todoRoutes);

// Error handling
app.use(errorHandler);

// Get port from configuration
const PORT = config.port;

// Only start server if database connection is successful
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  connection.release();
  
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
  });
});