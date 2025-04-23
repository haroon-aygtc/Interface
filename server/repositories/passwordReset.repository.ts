/**
 * Password reset repository - handles database operations for password resets
 */

import { v4 as uuidv4 } from "uuid";
import * as mysql from "../utils/mysql";

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

  const passwordReset: PasswordReset = {
    id,
    userId,
    token,
    expiresAt,
    createdAt: now,
    used: false,
  };

  await mysql.query(
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

/**
 * Find a password reset by token
 */
export async function findPasswordResetByToken(
  token: string,
): Promise<PasswordReset | null> {
  const resets = await mysql.query<PasswordReset[]>(
    "SELECT * FROM password_resets WHERE token = ? AND used = FALSE AND expiresAt > NOW()",
    [token],
  );

  return resets.length > 0 ? resets[0] : null;
}

/**
 * Mark a password reset as used
 */
export async function markPasswordResetAsUsed(id: string): Promise<void> {
  await mysql.query("UPDATE password_resets SET used = TRUE WHERE id = ?", [
    id,
  ]);
}
