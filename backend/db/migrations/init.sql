CREATE TABLE IF NOT EXISTS todos (
  id VARCHAR(36) PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  time VARCHAR(255),
  tag VARCHAR(255),
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  note TEXT
);