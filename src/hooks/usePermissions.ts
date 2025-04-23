import { useCallback, useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { PERMISSIONS, PermissionValue } from "@/types/auth";
import { apiService } from "@/services/api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import { toast } from "@/components/ui/use-toast";

/**
 * Custom hook to check user permissions
 */
export const usePermissions = () => {
  const { user } = useAuth();
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch permissions for all roles
  const fetchAllRolePermissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.get(`${API_ENDPOINTS.PERMISSIONS}/roles`);
      const permissions = data.reduce(
        (acc: Record<string, string[]>, item: any) => {
          acc[item.role] = item.permissions;
          return acc;
        },
        {},
      );
      setRolePermissions(permissions);
      return permissions;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch permissions";
      console.error(errorMessage, err);
      setError(errorMessage);

      // Show toast notification for error
      toast({
        title: "Permission Error",
        description: errorMessage,
        variant: "destructive",
      });
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch permissions for the current user's role
  useEffect(() => {
    if (user?.role && Object.keys(rolePermissions).length === 0) {
      fetchAllRolePermissions();
    }
  }, [user, rolePermissions, fetchAllRolePermissions]);

  /**
   * Check if the current user has a specific permission
   */
  const hasPermission = useCallback(
    (permission: PermissionValue): boolean => {
      if (!user) return false;

      // Admin role has all permissions
      if (user.role === "admin") return true;

      // Check if we have the permissions for this role
      if (rolePermissions[user.role]) {
        return rolePermissions[user.role].includes(permission);
      }

      return false;
    },
    [user, rolePermissions],
  );

  /**
   * Check if the current user has all of the specified permissions
   */
  const hasAllPermissions = useCallback(
    (permissions: PermissionValue[]): boolean => {
      return permissions.every((permission) => hasPermission(permission));
    },
    [hasPermission],
  );

  /**
   * Check if the current user has any of the specified permissions
   */
  const hasAnyPermission = useCallback(
    (permissions: PermissionValue[]): boolean => {
      return permissions.some((permission) => hasPermission(permission));
    },
    [hasPermission],
  );

  /**
   * Get all permissions for the current user
   */
  const getUserPermissions = useCallback((): string[] => {
    if (!user) return [];
    if (user.role === "admin") {
      // Admin has all permissions
      return Object.values(PERMISSIONS);
    }
    return rolePermissions[user.role] || [];
  }, [user, rolePermissions]);

  return {
    loading,
    error,
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    getUserPermissions,
    rolePermissions,
    fetchAllRolePermissions,
  };
};
