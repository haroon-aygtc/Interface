import { apiService, ApiError } from "./api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  RoleWithPermissions,
} from "@/types/auth";

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email
      const users = await apiService.get<User[]>(
        `${API_ENDPOINTS.USERS}?email=${credentials.email}`,
      );

      if (users.length === 0) {
        throw new ApiError("Invalid email or password", 401);
      }

      const user = users[0];

      // In a real implementation, we would verify the password hash
      // For this mock, we'll assume any password is valid

      // Create a new session
      const session = await apiService.post<{ id: string; token: string }>(
        API_ENDPOINTS.SESSIONS,
        {
          userId: user.id,
          token: `token-${user.id}-${Date.now()}`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          createdAt: new Date().toISOString(),
        },
      );

      return { user, token: session.token };
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
      // Check if user already exists
      const existingUsers = await apiService.get<User[]>(
        `${API_ENDPOINTS.USERS}?email=${credentials.email}`,
      );

      if (existingUsers.length > 0) {
        throw new ApiError("Email already in use", 409);
      }

      // Create new user
      const now = new Date().toISOString();
      const user = await apiService.post<User>(API_ENDPOINTS.USERS, {
        id: `user-${Date.now()}`,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password, // In a real app, this would be hashed
        role: "user", // Default role for new users
        createdAt: now,
        updatedAt: now,
      });

      // Create a new session
      const session = await apiService.post<{ id: string; token: string }>(
        API_ENDPOINTS.SESSIONS,
        {
          userId: user.id,
          token: `token-${user.id}-${Date.now()}`,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          createdAt: now,
        },
      );

      return { user, token: session.token };
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
      // Find the user's session
      const sessions = await apiService.get<any[]>(
        `${API_ENDPOINTS.SESSIONS}?userId=${userId}`,
      );

      // Delete all sessions for this user
      for (const session of sessions) {
        await apiService.delete(API_ENDPOINTS.SESSION(session.id));
      }
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
      // Find user by email
      const users = await apiService.get<User[]>(
        `${API_ENDPOINTS.USERS}?email=${email}`,
      );

      if (users.length === 0) {
        // Don't reveal that the email doesn't exist for security reasons
        return;
      }

      const user = users[0];

      // Create a password reset token
      await apiService.post(API_ENDPOINTS.PASSWORD_RESETS, {
        id: `reset-${Date.now()}`,
        userId: user.id,
        token: `reset-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        createdAt: new Date().toISOString(),
        used: false,
      });

      // In a real implementation, we would send an email with the reset link
      console.log(`Password reset requested for ${email}`);
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
      const { token, password } = credentials;

      // Find the reset token
      const resets = await apiService.get<any[]>(
        `${API_ENDPOINTS.PASSWORD_RESETS}?token=${token}&used=false`,
      );

      if (resets.length === 0) {
        throw new ApiError("Invalid or expired token", 400);
      }

      const reset = resets[0];

      // Check if token is expired
      if (new Date(reset.expiresAt) < new Date()) {
        throw new ApiError("Token has expired", 400);
      }

      // Update the user's password
      const user = await apiService.get<User>(API_ENDPOINTS.USER(reset.userId));
      await apiService.patch(API_ENDPOINTS.USER(user.id), {
        password: password, // In a real app, this would be hashed
        updatedAt: new Date().toISOString(),
      });

      // Mark the token as used
      await apiService.patch(`${API_ENDPOINTS.PASSWORD_RESETS}/${reset.id}`, {
        used: true,
      });
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
      // Find the session by token
      const sessions = await apiService.get<any[]>(
        `${API_ENDPOINTS.SESSIONS}?token=${token}`,
      );

      if (sessions.length === 0) {
        return null;
      }

      const session = sessions[0];

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        return null;
      }

      // Get the user
      const user = await apiService.get<User>(
        API_ENDPOINTS.USER(session.userId),
      );
      return user;
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
      // Get role permissions
      const rolePermissions = await apiService.get<RoleWithPermissions[]>(
        `${API_ENDPOINTS.PERMISSIONS}?role=${role}`,
      );

      if (rolePermissions.length === 0) {
        return false;
      }

      // Check if the role has the permission
      return rolePermissions[0].permissions.includes(permission);
    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  },
};
