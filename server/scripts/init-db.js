/**
 * Database initialization script
 */

const { initDatabase, runMigrations } = require("../db");

async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    await initDatabase();

    console.log("Running migrations...");
    await runMigrations();

    console.log("Database initialization completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase();
