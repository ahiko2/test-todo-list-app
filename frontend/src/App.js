// src/App.js

import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded shadow-md">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-5">ToDo List App</h1>
      <TodoList />
    </div>
  );
}

export default App;
