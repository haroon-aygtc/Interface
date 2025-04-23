/**
 * Permission repository - handles database operations for permissions
 */

import { Role, RoleWithPermissions } from "@/types/auth";
import * as mysql from "@/utils/mysql";

/**
 * Get permissions for a role
 */
export async function getRolePermissions(role: Role): Promise<string[]> {
  const results = await mysql.query<any[]>(
    "SELECT permissions FROM permissions WHERE role = ?",
    [role],
  );

  if (results.length === 0) {
    return [];
  }

  // Parse the JSON array of permissions
  return JSON.parse(results[0].permissions);
}

/**
 * Check if a role has a specific permission
 */
export async function hasPermission(
  role: Role,
  permission: string,
): Promise<boolean> {
  const permissions = await getRolePermissions(role);
  return permissions.includes(permission);
}

/**
 * Get all role permissions
 */
export async function getAllRolePermissions(): Promise<RoleWithPermissions[]> {
  const results = await mysql.query<any[]>(
    "SELECT role, permissions FROM permissions",
  );

  return results.map((row) => ({
    role: row.role as Role,
    permissions: JSON.parse(row.permissions),
  }));
}
