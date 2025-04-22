/**
 * Session repository - handles database operations for sessions
 */

import { DB_MODE } from "@/config/database.config";
import { v4 as uuidv4 } from "uuid";

// Import MySQL utilities (commented out for Tempolab)
// import * as mysql from '@/utils/mysql';

// Import JSON-based database (for Tempolab)
import db from "@/utils/db";

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

  // JSON-based implementation (active for Tempolab)
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
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const session: Session = {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now
    };
    
    await mysql.query(
      'INSERT INTO sessions (id, userId, token, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?)',
      [session.id, session.userId, session.token, session.expiresAt, session.createdAt]
    );
    
    return session;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Find a session by token
 */
export async function findSessionByToken(
  token: string,
): Promise<Session | null> {
  // JSON-based implementation (active for Tempolab)
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
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const sessions = await mysql.query<Session[]>(
      'SELECT * FROM sessions WHERE token = ? AND expiresAt > NOW()',
      [token]
    );
    
    return sessions.length > 0 ? sessions[0] : null;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Delete sessions for a user
 */
export async function deleteUserSessions(userId: string): Promise<void> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    await db.removeToken(userId);
    return;
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    await mysql.query('DELETE FROM sessions WHERE userId = ?', [userId]);
    return;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Delete a session by token
 */
export async function deleteSessionByToken(token: string): Promise<void> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't store sessions in the same way, so we'll extract the userId from the token
    const userId = token.split("-")[1]; // Assuming token format is 'token-userId-timestamp'
    if (userId) {
      await db.removeToken(userId);
    }
    return;
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    await mysql.query('DELETE FROM sessions WHERE token = ?', [token]);
    return;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}
