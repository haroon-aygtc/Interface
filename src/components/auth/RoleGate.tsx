import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/auth";

interface RoleGateProps {
  roles: Role | Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on user role
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  roles,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();

  // Check if user has the required role
  const hasRequiredRole = () => {
    if (!user) return false;

    if (Array.isArray(roles)) {
      return roles.includes(user.role as Role);
    }

    return user.role === roles;
  };

  return hasRequiredRole() ? <>{children}</> : <>{fallback}</>;
};
