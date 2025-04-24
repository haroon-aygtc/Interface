/**
 * Password Reset Repository
 * Handles API calls related to password reset tokens.
 */

import { v4 as uuidv4 } from "uuid";
import axios from "axios"; // Use axios for API calls

/**
 * Represents a password reset entry.
 */
interface PasswordReset {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  used: boolean;
}

/**
 * Creates a new password reset token for a user by making an API request.
 *
 * @param userId - The ID of the user requesting a password reset.
 * @returns The newly created PasswordReset object from the API response.
 */
export async function createPasswordReset(userId: string): Promise<PasswordReset> {
  const response = await axios.post("/api/password-reset/create", { userId });
  return response.data; // assuming the backend API returns the created PasswordReset object
}

/**
 * Finds a valid (unused and not expired) password reset token by making an API request.
 *
 * @param token - The token to search for.
 * @returns The matching PasswordReset object, or null if not found or expired/used.
 */
export async function findPasswordResetByToken(token: string): Promise<PasswordReset | null> {
  try {
    const response = await axios.get(`/api/password-reset/${token}`);
    return response.data || null; // if data is found, return it; otherwise return null
  } catch (error) {
    return null; // return null in case of error (e.g., token not found or expired)
  }
}

/**
 * Marks a password reset token as used by making an API request.
 *
 * @param id - The ID of the password reset record to update.
 */
export async function markPasswordResetAsUsed(id: string): Promise<void> {
  await axios.post("/api/password-reset/mark-as-used", { id });
}

