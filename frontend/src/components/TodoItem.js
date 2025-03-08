// src/components/TodoItem.js

import React, { useState } from 'react';

function TodoItem({ todo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editTask, setEditTask] = useState(todo.task);
  const [editTime, setEditTime] = useState(todo.time || '');
  const [editTag, setEditTag] = useState(todo.tag || '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editNote, setEditNote] = useState(todo.note || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = () => {
    if (!editTask.trim()) return;
    
    updateTodo(todo.id, { 
      task: editTask.trim(),
      time: editTime,
      tag: editTag,
      priority: editPriority,
      note: editNote,
      completed: todo.completed
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (isDeleting) return; // Prevent double clicks
    setIsDeleting(true);
    
    try {
      deleteTodo(todo.id);
    } catch (error) {
      console.error("Error during delete:", error);
      setIsDeleting(false);
    }
  };

  const toggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleTaskClick = () => {
    if (!isEditing) {
      setShowDetails(!showDetails);
    }
  };

  return (
    <li className={`${todo.completed ? 'completed' : ''} ${todo.priority ? `priority-${todo.priority}` : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <div className="edit-field">
            <label>Task:</label>
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              required
            />
          </div>
          
          <div className="edit-field">
            <label>Time:</label>
            <input
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />
          </div>
          
          <div className="edit-field">
            <label>Tag:</label>
            <input
              type="text"
              value={editTag}
              onChange={(e) => setEditTag(e.target.value)}
            />
          </div>
          
          <div className="edit-field">
            <label>Priority:</label>
            <select 
              value={editPriority} 
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="edit-field">
            <label>Note:</label>
            <textarea
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="edit-buttons">
            <button onClick={handleUpdate} disabled={!editTask.trim()}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="view-mode">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleComplete}
            />
            <span 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                marginLeft: '8px',
                marginRight: '8px',
                cursor: 'pointer'
              }}
              onClick={handleTaskClick}
            >
              {todo.task}
              {todo.time && <small className="todo-time"> ({todo.time})</small>}
              {todo.tag && <span className="todo-tag">{todo.tag}</span>}
            </span>
            <div className="button-group">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button 
                onClick={handleDelete} 
                disabled={isDeleting}
                style={{ backgroundColor: isDeleting ? '#ccc' : '' }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          
          <div className={`todo-details ${showDetails ? 'show' : ''}`}>
            <div className="details-header">
              <h4>Task Details</h4>
            </div>
            <div className="details-content">
              <div className="detail-row">
                <span className="detail-icon">⏰</span>
                <span className="detail-label">Time:</span>
                <span className="detail-value">{todo.time || 'Not set'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🏷️</span>
                <span className="detail-label">Tag:</span>
                <span className="detail-value tag-pill">{todo.tag || 'None'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">⚡</span>
                <span className="detail-label">Priority:</span>
                <span className={`detail-value priority-badge priority-${todo.priority || 'medium'}`}>
                  {todo.priority ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) : 'Medium'}
                </span>
              </div>
              {todo.note && (
                <div className="detail-row note-row">
                  <span className="detail-icon">📝</span>
                  <span className="detail-label">Note:</span>
                  <div className="note-content">{todo.note}</div>
                </div>
              )}
              {!todo.note && (
                <div className="detail-row">
                  <span className="detail-icon">📝</span>
                  <span className="detail-label">Note:</span>
                  <span className="detail-value">No notes</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
