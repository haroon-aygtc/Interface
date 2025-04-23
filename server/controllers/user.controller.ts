/**
 * User controller
 */

import { Request, Response } from "express";
import * as userRepository from "../repositories/user.repository";

/**
 * Get all users
 */
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userRepository.getAllUsers();

    // Remove passwords from response
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
}

/**
 * Get user by ID
 */
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const user = await userRepository.findUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
}

/**
 * Create a new user
 */
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "Name, email, and password are required" });
      return;
    }

    // Check if user already exists
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    // Create new user
    const user = await userRepository.createUser({
      name,
      email,
      password,
      role: role || "user", // Default to 'user' if role is not provided
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Create user error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
}

/**
 * Update a user
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await userRepository.findUserById(id);
    if (!existingUser) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    // Update user
    const updatedUser = await userRepository.updateUser(id, {
      name,
      email,
      password,
      role,
    });

    if (!updatedUser) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Update user error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
}

/**
 * Delete a user
 */
export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await userRepository.findUserById(id);
    if (!existingUser) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    // Delete user
    const success = await userRepository.deleteUser(id);

    if (!success) {
      res.status(404).json({ message: `User with ID ${id} not found` });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Delete user error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
}
