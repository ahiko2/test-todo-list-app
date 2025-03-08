const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import and use routes
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);

// Start the server
app.listen(8888, () => {
  console.log('Backend server is running on http://localhost:8888');
});