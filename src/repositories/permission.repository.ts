/**
 * Permission repository - handles database operations for permissions
 */

import { Role, RoleWithPermissions } from "@/types/auth";
import { DB_MODE } from "@/config/database.config";

// Import MySQL utilities (commented out for Tempolab)
// import * as mysql from '@/utils/mysql';

// Import JSON-based database (for Tempolab)
import db from "@/utils/db";

/**
 * Get permissions for a role
 */
export async function getRolePermissions(role: Role): Promise<string[]> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.getUserPermissions(role);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const results = await mysql.query<any[]>(
      'SELECT permissions FROM permissions WHERE role = ?',
      [role]
    );
    
    if (results.length === 0) {
      return [];
    }
    
    // Parse the JSON array of permissions
    return JSON.parse(results[0].permissions);
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Check if a role has a specific permission
 */
export async function hasPermission(
  role: Role,
  permission: string,
): Promise<boolean> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    return db.hasPermission(role, permission);
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const permissions = await getRolePermissions(role);
    return permissions.includes(permission);
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}

/**
 * Get all role permissions
 */
export async function getAllRolePermissions(): Promise<RoleWithPermissions[]> {
  // JSON-based implementation (active for Tempolab)
  if (DB_MODE === "mock") {
    // Return mock data since the mock DB doesn't have this method
    return [
      {
        role: "admin",
        permissions: await db.getUserPermissions("admin"),
      },
      {
        role: "user",
        permissions: await db.getUserPermissions("user"),
      },
      {
        role: "guest",
        permissions: await db.getUserPermissions("guest"),
      },
    ];
  }

  // MySQL implementation (commented out for Tempolab)
  /*
  if (DB_MODE === 'mysql') {
    const results = await mysql.query<any[]>(
      'SELECT role, permissions FROM permissions'
    );
    
    return results.map(row => ({
      role: row.role as Role,
      permissions: JSON.parse(row.permissions),
    }));
  }
  */

  throw new Error(`Unsupported database mode: ${DB_MODE}`);
}
