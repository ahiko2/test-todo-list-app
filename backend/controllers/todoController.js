const { v4: uuidv4 } = require('uuid');
const db = require('../db/connection');

const TodoController = {
  async getAllTodos(req, res, next) {
    try {
      const [results] = await db.promise().query('SELECT * FROM todos');
      res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async createTodo(req, res, next) {
    try {
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
      await db.promise().query(sql, [
        newTodo.id,
        newTodo.task,
        newTodo.completed,
        newTodo.time,
        newTodo.tag,
        newTodo.priority,
        newTodo.note
      ]);

      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  },

  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // First check if the todo exists
      const [existing] = await db.promise().query('SELECT * FROM todos WHERE id = ?', [id]);
      
      if (existing.length === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      // Merge existing data with updates
      const currentTodo = existing[0];
      const updatedTodo = {
        task: updates.task ?? currentTodo.task,
        completed: updates.completed ?? currentTodo.completed,
        time: updates.time ?? currentTodo.time,
        tag: updates.tag ?? currentTodo.tag,
        priority: updates.priority ?? currentTodo.priority,
        note: updates.note ?? currentTodo.note
      };

      const sql = 'UPDATE todos SET task = ?, completed = ?, time = ?, tag = ?, priority = ?, note = ? WHERE id = ?';
      const [result] = await db.promise().query(sql, [
        updatedTodo.task,
        updatedTodo.completed,
        updatedTodo.time,
        updatedTodo.tag,
        updatedTodo.priority,
        updatedTodo.note,
        id
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.json({ id, ...updatedTodo });
    } catch (error) {
      console.error('Error updating todo:', error);
      next(error);
    }
  },

  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const [result] = await db.promise().query('DELETE FROM todos WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.json({ message: 'Todo deleted' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = TodoController;