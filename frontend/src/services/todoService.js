import axios from 'axios';
import { API_CONFIG } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const TodoService = {
  async getAllTodos() {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.TODOS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createTodo(todoData) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.TODOS, todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateTodo(id, updates) {
    try {
      if (!id) throw new Error('Todo ID is required');
      const response = await api.put(`${API_CONFIG.ENDPOINTS.TODOS}/${id}`, updates);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTodo(id) {
    try {
      if (!id) throw new Error('Todo ID is required');
      await api.delete(`${API_CONFIG.ENDPOINTS.TODOS}/${id}`);
    } catch (error) {
      throw error;
    }
  }
};