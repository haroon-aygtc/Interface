/**
 * Permission controller
 */

import { Request, Response } from "express";
import * as permissionRepository from "../repositories/permission.repository";

/**
 * Get all role permissions
 */
export async function getAllRolePermissions(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const rolePermissions = await permissionRepository.getAllRolePermissions();
    res.status(200).json(rolePermissions);
  } catch (error) {
    console.error("Get all role permissions error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching role permissions" });
  }
}

/**
 * Get permissions for a role
 */
export async function getRolePermissions(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { role } = req.params;

    // Validate role
    if (!["admin", "user", "guest"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    const permissions = await permissionRepository.getRolePermissions(
      role as any,
    );
    res.status(200).json({ role, permissions });
  } catch (error) {
    console.error("Get role permissions error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching role permissions" });
  }
}

/**
 * Check if a role has a specific permission
 */
export async function checkPermission(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { role, permission } = req.params;

    // Validate role
    if (!["admin", "user", "guest"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    const hasPermission = await permissionRepository.hasPermission(
      role as any,
      permission,
    );
    res.status(200).json({ role, permission, hasPermission });
  } catch (error) {
    console.error("Check permission error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while checking permission" });
  }
}
