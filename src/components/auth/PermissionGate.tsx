import React from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionValue } from "@/types/auth";

interface PermissionGateProps {
  permissions: PermissionValue | PermissionValue[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAll?: boolean;
}

/**
 * Component that conditionally renders children based on user permissions
 */
export const PermissionGate: React.FC<PermissionGateProps> = ({
  permissions,
  children,
  fallback = null,
  requireAll = false,
}) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission } =
    usePermissions();

  // Check if user has the required permissions
  const hasRequiredPermissions = () => {
    if (Array.isArray(permissions)) {
      return requireAll
        ? hasAllPermissions(permissions)
        : hasAnyPermission(permissions);
    }
    return hasPermission(permissions);
  };

  return hasRequiredPermissions() ? <>{children}</> : <>{fallback}</>;
};
