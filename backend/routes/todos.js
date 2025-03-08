const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/connection'); // Import MySQL connection

const router = express.Router();

// Get all todos
router.get('/', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// Add a new todo
router.post('/', (req, res) => {
  const newTodo = {
    id: uuidv4(),
    task: req.body.task,
    completed: false,
    time: req.body.time || '',
    tag: req.body.tag || '',
    priority: req.body.priority || 'medium',
    note: req.body.note || ''
  };

  const sql = 'INSERT INTO todos (id, task, completed, time, tag, priority, note) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [newTodo.id, newTodo.task, newTodo.completed, newTodo.time, newTodo.tag, newTodo.priority, newTodo.note], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(newTodo);
  });
});

// Update a todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed, time, tag, priority, note } = req.body;

  const sql = 'UPDATE todos SET task = ?, completed = ?, time = ?, tag = ?, priority = ?, note = ? WHERE id = ?';
  db.query(sql, [task, completed, time, tag, priority, note, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ id, task, completed, time, tag, priority, note });
  });
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  });
});

module.exports = router;