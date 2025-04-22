import { ApiError } from "./api.service";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
} from "@/types/auth";

import * as userRepository from "@/repositories/user.repository";
import * as sessionRepository from "@/repositories/session.repository";
import * as permissionRepository from "@/repositories/permission.repository";
import * as passwordResetRepository from "@/repositories/passwordReset.repository";

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by email using repository
      const user = await userRepository.findUserByEmail(credentials.email);

      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      // In a real implementation, we would verify the password hash
      // For this implementation, we'll assume any password is valid for demo purposes
      // In production, you would uncomment the password verification code

      /*
      // Verify password (uncomment in production)
      const bcrypt = require('bcrypt');
      const passwordMatch = await bcrypt.compare(credentials.password, user.password);
      
      if (!passwordMatch) {
        throw new ApiError("Invalid email or password", 401);
      }
      */

      // Create a new session
      const session = await sessionRepository.createSession(user.id);

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
      const existingUser = await userRepository.findUserByEmail(
        credentials.email,
      );

      if (existingUser) {
        throw new ApiError("Email already in use", 409);
      }

      // Hash password (commented out for demo, uncomment in production)
      /*
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);
      */

      // For demo purposes, we'll use the plain password
      const hashedPassword = credentials.password;

      // Create new user
      const user = await userRepository.createUser({
        name: credentials.name,
        email: credentials.email,
        password: hashedPassword,
        role: "user", // Default role for new users
      });

      // Create a new session
      const session = await sessionRepository.createSession(user.id);

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
      // Delete all sessions for this user
      await sessionRepository.deleteUserSessions(userId);
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
      const user = await userRepository.findUserByEmail(email);

      if (!user) {
        // Don't reveal that the email doesn't exist for security reasons
        return;
      }

      // Create a password reset token
      const passwordReset = await passwordResetRepository.createPasswordReset(
        user.id,
      );

      // In a real implementation, we would send an email with the reset link
      // For example:
      /*
      const resetUrl = `https://yourdomain.com/reset-password?token=${passwordReset.token}`;
      await sendEmail({
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: ${resetUrl}`,
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
      });
      */

      console.log(
        `Password reset requested for ${email}. Token: ${passwordReset.token}`,
      );
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
      const reset =
        await passwordResetRepository.findPasswordResetByToken(token);

      if (!reset) {
        throw new ApiError("Invalid or expired token", 400);
      }

      // Check if token is expired
      if (new Date(reset.expiresAt) < new Date()) {
        throw new ApiError("Token has expired", 400);
      }

      // Hash password (commented out for demo, uncomment in production)
      /*
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      */

      // For demo purposes, we'll use the plain password
      const hashedPassword = password;

      // Update the user's password
      await userRepository.updateUser(reset.userId, {
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
      });

      // Mark the token as used
      await passwordResetRepository.markPasswordResetAsUsed(reset.id);
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
      const session = await sessionRepository.findSessionByToken(token);

      if (!session) {
        return null;
      }

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        return null;
      }

      // Get the user
      const user = await userRepository.findUserById(session.userId);
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
      return await permissionRepository.hasPermission(role as any, permission);
    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  },
};
