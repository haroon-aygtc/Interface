import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionValue } from "@/types/auth";

interface PermissionGateProps {
  /**
   * The permissions required to render the children
   */
  permissions: PermissionValue | PermissionValue[];

  /**
   * Whether all permissions are required (AND) or any permission is sufficient (OR)
   */
  requireAll?: boolean;

  /**
   * Content to render when user has the required permissions
   */
  children: React.ReactNode;

  /**
   * Optional content to render when user doesn't have the required permissions
   */
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders content based on user permissions
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  permissions,
  requireAll = true,
  children,
  fallback = null,
}) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission } =
    usePermissions();

  // Handle single permission case
  if (!Array.isArray(permissions)) {
    return hasPermission(permissions) ? <>{children}</> : <>{fallback}</>;
  }

  // Handle multiple permissions
  const hasRequiredPermissions = requireAll
    ? hasAllPermissions(permissions)
    : hasAnyPermission(permissions);

  return hasRequiredPermissions ? <>{children}</> : <>{fallback}</>;
};
