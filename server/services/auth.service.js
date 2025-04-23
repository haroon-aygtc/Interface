/**
 * Authentication service
 */

const bcrypt = require("bcrypt");
const {
  userRepository,
  sessionRepository,
  permissionRepository,
  passwordResetRepository,
} = require("../repositories");

class ApiError extends Error {
  constructor(message, statusCode = 400, data = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

const authService = {
  /**
   * Login with email and password
   */
  async login(credentials) {
    try {
      // Find user by email using repository
      const user = await userRepository.findUserByEmail(credentials.email);

      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(
        credentials.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new ApiError("Invalid email or password", 401);
      }

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
  async register(credentials) {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findUserByEmail(
        credentials.email,
      );

      if (existingUser) {
        throw new ApiError("Email already in use", 409);
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        credentials.password,
        saltRounds,
      );

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
  async logout(userId) {
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
  async forgotPassword(email) {
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
  async resetPassword(credentials) {
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

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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
  async getCurrentUser(token) {
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
  async hasPermission(role, permission) {
    try {
      return await permissionRepository.hasPermission(role, permission);
    } catch (error) {
      console.error("Permission check error:", error);
      return false;
    }
  },
};

module.exports = authService;
