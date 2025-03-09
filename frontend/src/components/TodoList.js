// src/components/TodoList.js

import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { TodoService } from '../services/todoService';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await TodoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todoData) => {
    try {
      setLoading(true);
      const newTodo = await TodoService.createTodo(todoData);
      setTodos([...todos, newTodo]);
      setError(null);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      setLoading(true);
      const updatedTodo = await TodoService.updateTodo(id, updates);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setError(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await TodoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 w-full">
      {error && <div className="p-2.5 mb-5 text-center text-red-600 bg-red-50 rounded">{error}</div>}
      <TodoForm addTodo={addTodo} />
      {loading ? (
        <div className="text-center p-4 text-gray-600">Loading...</div>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <ul className="list-none p-0">
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
