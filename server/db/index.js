/**
 * Database module
 */

const path = require("path");
const DatabaseConnection = require("./utils/db-connection");
const MigrationManager = require("./utils/migration-manager");
const MockDatabase = require("./utils/mock-db");
const config = require("../config/database");

let db;

/**
 * Initialize the database
 */
async function initDatabase() {
  if (config.DB_MODE === "mysql") {
    // MySQL implementation
    db = new DatabaseConnection({
      host: config.MYSQL_CONFIG.host,
      port: config.MYSQL_CONFIG.port,
      user: config.MYSQL_CONFIG.user,
      password: config.MYSQL_CONFIG.password,
      database: config.MYSQL_CONFIG.database,
      waitForConnections: config.MYSQL_CONFIG.waitForConnections,
      connectionLimit: config.MYSQL_CONFIG.connectionLimit,
      queueLimit: config.MYSQL_CONFIG.queueLimit,
    });

    await db.init();
    return db;
  } else {
    // Mock database implementation
    const dbFilePath = path.resolve(process.cwd(), "db.json");
    db = new MockDatabase(dbFilePath);
    await db.init();
    return db;
  }
}

/**
 * Get the database instance
 */
function getDatabase() {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return db;
}

/**
 * Run database migrations
 */
async function runMigrations() {
  if (config.DB_MODE !== "mysql") {
    console.log("Migrations are only supported for MySQL database.");
    return;
  }

  const migrationManager = new MigrationManager({
    host: config.MYSQL_CONFIG.host,
    port: config.MYSQL_CONFIG.port,
    user: config.MYSQL_CONFIG.user,
    password: config.MYSQL_CONFIG.password,
    database: config.MYSQL_CONFIG.database,
    waitForConnections: config.MYSQL_CONFIG.waitForConnections,
    connectionLimit: config.MYSQL_CONFIG.connectionLimit,
    queueLimit: config.MYSQL_CONFIG.queueLimit,
  });

  try {
    await migrationManager.migrate();
  } finally {
    await migrationManager.close();
  }
}

/**
 * Rollback the last migration
 */
async function rollbackMigration() {
  if (config.DB_MODE !== "mysql") {
    console.log("Migrations are only supported for MySQL database.");
    return;
  }

  const migrationManager = new MigrationManager({
    host: config.MYSQL_CONFIG.host,
    port: config.MYSQL_CONFIG.port,
    user: config.MYSQL_CONFIG.user,
    password: config.MYSQL_CONFIG.password,
    database: config.MYSQL_CONFIG.database,
    waitForConnections: config.MYSQL_CONFIG.waitForConnections,
    connectionLimit: config.MYSQL_CONFIG.connectionLimit,
    queueLimit: config.MYSQL_CONFIG.queueLimit,
  });

  try {
    await migrationManager.rollback();
  } finally {
    await migrationManager.close();
  }
}

module.exports = {
  initDatabase,
  getDatabase,
  runMigrations,
  rollbackMigration,
};
