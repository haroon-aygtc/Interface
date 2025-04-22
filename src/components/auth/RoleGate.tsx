import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/auth";

interface RoleGateProps {
  /**
   * The roles allowed to access the content
   */
  allowedRoles: Role | Role[];

  /**
   * Content to render when user has an allowed role
   */
  children: React.ReactNode;

  /**
   * Optional content to render when user doesn't have an allowed role
   */
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders content based on user role
 */
export const RoleGate: React.FC<RoleGateProps> = ({
  allowedRoles,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();

  if (!user) return <>{fallback}</>;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return roles.includes(user.role as Role) ? <>{children}</> : <>{fallback}</>;
};
