const mysql = require('mysql2');
const config = require('./config');
const fs = require('fs');
const path = require('path');

// Create connection with configuration from env variables
const db = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port
});

// Connect to MySQL and create the database if it doesn't exist
const databaseName = config.database;
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    console.error('Please check your environment variables in .env file');
    return;
  }
  console.log('Connected to MySQL database.');
  db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err, result) => {
    if (err) throw err;
    console.log('Database created or already exists.');
    db.changeUser({ database: databaseName }, (err) => {
      if (err) throw err;
      console.log('Switched to database:', databaseName);

      // Execute the init.sql script to create the todos table
      const initSqlPath = path.join(__dirname, 'migrations', 'init.sql');
      const initSql = fs.readFileSync(initSqlPath, 'utf-8');
      db.query(initSql, (err, result) => {
        if (err) throw err;
        console.log('Todos table created or already exists.');
      });
    });
  });
});

module.exports = db;