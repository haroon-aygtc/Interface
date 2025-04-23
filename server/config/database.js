/**
 * Database configuration
 */

// Load environment variables
require("dotenv").config();

// MySQL configuration
const MYSQL_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "auth_db",
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "10", 10),
  connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000", 10),
  waitForConnections: true,
  queueLimit: 0,
};

// Database mode - 'mock' for JSON-based, 'mysql' for MySQL
const DB_MODE = process.env.DB_MODE || "mock";

// Mock database file paths
const MOCK_DB_PATHS = {
  USERS: "db.json",
  SESSIONS: "db.json",
  PASSWORD_RESETS: "db.json",
  PERMISSIONS: "db.json",
};

module.exports = {
  MYSQL_CONFIG,
  DB_MODE,
  MOCK_DB_PATHS,
};
