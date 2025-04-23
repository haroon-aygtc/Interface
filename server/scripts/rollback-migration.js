/**
 * Rollback the last migration
 */

const { initDatabase, rollbackMigration } = require("../db");

async function rollback() {
  try {
    console.log("Initializing database...");
    await initDatabase();

    console.log("Rolling back the last migration...");
    await rollbackMigration();

    console.log("Rollback completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Rollback failed:", error);
    process.exit(1);
  }
}

rollback();
