/**
 * This file is deprecated and should not be used.
 * All session operations should be performed in the server repositories.
 * Frontend code should use the API service to communicate with the backend.
 */

// Session interface
interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

// These functions are kept as stubs to prevent breaking changes
// but they should be replaced with API calls in the frontend code

export async function createSession(userId: string): Promise<Session> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}

export async function findSessionByToken(
  token: string,
): Promise<Session | null> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  return null;
}

export async function deleteUserSessions(userId: string): Promise<void> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}

export async function deleteSessionByToken(token: string): Promise<void> {
  console.warn(
    "Deprecated: Use API service instead of direct repository access",
  );
  throw new Error("This function is deprecated. Use API service instead.");
}
