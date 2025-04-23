/**
 * Authentication middleware
 */

import { Request, Response, NextFunction } from "express";
import * as sessionRepository from "../repositories/session.repository";
import * as userRepository from "../repositories/user.repository";

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Authentication middleware
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
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

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
}
