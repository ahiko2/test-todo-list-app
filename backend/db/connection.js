const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  port: parseInt(process.env.DB_PORT || '3306'),
  multipleStatements: true
};

// Create connection pool instead of single connection for better performance
const pool = mysql.createPool(config);
const promisePool = pool.promise();

// Initialize database and tables
async function initializeDatabase() {
  try {
    // Create database if it doesn't exist
    await promisePool.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
    await promisePool.query(`USE ${config.database}`);
    
    // Read and execute initialization SQL
    const initSqlPath = path.join(__dirname, 'migrations', 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf-8');
    await promisePool.query(initSql);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Initialize database on first import
initializeDatabase().catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

module.exports = pool;