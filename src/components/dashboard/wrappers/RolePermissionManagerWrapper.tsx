import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import RolePermissionManager from "@/components/dashboard/RolePermissionManager";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const RolePermissionManagerWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Role & Permission Management"
      description="Configure permissions for different user roles"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Role & Permission Management" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      }
    >
      <div className="w-full p-4 bg-background rounded-lg">
        <RolePermissionManager />
      </div>
    </DashboardPage>
  );
};

export default RolePermissionManagerWrapper;
