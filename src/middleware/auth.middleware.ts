import { getAuthToken } from "@/utils/storage";
import { authService } from "@/services/auth.service";

/**
 * Middleware to check if the user is authenticated
 * This would be used in a real API server, but we're simulating it here
 */
export const requireAuth = async (req: Request): Promise<boolean> => {
  // Get the token from the request headers
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return false;
  }

  // Validate the token
  const user = await authService.getCurrentUser(token);
  return !!user;
};

/**
 * Middleware to check if the user has the required permissions
 */
export const requirePermission = async (
  req: Request,
  permission: string,
): Promise<boolean> => {
  // First check if the user is authenticated
  const isAuthenticated = await requireAuth(req);
  if (!isAuthenticated) {
    return false;
  }

  // Get the token from the request headers
  const authHeader = req.headers.get("Authorization");
  const token = authHeader!.split(" ")[1];

  // Get the user from the token
  const user = await authService.getCurrentUser(token);
  if (!user) {
    return false;
  }

  // Check if the user has the required permission
  return authService.hasPermission(user.role, permission);
};
