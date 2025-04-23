/**
 * This service is deprecated and should not be used directly.
 * All authentication operations should use the API service to communicate with the backend.
 * This file is kept for reference but should be removed in production.
 */

import { ApiError } from "./api.service";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
} from "@/types/auth";
import { apiService } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await apiService.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        credentials,
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Login failed", 500);
    }
  },

  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      return await apiService.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        credentials,
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Registration failed", 500);
    }
  },

  /**
   * Logout the current user
   */
  async logout(userId: string): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
      // We don't throw here to ensure the user is always logged out client-side
    }
  },

  /**
   * Send a password reset email
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (error) {
      console.error("Password reset error:", error);
      // Don't throw to avoid revealing if the email exists
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    try {
      await apiService.post(API_ENDPOINTS.RESET_PASSWORD, credentials);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("Password reset failed", 500);
    }
  },

  /**
   * Get the current user from a token
   */
  async getCurrentUser(token: string): Promise<User | null> {
    if (!token) return null;

    try {
      return await apiService.get<User>(API_ENDPOINTS.PROFILE);
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  /**
   * Check if a user has a specific permission
   */
  async hasPermission(role: string, permission: string): Promise<boolean> {
    try {
      // This should be implemented on the server side
      // For now, we'll just return true for admin and false for others
      return role === "admin";
    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  },
};
