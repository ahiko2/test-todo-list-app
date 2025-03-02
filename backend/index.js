// backend/index.js

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory todos array with completed property
let todos = [];


// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const newTodo = { 
    id: uuidv4(), 
    task: req.body.task,
    completed: false,
    time: req.body.time || '',
    tag: req.body.tag || '',
    priority: req.body.priority || 'medium',
    note: req.body.note || ''
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed, time, tag, priority, note } = req.body;
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  
  // Update the todo with new values, keeping existing values if not provided
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...(task !== undefined && { task }),
    ...(completed !== undefined && { completed }),
    ...(time !== undefined && { time }),
    ...(tag !== undefined && { tag }),
    ...(priority !== undefined && { priority }),
    ...(note !== undefined && { note })
  };
  
  res.json(todos[todoIndex]);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: 'Todo deleted' });
});

// Start the server
app.listen(8888, () => {
  console.log('Backend server is running on http://localhost:8888');
});
