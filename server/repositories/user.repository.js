/**
 * User repository - handles database operations for users
 */

const { v4: uuidv4 } = require("uuid");
const { getDatabase } = require("../db");
const { DB_MODE } = require("../config/database");

/**
 * Find a user by email
 */
async function findUserByEmail(email) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.findUserByEmail(email);
  } else {
    const users = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return users.length > 0 ? users[0] : null;
  }
}

/**
 * Find a user by ID
 */
async function findUserById(id) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.findUserById(id);
  } else {
    const users = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    return users.length > 0 ? users[0] : null;
  }
}

/**
 * Create a new user
 */
async function createUser(userData) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const id = `user-${uuidv4()}`;

  if (DB_MODE === "mock") {
    return db.createUser(userData);
  } else {
    const newUser = {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    await db.query(
      "INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.role,
        newUser.createdAt,
        newUser.updatedAt,
      ],
    );

    return newUser;
  }
}

/**
 * Update a user
 */
async function updateUser(id, userData) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.updateUser(id, userData);
  } else {
    // Get the current user data
    const currentUser = await findUserById(id);
    if (!currentUser) return null;

    // Build the update query dynamically based on provided fields
    const updateFields = [];
    const updateValues = [];

    if (userData.name !== undefined) {
      updateFields.push("name = ?");
      updateValues.push(userData.name);
    }

    if (userData.email !== undefined) {
      updateFields.push("email = ?");
      updateValues.push(userData.email);
    }

    if (userData.password !== undefined) {
      updateFields.push("password = ?");
      updateValues.push(userData.password);
    }

    if (userData.role !== undefined) {
      updateFields.push("role = ?");
      updateValues.push(userData.role);
    }

    // Always update the updatedAt field
    updateFields.push("updatedAt = ?");
    updateValues.push(new Date().toISOString());

    // Add the ID at the end for the WHERE clause
    updateValues.push(id);

    if (updateFields.length > 0) {
      await db.query(
        `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
        updateValues,
      );
    }

    // Get the updated user
    return findUserById(id);
  }
}

/**
 * Delete a user
 */
async function deleteUser(id) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.deleteUser(id);
  } else {
    const result = await db.query("DELETE FROM users WHERE id = ?", [id]);

    // Check if any rows were affected
    return result.affectedRows > 0;
  }
}

/**
 * Get all users
 */
async function getAllUsers() {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.getAllUsers();
  } else {
    return db.query("SELECT * FROM users ORDER BY createdAt DESC");
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
