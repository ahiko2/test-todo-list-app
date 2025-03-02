// src/components/TodoForm.js

import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [task, setTask] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [time, setTime] = useState('');
  const [tag, setTag] = useState('');
  const [priority, setPriority] = useState('medium');
  const [note, setNote] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.trim()) return;
    
    // Create todo object with all fields
    const todoData = {
      task,
      time,
      tag,
      priority,
      note
    };
    
    addTodo(todoData);
    
    // Reset form
    setTask('');
    setTime('');
    setTag('');
    setPriority('medium');
    setNote('');
    setShowAdvanced(false);
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit}>
        <div className="basic-form">
          <input
            type="text"
            value={task}
            placeholder="Add a new task..."
            onChange={e => setTask(e.target.value)}
          />
          <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? 'Hide Details' : 'Show Details'}
          </button>
          <button type="submit">Add</button>
        </div>
        
        {showAdvanced && (
          <div className="advanced-form">
            <div className="form-row">
              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <label>Tag:</label>
              <input
                type="text"
                value={tag}
                placeholder="e.g., work, personal, shopping"
                onChange={e => setTag(e.target.value)}
              />
            </div>
            
            <div className="form-row">
              <label>Priority:</label>
              <select 
                value={priority} 
                onChange={e => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-row">
              <label>Note:</label>
              <textarea
                value={note}
                placeholder="Add notes here..."
                onChange={e => setNote(e.target.value)}
                rows="3"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TodoForm;
