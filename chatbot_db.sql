CREATE DATABASE IF NOT EXISTS chatbot_db;
USE chatbot_db;

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(10) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default messages
INSERT INTO messages (sender, message) 
VALUES ('user', 'Hello, bot!'), 
       ('bot', 'Hello! How can I assist you today?');

SELECT * FROM messages;
