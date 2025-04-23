/**
 * Database migration manager
 */

const mysql = require("mysql2/promise");
const migrations = require("../migrations");

class MigrationManager {
  constructor(config) {
    this.config = config;
    this.pool = null;
  }

  /**
   * Initialize the database connection
   */
  async init() {
    // Create a connection without database specified to check if it exists
    const { host, port, user, password, database } = this.config;
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    try {
      // Check if database exists
      const [rows] = await connection.execute(
        `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
        [database],
      );

      // Create database if it doesn't exist
      if (rows.length === 0) {
        console.log(`Database '${database}' does not exist. Creating...`);
        await connection.execute(`CREATE DATABASE ${database}`);
        console.log(`Database '${database}' created successfully.`);
      }

      // Switch to the database
      await connection.execute(`USE ${database}`);

      // Create migrations table if it doesn't exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Initialize the connection pool with the database
      this.pool = mysql.createPool(this.config);
    } finally {
      await connection.end();
    }
  }

  /**
   * Get the list of applied migrations
   */
  async getAppliedMigrations() {
    const [rows] = await this.pool.query(
      "SELECT name FROM migrations ORDER BY id",
    );
    return rows.map((row) => row.name);
  }

  /**
   * Apply pending migrations
   */
  async migrate() {
    if (!this.pool) {
      await this.init();
    }

    const appliedMigrations = await this.getAppliedMigrations();
    const pendingMigrations = migrations.filter(
      (m) => !appliedMigrations.includes(m.name),
    );

    if (pendingMigrations.length === 0) {
      console.log("No pending migrations to apply.");
      return;
    }

    console.log(`Applying ${pendingMigrations.length} migration(s)...`);

    for (const migration of pendingMigrations) {
      console.log(`Applying migration: ${migration.name}`);

      const connection = await this.pool.getConnection();
      await connection.beginTransaction();

      try {
        // Apply the migration
        await migration.up({
          query: async (sql, params = []) => {
            const [result] = await connection.execute(sql, params);
            return result;
          },
        });

        // Record the migration
        await connection.execute("INSERT INTO migrations (name) VALUES (?)", [
          migration.name,
        ]);

        await connection.commit();
        console.log(`Migration ${migration.name} applied successfully.`);
      } catch (error) {
        await connection.rollback();
        console.error(`Error applying migration ${migration.name}:`, error);
        throw error;
      } finally {
        connection.release();
      }
    }

    console.log("All migrations applied successfully.");
  }

  /**
   * Rollback the last applied migration
   */
  async rollback() {
    if (!this.pool) {
      await this.init();
    }

    const appliedMigrations = await this.getAppliedMigrations();

    if (appliedMigrations.length === 0) {
      console.log("No migrations to roll back.");
      return;
    }

    const lastMigrationName = appliedMigrations[appliedMigrations.length - 1];
    const lastMigration = migrations.find((m) => m.name === lastMigrationName);

    if (!lastMigration) {
      console.error(
        `Migration ${lastMigrationName} not found in migration files.`,
      );
      return;
    }

    console.log(`Rolling back migration: ${lastMigration.name}`);

    const connection = await this.pool.getConnection();
    await connection.beginTransaction();

    try {
      // Roll back the migration
      await lastMigration.down({
        query: async (sql, params = []) => {
          const [result] = await connection.execute(sql, params);
          return result;
        },
      });

      // Remove the migration record
      await connection.execute("DELETE FROM migrations WHERE name = ?", [
        lastMigration.name,
      ]);

      await connection.commit();
      console.log(`Migration ${lastMigration.name} rolled back successfully.`);
    } catch (error) {
      await connection.rollback();
      console.error(
        `Error rolling back migration ${lastMigration.name}:`,
        error,
      );
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Close the database connection
   */
  async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

module.exports = MigrationManager;
