/**
 * Database connection utility
 */

const mysql = require("mysql2/promise");

class DatabaseConnection {
  constructor(config) {
    this.config = config;
    this.pool = null;
  }

  /**
   * Initialize the connection pool
   */
  async init() {
    if (!this.pool) {
      this.pool = mysql.createPool(this.config);

      // Test the connection
      try {
        const connection = await this.pool.getConnection();
        console.log("Database connection established successfully.");
        connection.release();
      } catch (error) {
        console.error("Failed to establish database connection:", error);
        throw error;
      }
    }
    return this.pool;
  }

  /**
   * Execute a query
   */
  async query(sql, params = []) {
    if (!this.pool) {
      await this.init();
    }

    try {
      const [results] = await this.pool.execute(sql, params);
      return results;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error(`Database query failed: ${error.message}`);
    }
  }

  /**
   * Execute a transaction
   */
  async transaction(callback) {
    if (!this.pool) {
      await this.init();
    }

    const connection = await this.pool.getConnection();
    await connection.beginTransaction();

    try {
      const result = await callback({
        query: async (sql, params = []) => {
          const [results] = await connection.execute(sql, params);
          return results;
        },
      });

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Close the connection pool
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
      console.log("Database connection closed.");
    }
  }
}

module.exports = DatabaseConnection;
