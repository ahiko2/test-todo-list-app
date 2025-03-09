// src/components/TodoForm.js

import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [task, setTask] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [time, setTime] = useState('');
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('medium');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.trim()) return;
    
    // Prevent double submission
    if (submitting) return;
    
    setSubmitting(true);
    
    // Create todo object with all fields
    const todoData = {
      task: task.trim(),
      time,
      tag,
      priority,
      note
    };
    
    // Call parent component's addTodo function
    addTodo(todoData);
    
    // Reset form
    setTask('');
    setTime('');
    setTag('');
    setPriority('medium');
    setNote('');
    setShowAdvanced(false);
    
    // Allow form submission again
    setTimeout(() => setSubmitting(false), 500);
  };

  return (
    <div className="mb-5 w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-2.5">
          <input
            type="text"
            value={task}
            placeholder="Add a new task..."
            onChange={e => setTask(e.target.value)}
            required
            className="w-full p-2.5 border border-gray-300 rounded text-base box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="flex justify-between mb-4">
          <button 
            type="button" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex-1 py-2 px-3 bg-blue-500 text-white border-none rounded cursor-pointer text-sm mr-2.5 hover:bg-blue-600"
          >
            {showAdvanced ? 'Hide Details' : 'Show Details'}
          </button>
          <button 
            type="submit" 
            disabled={!task.trim() || submitting}
            className={`flex-1 py-2 px-3 ml-2.5 text-white border-none rounded cursor-pointer text-sm ${!task.trim() || submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {submitting ? 'Adding...' : 'Add'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="bg-gray-50 p-4 rounded mb-2.5 w-full box-border">
            <div className="mb-2.5">
              <label className="block mb-1 font-semibold">Time:</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div className="mb-2.5">
              <label className="block mb-1 font-semibold">Tag:</label>
              <input
                type="text"
                value={tag}
                placeholder="e.g., work, personal, shopping"
                onChange={e => setTag(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div className="mb-2.5">
              <label className="block mb-1 font-semibold">Priority:</label>
              <select 
                value={priority} 
                onChange={e => setPriority(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded box-border focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="mb-2.5">
              <label className="block mb-1 font-semibold">Note:</label>
              <textarea
                value={note}
                placeholder="Add notes here..."
                onChange={e => setNote(e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded box-border resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TodoForm;
