import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import { User } from "@/types/auth";
import * as userRepository from "@/repositories/user.repository";

export const userService = {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    return userRepository.getAllUsers();
  },

  /**
   * Get a user by ID
   */
  async getUserById(id: string): Promise<User> {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  },

  /**
   * Create a new user
   */
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    // Hash password (commented out for demo, uncomment in production)
    /*
    if (userData.password) {
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    */

    return userRepository.createUser(userData);
  },

  /**
   * Update a user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    // Hash password if provided (commented out for demo, uncomment in production)
    /*
    if (userData.password) {
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    */

    const updatedUser = await userRepository.updateUser(id, {
      ...userData,
      updatedAt: new Date().toISOString(),
    });

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return updatedUser;
  },

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    const success = await userRepository.deleteUser(id);
    if (!success) {
      throw new Error(`User with ID ${id} not found`);
    }
  },
};
