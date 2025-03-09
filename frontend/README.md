# Todo List Frontend

The frontend for the Todo List application built with React.

## Overview

This React application provides a user interface for the Todo List application. It allows users to create, view, update, and delete todo items with features like priority levels, tags, and detailed notes.

## Features

- Interactive and responsive UI for managing todos
- Task organization with priorities (high, medium, low)
- Task categorization with tags
- Detailed view for each task with expanded information
- Mark tasks as completed
- Real-time form validation
- Intuitive editing interface

## Project Structure

```
frontend/
  ├── public/         # Static files
  └── src/           
      ├── components/ # React components
      │   ├── Todo.css      # Styling for todo components
      │   ├── TodoForm.js   # Component for creating/editing todos
      │   ├── TodoItem.js   # Individual todo item component
      │   └── TodoList.js   # Container for todo items
      ├── App.js      # Main application component
      ├── index.css   # Global styles
      └── index.js    # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies
   ```
   npm install
   ```

2. Start the development server
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects the configuration files

## Component Details

### TodoForm

Handles the creation of new todo items with both basic and advanced options.

### TodoItem

Renders individual todo items with options to toggle completion, view details, edit, and delete.

### TodoList

Manages the list of todo items and communicates with the backend API.

## Styling

The application uses custom CSS with a clean, modern design focused on usability and accessibility.

## Connect to Backend

The frontend connects to the backend API running on `http://localhost:5000` by default. You can modify the API endpoint in the service files if needed.
