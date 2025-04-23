/**
 * Password reset repository - handles database operations for password resets
 */

const { v4: uuidv4 } = require("uuid");
const { getDatabase } = require("../db");
const { DB_MODE } = require("../config/database");

/**
 * Create a password reset token
 */
async function createPasswordReset(userId) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const token = `reset-${uuidv4()}`;
  const id = `reset-${uuidv4()}`;

  if (DB_MODE === "mock") {
    return db.createPasswordReset(userId);
  } else {
    const passwordReset = {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now,
      used: false,
    };

    await db.query(
      "INSERT INTO password_resets (id, userId, token, expiresAt, createdAt, used) VALUES (?, ?, ?, ?, ?, ?)",
      [
        passwordReset.id,
        passwordReset.userId,
        passwordReset.token,
        passwordReset.expiresAt,
        passwordReset.createdAt,
        passwordReset.used,
      ],
    );

    return passwordReset;
  }
}

/**
 * Find a password reset by token
 */
async function findPasswordResetByToken(token) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.findPasswordResetByToken(token);
  } else {
    const resets = await db.query(
      "SELECT * FROM password_resets WHERE token = ? AND used = FALSE AND expiresAt > NOW()",
      [token],
    );

    return resets.length > 0 ? resets[0] : null;
  }
}

/**
 * Mark a password reset as used
 */
async function markPasswordResetAsUsed(id) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.markPasswordResetAsUsed(id);
  } else {
    await db.query("UPDATE password_resets SET used = TRUE WHERE id = ?", [id]);
  }
}

module.exports = {
  createPasswordReset,
  findPasswordResetByToken,
  markPasswordResetAsUsed,
};
