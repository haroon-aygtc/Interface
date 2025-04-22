import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import { User } from "@/types/auth";

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
    const now = new Date().toISOString();
    return apiService.post<User>(API_ENDPOINTS.USERS, {
      id: `user-${Date.now()}`,
      ...userData,
      createdAt: now,
      updatedAt: now,
    });
  },

  /**
   * Update a user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return apiService.patch<User>(API_ENDPOINTS.USER(id), {
      ...userData,
      updatedAt: new Date().toISOString(),
    });
  },

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USER(id));
  },
};
