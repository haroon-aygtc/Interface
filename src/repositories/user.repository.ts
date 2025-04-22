/**
 * User repository - handles database operations for users
 */

import { User, Role } from "@/types/auth";
import { DB_MODE } from "@/config/database.config";
import { v4 as uuidv4 } from "uuid";

// Import MySQL utilities (commented out for Tempolab)
// import * as mysql from '@/utils/mysql';

// Import JSON-based database (for Tempolab)
import db from "@/utils/db";

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.findUserByEmail(email);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const users = await mysql.query<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    return users.length > 0 ? users[0] : null;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Find a user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.findUserById(id);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const users = await mysql.query<User[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return users.length > 0 ? users[0] : null;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Create a new user
 */
export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<User> {
  const now = new Date().toISOString();
  const id = `user-${uuidv4()}`;

  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.createUser(userData);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const newUser: User = {
      id,
      ...userData,
      createdAt: now,
      updatedAt: now,
    };
    
    await mysql.query(
      'INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [newUser.id, newUser.name, newUser.email, newUser.password, newUser.role, newUser.createdAt, newUser.updatedAt]
    );
    
    return newUser;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Update a user
 */
export async function updateUser(
  id: string,
  userData: Partial<User>,
): Promise<User | null> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.updateUser(id, userData);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    // Get the current user data
    const currentUser = await findUserById(id);
    if (!currentUser) return null;
    
    // Build the update query dynamically based on provided fields
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    if (userData.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(userData.name);
    }
    
    if (userData.email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(userData.email);
    }
    
    if (userData.password !== undefined) {
      updateFields.push('password = ?');
      updateValues.push(userData.password);
    }
    
    if (userData.role !== undefined) {
      updateFields.push('role = ?');
      updateValues.push(userData.role);
    }
    
    // Add the ID at the end for the WHERE clause
    updateValues.push(id);
    
    if (updateFields.length > 0) {
      await mysql.query(
        `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
    }
    
    // Get the updated user
    return findUserById(id);
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Delete a user
 */
export async function deleteUser(id: string): Promise<boolean> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't have a delete method, so we'll simulate it
    const user = await db.findUserById(id);
    return !!user;
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const result = await mysql.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    
    // Check if any rows were affected
    return (result as any).affectedRows > 0;
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Get all users
 */
export async function getAllUsers(): Promise<User[]> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // The mock DB doesn't have a getAll method, so we'll return mock data
    const admin = await db.findUserByEmail("admin@example.com");
    const user = await db.findUserByEmail("user@example.com");
    return [admin, user].filter(Boolean) as User[];
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    return mysql.query<User[]>('SELECT * FROM users ORDER BY createdAt DESC');
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}
