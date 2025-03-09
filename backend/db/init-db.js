// db/init-db.js
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
};

async function initializeDatabase() {
  let connection;
  
  try {
    // First connect without database to create it if needed
    connection = await mysql.createConnection(dbConfig);

    console.log('Connected to MySQL server');
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'todo_app';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database ${dbName} created or already exists`);
    
    // Use the database
    await connection.query(`USE ${dbName}`);
    
    // Read SQL initialization file
    const sqlFile = path.join(__dirname, 'migrations', 'init.sql');
    const initSql = fs.readFileSync(sqlFile, 'utf8');
    
    console.log('Running database initialization script...');
    
    // Execute SQL initialization
    await connection.query(initSql);
    
    console.log('Database initialization completed successfully');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase();