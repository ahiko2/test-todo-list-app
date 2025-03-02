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
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/todos`)
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError('Failed to load todos. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Add a new todo
  const addTodo = todoData => {
    axios.post(`${API_BASE_URL}/todos`, todoData)
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
  };

  // Update a todo
  const updateTodo = (id, updates) => {
    axios.put(`${API_BASE_URL}/todos/${id}`, updates)
      .then(response => {
        setTodos(todos.map(todo => 
          todo.id === id ? response.data : todo
        ));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  // Delete a todo
  const deleteTodo = id => {
    axios.delete(`${API_BASE_URL}/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="todo-list">
      <TodoForm addTodo={addTodo} />
      {todos.length === 0 ? (
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
