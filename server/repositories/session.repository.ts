/**
 * Session repository - handles database operations for sessions
 */

import { v4 as uuidv4 } from "uuid";
import * as mysql from "../utils/mysql";

// Session interface
interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

/**
 * Create a new session
 */
export async function createSession(userId: string): Promise<Session> {
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const token = `token-${userId}-${Date.now()}-${uuidv4()}`;
  const id = `session-${uuidv4()}`;

  const session: Session = {
    id,
    userId,
    token,
    expiresAt,
    createdAt: now,
  };

  await mysql.query(
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

/**
 * Find a session by token
 */
export async function findSessionByToken(
  token: string,
): Promise<Session | null> {
  const sessions = await mysql.query<Session[]>(
    "SELECT * FROM sessions WHERE token = ? AND expiresAt > NOW()",
    [token],
  );

  return sessions.length > 0 ? sessions[0] : null;
}

/**
 * Delete sessions for a user
 */
export async function deleteUserSessions(userId: string): Promise<void> {
  await mysql.query("DELETE FROM sessions WHERE userId = ?", [userId]);
}

/**
 * Delete a session by token
 */
export async function deleteSessionByToken(token: string): Promise<void> {
  await mysql.query("DELETE FROM sessions WHERE token = ?", [token]);
}
