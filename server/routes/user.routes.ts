/**
 * User routes
 */

import express from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = express.Router();

// Get all users (admin only)
router.get("/", authMiddleware, adminMiddleware, userController.getUsers);

// Get user by ID
router.get("/:id", authMiddleware, userController.getUserById);

// Create a new user (admin only)
router.post("/", authMiddleware, adminMiddleware, userController.createUser);

// Update a user
router.patch("/:id", authMiddleware, userController.updateUser);

// Delete a user (admin only)
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser,
);

export default router;
