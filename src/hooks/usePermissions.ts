import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { PERMISSIONS, PermissionValue } from "@/types/auth";

/**
 * Custom hook to check user permissions
 */
export const usePermissions = () => {
  const { user, checkPermission } = useAuth();

  /**
   * Check if the current user has a specific permission
   */
  const hasPermission = useCallback(
    (permission: PermissionValue): boolean => {
      if (!user) return false;
      return checkPermission(permission);
    },
    [user, checkPermission],
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
   * Check if the current user is an admin
   */
  const isAdmin = useCallback((): boolean => {
    return user?.role === "admin";
  }, [user]);

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isAdmin,
    permissions: PERMISSIONS,
  };
};
