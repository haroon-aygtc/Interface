/**
 * Server entry point
 */

require("dotenv").config();
const { initDatabase } = require("./db");

async function startServer() {
  try {
    // Initialize the database
    await initDatabase();

    console.log("Server initialized successfully.");

    // In a real application, you would start your Express/Fastify/etc. server here
    // For this example, we're just initializing the database
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = { startServer };
