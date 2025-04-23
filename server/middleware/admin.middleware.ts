/**
 * Admin middleware
 */

import { Request, Response, NextFunction } from "express";

/**
 * Admin middleware - checks if the user is an admin
 */
export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    // Check if user exists and is an admin
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "Forbidden - Admin access required" });
      return;
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ message: "An error occurred during authorization" });
  }
}
