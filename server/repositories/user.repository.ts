/**
 * User repository - handles database operations for users
 */

import { User } from "../types/auth";
import { v4 as uuidv4 } from "uuid";
import * as mysql from "../utils/mysql";
import * as bcrypt from "bcrypt";

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await mysql.query<User[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  return users.length > 0 ? users[0] : null;
}

/**
 * Find a user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const users = await mysql.query<User[]>("SELECT * FROM users WHERE id = ?", [
    id,
  ]);

  return users.length > 0 ? users[0] : null;
}

/**
 * Create a new user
 */
export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<User> {
  const now = new Date().toISOString();
  const id = `user-${uuidv4()}`;

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  const newUser: User = {
    id,
    ...userData,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  };

  await mysql.query(
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

/**
 * Update a user
 */
export async function updateUser(
  id: string,
  userData: Partial<User>,
): Promise<User | null> {
  // Get the current user data
  const currentUser = await findUserById(id);
  if (!currentUser) return null;

  // Build the update query dynamically based on provided fields
  const updateFields: string[] = [];
  const updateValues: any[] = [];

  if (userData.name !== undefined) {
    updateFields.push("name = ?");
    updateValues.push(userData.name);
  }

  if (userData.email !== undefined) {
    updateFields.push("email = ?");
    updateValues.push(userData.email);
  }

  if (userData.password !== undefined) {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    updateFields.push("password = ?");
    updateValues.push(hashedPassword);
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
    await mysql.query(
      `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues,
    );
  }

  // Get the updated user
  return findUserById(id);
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<boolean> {
  const result = await mysql.query<any>("DELETE FROM users WHERE id = ?", [id]);

  // Check if any rows were affected
  return result.affectedRows > 0;
}

/**
 * Get all users
 */
export async function getAllUsers(): Promise<User[]> {
  return mysql.query<User[]>("SELECT * FROM users ORDER BY createdAt DESC");
}
