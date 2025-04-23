-- MySQL initialization script
-- Run this script to set up the database schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS auth_db;

-- Use the database
USE auth_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_userId (userId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create password_resets table
CREATE TABLE IF NOT EXISTS password_resets (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  INDEX idx_token (token),
  INDEX idx_userId (userId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id VARCHAR(36) PRIMARY KEY,
  role VARCHAR(50) NOT NULL UNIQUE,
  permissions JSON NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default permissions
INSERT IGNORE INTO permissions (id, role, permissions)
VALUES 
  (UUID(), 'admin', JSON_ARRAY('view_dashboard', 'manage_users', 'manage_ai_models', 'manage_context_rules', 'manage_prompt_templates', 'view_analytics', 'manage_web_scraping', 'manage_integration', 'manage_system_config', 'manage_knowledge_base')),
  (UUID(), 'user', JSON_ARRAY('view_dashboard', 'view_analytics')),
  (UUID(), 'guest', JSON_ARRAY());

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (id, name, email, password, role, createdAt, updatedAt)
VALUES (UUID(), 'Admin User', 'admin@example.com', '$2a$10$XQCg1z4YUl0cCDhRPQN8a.eOzVJRTI8.zsM.FILXCn7IxxYJwmRaK', 'admin', NOW(), NOW());

-- Insert default test user (password: user123)
INSERT IGNORE INTO users (id, name, email, password, role, createdAt, updatedAt)
VALUES (UUID(), 'Test User', 'user@example.com', '$2a$10$XQCg1z4YUl0cCDhRPQN8a.eOzVJRTI8.zsM.FILXCn7IxxYJwmRaK', 'user', NOW(), NOW());
