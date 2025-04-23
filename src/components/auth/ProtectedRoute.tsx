import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { ROUTES } from "@/routes";
import { PermissionValue } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredPermissions?: PermissionValue[];
  requiresAllPermissions?: boolean;
}

export default function ProtectedRoute({
  children,
  redirectTo = ROUTES.LOGIN,
  requiredPermissions = [],
  requiresAllPermissions = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasAllPermissions, hasAnyPermission } = usePermissions();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D8A23B]"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasPermission = requiresAllPermissions
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);

    if (!hasPermission) {
      // Redirect to unauthorized page or dashboard
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
  }

  // Render children if authenticated and authorized
  return <>{children}</>;
}
