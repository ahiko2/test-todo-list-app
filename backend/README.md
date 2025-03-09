# Todo List Backend API

The backend API for the Todo List application built with Node.js, Express, and SQLite.

## Overview

This Node.js application provides a RESTful API for managing todo items. It handles CRUD operations for todos and persists data using a SQLite database.

## Features

- RESTful API design
- Full CRUD operations for todo items
- Data persistence with SQLite database
- Clean separation of routes and database logic
- Error handling and validation

## Project Structure

```
backend/
  ├── db/               # Database related files
  │   ├── config.js          # Database configuration
  │   ├── connection.js      # Database connection setup
  │   └── migrations/        # SQL migration scripts
  │       └── init.sql       # Initial database schema
  ├── routes/           # API route handlers
  │   └── todos.js           # Todo CRUD endpoints
  ├── index.js          # Application entry point
  └── package.json      # Project dependencies and scripts
```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo by ID
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo by ID
- `DELETE /api/todos/:id` - Delete a todo by ID

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies
   ```
   npm install
   ```

2. Initialize the database
   ```
   npm run init-db
   ```

3. Start the server
   ```
   npm start
   ```

4. The API will be available at `http://localhost:5000`

## Available Scripts

- `npm start` - Starts the server
- `npm run dev` - Starts the server in development mode with nodemon
- `npm run init-db` - Initializes the database with schema

## Todo Data Structure

```json
{
  "id": 1,
  "task": "Complete project documentation",
  "completed": false,
  "priority": "high",
  "tag": "work",
  "time": "14:30",
  "note": "Include all API endpoints and database schema details"
}
```

## Database

The application uses SQLite for data persistence. The database schema is defined in `db/migrations/init.sql`.

## Error Handling

The API includes comprehensive error handling for invalid requests, missing resources, and server errors.