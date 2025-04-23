/**
 * Authentication controller
 */

import { Request, Response } from "express";
import * as userRepository from "../repositories/user.repository";
import * as sessionRepository from "../repositories/session.repository";
import * as passwordResetRepository from "../repositories/passwordReset.repository";
import * as bcrypt from "bcrypt";

/**
 * Login controller
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Find user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Create a new session
    const session = await sessionRepository.createSession(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      user: userWithoutPassword,
      token: session.token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
}

/**
 * Register controller
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

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
      role: "user", // Default role for new users
    });

    // Create a new session
    const session = await sessionRepository.createSession(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      user: userWithoutPassword,
      token: session.token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
}

/**
 * Logout controller
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    // Delete the session
    await sessionRepository.deleteSessionByToken(token);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
}

/**
 * Forgot password controller
 */
export async function forgotPassword(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Find user by email
    const user = await userRepository.findUserByEmail(email);

    // Don't reveal if the email exists or not for security reasons
    if (!user) {
      res
        .status(200)
        .json({
          message:
            "If your email exists in our system, you will receive a password reset link",
        });
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

    res
      .status(200)
      .json({
        message:
          "If your email exists in our system, you will receive a password reset link",
      });
  } catch (error) {
    console.error("Forgot password error:", error);
    // Still return success to avoid revealing if the email exists
    res
      .status(200)
      .json({
        message:
          "If your email exists in our system, you will receive a password reset link",
      });
  }
}

/**
 * Reset password controller
 */
export async function resetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { token, password } = req.body;

    // Validate input
    if (!token || !password) {
      res.status(400).json({ message: "Token and password are required" });
      return;
    }

    // Find the reset token
    const reset = await passwordResetRepository.findPasswordResetByToken(token);

    if (!reset) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    // Check if token is expired
    if (new Date(reset.expiresAt) < new Date()) {
      res.status(400).json({ message: "Token has expired" });
      return;
    }

    // Update the user's password
    await userRepository.updateUser(reset.userId, {
      password,
      updatedAt: new Date().toISOString(),
    });

    // Mark the token as used
    await passwordResetRepository.markPasswordResetAsUsed(reset.id);

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during password reset" });
  }
}

/**
 * Get current user controller
 */
export async function getCurrentUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authorization.split(" ")[1];

    // Find the session by token
    const session = await sessionRepository.findSessionByToken(token);

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      res.status(401).json({ message: "Session expired" });
      return;
    }

    // Get the user
    const user = await userRepository.findUserById(session.userId);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Get current user error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data" });
  }
}
