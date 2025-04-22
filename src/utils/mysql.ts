/**
 * MySQL database utility
 *
 * IMPORTANT: This file contains the MySQL implementation which is commented out
 * for Tempolab compatibility. Uncomment the code when deploying to a production
 * environment with MySQL support.
 */

// import mysql from 'mysql2/promise';
// import { MYSQL_CONFIG } from '@/config/database.config';

/**
 * MySQL connection pool
 * Uncomment this in production to enable MySQL support
 */
// const pool = mysql.createPool(MYSQL_CONFIG);

/**
 * Execute a MySQL query with parameters
 */
export const query = async <T>(sql: string, params?: any[]): Promise<T> => {
  // Uncomment this in production to enable MySQL support
  /*
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database query failed: ${(error as Error).message}`);
  }
  */

  // This is a placeholder that will be removed in production
  throw new Error("MySQL is not enabled in this environment");
};

/**
 * Execute a transaction with multiple queries
 */
export const transaction = async <T>(
  callback: (connection: any) => Promise<T>,
): Promise<T> => {
  // Uncomment this in production to enable MySQL support
  /*
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  */

  // This is a placeholder that will be removed in production
  throw new Error("MySQL is not enabled in this environment");
};

/**
 * Initialize the database connection
 */
export const initializeDatabase = async (): Promise<void> => {
  // Uncomment this in production to enable MySQL support
  /*
  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log('MySQL database connected successfully');
    connection.release();
    
    // Initialize database schema if needed
    await initializeSchema();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
  */

  console.log("MySQL is not enabled in this environment");
};

/**
 * Initialize the database schema
 */
async function initializeSchema(): Promise<void> {
  // Uncomment this in production to enable MySQL support
  /*
  // Create users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email)
    )
  `);
  
  // Create sessions table
  await query(`
    CREATE TABLE IF NOT EXISTS sessions (
      id VARCHAR(36) PRIMARY KEY,
      userId VARCHAR(36) NOT NULL,
      token VARCHAR(255) NOT NULL UNIQUE,
      expiresAt TIMESTAMP NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_token (token),
      INDEX idx_userId (userId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
  
  // Create password_resets table
  await query(`
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
    )
  `);
  
  // Create permissions table
  await query(`
    CREATE TABLE IF NOT EXISTS permissions (
      id VARCHAR(36) PRIMARY KEY,
      role VARCHAR(50) NOT NULL UNIQUE,
      permissions JSON NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  
  // Insert default permissions if they don't exist
  await query(`
    INSERT IGNORE INTO permissions (id, role, permissions)
    VALUES 
      (UUID(), 'admin', JSON_ARRAY('view_dashboard', 'manage_users', 'manage_ai_models', 'manage_context_rules', 'manage_prompt_templates', 'view_analytics', 'manage_web_scraping', 'manage_integration', 'manage_system_config', 'manage_knowledge_base')),
      (UUID(), 'user', JSON_ARRAY('view_dashboard', 'view_analytics')),
      (UUID(), 'guest', JSON_ARRAY())
  `);
  */
}
