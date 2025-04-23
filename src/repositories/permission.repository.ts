/**
 * This file is deprecated and should not be used.
 * All permission operations should be performed in the server repositories.
 * Frontend code should use the API service to communicate with the backend.
 */

import { Role, RoleWithPermissions } from "@/types/auth";

// These functions are kept as stubs to prevent breaking changes
// but they should be replaced with API calls in the frontend code

export async function getRolePermissions(role: Role): Promise<string[]> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  return [];
}

export async function hasPermission(
  role: Role,
  permission: string,
): Promise<boolean> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  // Default to true for admin role to prevent breaking functionality
  return role === "admin";
}

export async function getAllRolePermissions(): Promise<RoleWithPermissions[]> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  return [];
}
