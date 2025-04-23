/**
 * This service is deprecated and should not be used directly.
 * All user operations should use the API service to communicate with the backend.
 * This file is kept for reference but should be removed in production.
 */

import { User } from "@/types/auth";
import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export const userService = {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    return apiService.get<User[]>(API_ENDPOINTS.USERS);
  },

  /**
   * Get a user by ID
   */
  async getUserById(id: string): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.USER(id));
  },

  /**
   * Create a new user
   */
  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    return apiService.post<User>(API_ENDPOINTS.USERS, userData);
  },

  /**
   * Update a user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return apiService.patch<User>(API_ENDPOINTS.USER(id), userData);
  },

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USER(id));
  },
};
