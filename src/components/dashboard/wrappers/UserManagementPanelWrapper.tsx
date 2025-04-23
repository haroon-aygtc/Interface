import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import UserManagementPanel from "@/components/dashboard/UserManagementPanel";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { PERMISSIONS } from "@/types/auth";

const UserManagementPanelWrapper: React.FC = () => {
  return (
    <PermissionGate
      permissions={PERMISSIONS.MANAGE_USERS}
      fallback={
        <DashboardPage
          title="Access Denied"
          description="You don't have permission to access this page"
          breadcrumbItems={[
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Access Denied" },
          ]}
        >
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground">
                You don't have permission to access the User Management page.
              </p>
            </div>
          </div>
        </DashboardPage>
      }
    >
      <DashboardPage
        title="User Management"
        description="Manage users, roles, and permissions"
        breadcrumbItems={[
          { label: "Dashboard", href: ROUTES.DASHBOARD },
          { label: "User Management" },
        ]}
      >
        <AdminContent>
          <UserManagementPanel />
        </AdminContent>
      </DashboardPage>
    </PermissionGate>
  );
};

export default UserManagementPanelWrapper;
