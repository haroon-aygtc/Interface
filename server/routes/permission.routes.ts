/**
 * Permission routes
 */

import express from "express";
import * as permissionController from "../controllers/permission.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Get all role permissions
router.get("/", authMiddleware, permissionController.getAllRolePermissions);

// Get permissions for a role
router.get("/:role", authMiddleware, permissionController.getRolePermissions);

// Check if a role has a specific permission
router.get(
  "/:role/:permission",
  authMiddleware,
  permissionController.checkPermission,
);

export default router;
