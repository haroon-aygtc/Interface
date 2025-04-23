/**
 * Authentication routes
 */

import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

// Login route
router.post("/login", authController.login);

// Register route
router.post("/register", authController.register);

// Logout route
router.post("/logout", authController.logout);

// Forgot password route
router.post("/forgot-password", authController.forgotPassword);

// Reset password route
router.post("/reset-password", authController.resetPassword);

// Get current user route
router.get("/profile", authController.getCurrentUser);

export default router;
