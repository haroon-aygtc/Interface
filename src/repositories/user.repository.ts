/**
 * This file is deprecated and should not be used.
 * All database operations should be performed in the server repositories.
 * Frontend code should use the API service to communicate with the backend.
 */

import { User } from "@/types/auth";
import { apiService } from "@/services/api.service";
import { API_ENDPOINTS } from "@/config/api.config";

// These functions are kept as stubs to prevent breaking changes
// but they should be replaced with API calls in the frontend code

export async function findUserByEmail(email: string): Promise<User | null> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  return null;
}

export async function findUserById(id: string): Promise<User | null> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  return null;
}

export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<User> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}

export async function updateUser(
  id: string,
  userData: Partial<User>,
): Promise<User | null> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}

export async function deleteUser(id: string): Promise<boolean> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}

export async function getAllUsers(): Promise<User[]> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}
