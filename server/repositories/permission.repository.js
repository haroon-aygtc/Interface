/**
 * Permission repository - handles database operations for permissions
 */

const { getDatabase } = require("../db");
const { DB_MODE } = require("../config/database");

/**
 * Get permissions for a role
 */
async function getRolePermissions(role) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.getUserPermissions(role);
  } else {
    const results = await db.query(
      "SELECT permissions FROM permissions WHERE role = ?",
      [role],
    );

    if (results.length === 0) {
      return [];
    }

    // Parse the JSON array of permissions
    return JSON.parse(results[0].permissions);
  }
}

/**
 * Check if a role has a specific permission
 */
async function hasPermission(role, permission) {
  const db = getDatabase();

  if (DB_MODE === "mock") {
    return db.hasPermission(role, permission);
  } else {
    const permissions = await getRolePermissions(role);
    return permissions.includes(permission);
  }
}

/**
 * Get all role permissions
 */
async function getAllRolePermissions() {
  const db = getDatabase();

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
  } else {
    const results = await db.query("SELECT role, permissions FROM permissions");

    return results.map((row) => ({
      role: row.role,
      permissions: JSON.parse(row.permissions),
    }));
  }
}

module.exports = {
  getRolePermissions,
  hasPermission,
  getAllRolePermissions,
};
