/**
 * Session repository - handles database operations for sessions
 */

const { v4: uuidv4 } = require("uuid");
const { getDatabase } = require("../db");
const { DB_MODE } = require("../config/database");

/**
 * Create a new session
 */
async function createSession(userId) {
  const db = getDatabase();
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const token = `token-${userId}-${Date.now()}-${uuidv4()}`;
  const id = `session-${uuidv4()}`;

  if (DB_MODE === "mock") {
    await db.createToken(userId);

    // Return a mock session object
    return {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now,
    };
  } else {
    const session = {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now,
    };

    await db.query(
      "INSERT INTO sessions (id, userId, token, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?)",
      [
        session.id,
        session.userId,
        session.token,
        session.expiresAt,
        session.createdAt,
      ],
    );

    return session;
  }
}

/**
 * Find a session by token
 */
async function findSessionByToken(token) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    // The mock DB doesn't store sessions in the same way, so we'll extract the userId from the token
    const userId = token.split("-")[1]; // Assuming token format is 'token-userId-timestamp'
    if (!userId) return null;

    // Validate the token
    const user = await db.validateToken(token);
    if (!user) return null;

    // Return a mock session
    return {
      id: `session-${Date.now()}`,
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
  } else {
    const sessions = await db.query(
      "SELECT * FROM sessions WHERE token = ? AND expiresAt > NOW()",
      [token],
    );

    return sessions.length > 0 ? sessions[0] : null;
  }
}

/**
 * Delete sessions for a user
 */
async function deleteUserSessions(userId) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    await db.removeToken(userId);
  } else {
    await db.query("DELETE FROM sessions WHERE userId = ?", [userId]);
  }
}

/**
 * Delete a session by token
 */
async function deleteSessionByToken(token) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    // The mock DB doesn't store sessions in the same way, so we'll extract the userId from the token
    const userId = token.split("-")[1]; // Assuming token format is 'token-userId-timestamp'
    if (userId) {
      await db.removeToken(userId);
    }
  } else {
    await db.query("DELETE FROM sessions WHERE token = ?", [token]);
  }
}

module.exports = {
  createSession,
  findSessionByToken,
  deleteUserSessions,
  deleteSessionByToken,
};
