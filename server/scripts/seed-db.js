/**
 * Database seeding script
 */

const { initDatabase, getDatabase } = require("../db");
const { ROLES } = require("../constants/auth");
const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    console.log("Initializing database...");
    await initDatabase();
    const db = getDatabase();

    console.log("Seeding database...");

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("password", saltRounds);

    // Check if admin user exists
    const adminExists = await db.query("SELECT * FROM users WHERE email = ?", [
      "admin@example.com",
    ]);

    if (adminExists.length === 0) {
      // Create admin user
      await db.query(
        "INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?, NOW(), NOW())",
        ["Admin User", "admin@example.com", hashedPassword, ROLES.ADMIN],
      );
      console.log("Admin user created.");
    } else {
      console.log("Admin user already exists.");
    }

    // Check if test user exists
    const userExists = await db.query("SELECT * FROM users WHERE email = ?", [
      "user@example.com",
    ]);

    if (userExists.length === 0) {
      // Create test user
      await db.query(
        "INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?, NOW(), NOW())",
        ["Test User", "user@example.com", hashedPassword, ROLES.USER],
      );
      console.log("Test user created.");
    } else {
      console.log("Test user already exists.");
    }

    console.log("Database seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
