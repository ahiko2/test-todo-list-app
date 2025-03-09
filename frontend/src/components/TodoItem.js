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
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const handleUpdate = async () => {
    if (!editTask.trim() || isUpdating) return;
    
    setIsUpdating(true);
    setUpdateError('');
    
    try {
      await updateTodo(todo.id, {
        task: editTask.trim(),
        time: editTime,
        tag: editTag,
        priority: editPriority,
        note: editNote,
        completed: todo.completed
      });
      setIsEditing(false);
    } catch (error) {
      setUpdateError(error.userMessage || 'Failed to update todo');
      console.error('Update error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error("Error during delete:", error);
      setIsDeleting(false);
    }
  };

  const toggleComplete = async () => {
    setIsUpdating(true);
    try {
      await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    } catch (error) {
      console.error("Error toggling complete:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTaskClick = () => {
    if (!isEditing) {
      setShowDetails(!showDetails);
    }
  };

  const getPriorityBorderColor = () => {
    switch(todo.priority) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-400';
      case 'low':
        return 'border-l-4 border-green-500';
      default:
        return 'border-l-4 border-gray-300';
    }
  };

  return (
    <li className={`mb-2.5 p-2.5 rounded bg-gray-50 flex flex-col w-[100%] ${todo.completed ? 'bg-gray-100 text-gray-600' : ''} ${getPriorityBorderColor()}`}>
      {isEditing ? (
        <div className="p-2.5 bg-gray-100 rounded w-full box-border">
          {updateError && (
            <div className="mb-2.5 p-2 bg-red-50 text-red-600 rounded text-sm">
              {updateError}
            </div>
          )}
          <div className="mb-2.5">
            <label className="block mb-1 font-bold">Task:</label>
            <input
              className="w-full p-1.5 border border-gray-300 rounded box-border"
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-2.5">
            <label className="block mb-1 font-bold">Time:</label>
            <input
              className="w-full p-1.5 border border-gray-300 rounded box-border"
              type="time"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />
          </div>
          
          <div className="mb-2.5">
            <label className="block mb-1 font-bold">Tag:</label>
            <input
              className="w-full p-1.5 border border-gray-300 rounded box-border"
              type="text"
              value={editTag}
              onChange={(e) => setEditTag(e.target.value)}
            />
          </div>
          
          <div className="mb-2.5">
            <label className="block mb-1 font-bold">Priority:</label>
            <select 
              className="w-full p-1.5 border border-gray-300 rounded box-border"
              value={editPriority} 
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="mb-2.5">
            <label className="block mb-1 font-bold">Note:</label>
            <textarea
              className="w-full p-1.5 border border-gray-300 rounded box-border"
              value={editNote}
              onChange={(e) => setEditNote(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="mt-2.5 flex justify-end">
            <button 
              className={`ml-1 py-1 px-2.5 text-white border-none rounded cursor-pointer ${
                isUpdating || !editTask.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={handleUpdate} 
              disabled={isUpdating || !editTask.trim()}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button 
              className="ml-1 py-1 px-2.5 bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600"
              onClick={() => {
                setIsEditing(false);
                setUpdateError('');
                // Reset form to original values
                setEditTask(todo.task);
                setEditTime(todo.time || '');
                setEditTag(todo.tag || '');
                setEditPriority(todo.priority || 'medium');
                setEditNote(todo.note || '');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center w-full">
            <input
              type="checkbox"
              className="mr-2 scale-110"
              checked={todo.completed}
              onChange={toggleComplete}
              disabled={isUpdating}
            />
            <span 
              className={`${todo.completed ? 'line-through' : ''} mx-2 cursor-pointer flex-grow`}
              onClick={handleTaskClick}
            >
              {todo.task}
              {todo.time && <small className="text-gray-500 text-xs ml-1"> ({todo.time})</small>}
              {todo.tag && <span className="bg-blue-100 text-blue-800 text-xs py-0.5 px-1.5 rounded ml-1">{todo.tag}</span>}
            </span>
            <div className="flex min-w-[110px] justify-end">
              <button 
                className="ml-1 py-1 px-2 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600 text-xs"
                onClick={() => setIsEditing(true)}
                disabled={isUpdating}
              >
                Edit
              </button>
              <button 
                className={`ml-1 py-1 px-2 ${isDeleting || isUpdating ? 'bg-gray-400' : 'bg-red-500'} text-white border-none rounded cursor-pointer hover:bg-red-600 text-xs`}
                onClick={handleDelete} 
                disabled={isDeleting || isUpdating}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
          
          <div className={`mt-2.5 overflow-hidden transition-all duration-300 rounded shadow-md bg-white text-sm w-full ${showDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gray-100 py-2 px-3 border-b border-gray-300 rounded-t w-full box-border">
              <h4 className="m-0 text-gray-800 text-base">Task Details</h4>
            </div>
            <div className="p-3 w-full box-border">
              <div className="mb-2.5 flex items-start w-full">
                <span className="mr-2 text-lg w-5 text-center">⏰</span>
                <span className="font-semibold w-[70px] text-gray-600">Time:</span>
                <span className="text-gray-800 flex-1">{todo.time || 'Not set'}</span>
              </div>
              <div className="mb-2.5 flex items-start w-full">
                <span className="mr-2 text-lg w-5 text-center">🏷️</span>
                <span className="font-semibold w-[70px] text-gray-600">Tag:</span>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-sm py-0.5 px-2 rounded-full">
                  {todo.tag || 'None'}
                </span>
              </div>
              <div className="mb-2.5 flex items-start w-full">
                <span className="mr-2 text-lg w-5 text-center">⚡</span>
                <span className="font-semibold w-[70px] text-gray-600">Priority:</span>
                <span className={`inline-block py-0.5 px-2 rounded-full text-sm font-semibold
                  ${todo.priority === 'high' ? 'bg-red-100 text-red-600' : 
                    todo.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'}`}
                >
                  {todo.priority ? todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) : 'Medium'}
                </span>
              </div>
              {todo.note && (
                <div className="mb-2.5 flex items-start w-full">
                  <span className="mr-2 text-lg w-5 text-center">📝</span>
                  <span className="font-semibold w-[70px] text-gray-600">Note:</span>
                  <div className="flex-1 bg-gray-50 p-2 rounded border-l-2 border-gray-300 whitespace-pre-line">
                    {todo.note}
                  </div>
                </div>
              )}
              {!todo.note && (
                <div className="mb-2.5 flex items-start w-full">
                  <span className="mr-2 text-lg w-5 text-center">📝</span>
                  <span className="font-semibold w-[70px] text-gray-600">Note:</span>
                  <span className="text-gray-800 flex-1">No notes</span>
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
