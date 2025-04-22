import db from "@/utils/db";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
} from "@/types/auth";

// Simulate API response delay
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Simulate API error
class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await simulateDelay();

    const { email, password } = credentials;

    // In a real API, we would send these credentials to the server
    // For now, we'll simulate authentication with our mock database
    const user = await db.findUserByEmail(email);

    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }

    // In a real implementation, we would verify the password hash
    // For this mock, we'll assume any password is valid

    // Generate a token
    const token = await db.createToken(user.id);

    return { user, token };
  },

  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await simulateDelay();

    const { name, email, password } = credentials;

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      throw new ApiError("Email already in use", 409);
    }

    // Create new user
    // In a real implementation, we would hash the password
    const user = await db.createUser({
      name,
      email,
      role: "user", // Default role for new users
    });

    // Generate a token
    const token = await db.createToken(user.id);

    return { user, token };
  },

  /**
   * Logout the current user
   */
  async logout(userId: string): Promise<void> {
    await simulateDelay();
    await db.removeToken(userId);
  },

  /**
   * Send a password reset email
   */
  async forgotPassword(email: string): Promise<void> {
    await simulateDelay();

    const user = await db.findUserByEmail(email);
    if (!user) {
      // Don't reveal that the email doesn't exist for security reasons
      // Just pretend we sent the email
      return;
    }

    // In a real implementation, we would generate a reset token and send an email
    // For this mock, we'll just log it
    console.log(`Password reset requested for ${email}`);
  },

  /**
   * Reset password with token
   */
  async resetPassword(credentials: ResetPasswordCredentials): Promise<void> {
    await simulateDelay();

    const { token, password } = credentials;

    // In a real implementation, we would validate the token and update the password
    // For this mock, we'll just log it
    console.log(`Password reset with token ${token}`);
  },

  /**
   * Get the current user from a token
   */
  async getCurrentUser(token: string): Promise<User | null> {
    await simulateDelay(100); // Shorter delay for this common operation

    if (!token) return null;

    return db.validateToken(token);
  },

  /**
   * Check if a user has a specific permission
   */
  async hasPermission(role: string, permission: string): Promise<boolean> {
    await simulateDelay(50); // Very short delay for permission checks

    return db.hasPermission(role as any, permission);
  },
};
