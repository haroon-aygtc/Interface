/**
 * Password reset repository - handles database operations for password resets
 */

import { DB_MODE } from "@/config/database.config";
import { v4 as uuidv4 } from "uuid";

// Import MySQL utilities (commented out for Tempolab)
// import * as mysql from '@/utils/mysql';

// Import JSON-based database (for Tempolab)
import db from "@/utils/db";

// Password reset interface
interface PasswordReset {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  used: boolean;
}

/**
 * Create a password reset token
 */
export async function createPasswordReset(
  userId: string,
): Promise<PasswordReset> {
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
  const token = `reset-${uuidv4()}`;
  const id = `reset-${uuidv4()}`;

  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't have a method for this, so we'll return a mock object
    return {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now,
      used: false,
    };
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const passwordReset: PasswordReset = {
      id,
      userId,
      token,
      expiresAt,
      createdAt: now,
      used: false
    };
    
    await mysql.query(
      'INSERT INTO password_resets (id, userId, token, expiresAt, createdAt, used) VALUES (?, ?, ?, ?, ?, ?)',
      [passwordReset.id, passwordReset.userId, passwordReset.token, passwordReset.expiresAt, passwordReset.createdAt, passwordReset.used]
    );
    
    return passwordReset;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Find a password reset by token
 */
export async function findPasswordResetByToken(
  token: string,
): Promise<PasswordReset | null> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't have a method for this, so we'll return a mock object
    return {
      id: `reset-${Date.now()}`,
      userId: "user-1", // Mock user ID
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      used: false,
    };
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const resets = await mysql.query<PasswordReset[]>(
      'SELECT * FROM password_resets WHERE token = ? AND used = FALSE AND expiresAt > NOW()',
      [token]
    );
    
    return resets.length > 0 ? resets[0] : null;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Mark a password reset as used
 */
export async function markPasswordResetAsUsed(id: string): Promise<void> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't have a method for this, so we'll do nothing
    return;
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    await mysql.query(
      'UPDATE password_resets SET used = TRUE WHERE id = ?',
      [id]
    );
    return;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}
