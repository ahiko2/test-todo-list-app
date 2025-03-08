// src/components/TodoList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './Todo.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the API base URL to match your backend
  const API_BASE_URL = 'http://localhost:8888';

  // Fetch todos from the backend
  const fetchTodos = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/todos`)
      .then(response => {
        setTodos(response.data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
        setLoading(false);
      });
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = todoData => {
    // Ensure all required fields are present
    const newTodo = {
      task: todoData.task,
      completed: false,
      time: todoData.time || '',
      tag: todoData.tag || '',
      priority: todoData.priority || 'medium',
      note: todoData.note || ''
    };

    setLoading(true);
    axios.post(`${API_BASE_URL}/todos`, newTodo)
      .then(response => {
        setTodos([...todos, response.data]);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error adding todo:', error);
        setError('Failed to add todo. Please try again.');
        setLoading(false);
      });
  };

  // Update a todo
  const updateTodo = (id, updates) => {
    // First get the current todo
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo) return;

    // Merge updates with current todo to ensure all fields are present
    const updatedTodo = { ...currentTodo, ...updates };

    setLoading(true);
    axios.put(`${API_BASE_URL}/todos/${id}`, updatedTodo)
      .then(response => {
        setTodos(todos.map(todo => todo.id === id ? response.data : todo));
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
        setError('Failed to update todo. Please try again.');
        setLoading(false);
      });
  };

  // Delete a todo
  const deleteTodo = id => {
    setLoading(true);
    axios.delete(`${API_BASE_URL}/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
        setError('Failed to delete todo. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="todo-list">
      {error && <div className="error">{error}</div>}
      <TodoForm addTodo={addTodo} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
