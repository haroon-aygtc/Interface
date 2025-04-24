import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import TenantConfig from "@/components/dashboard/TenantConfig";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const TenantConfigWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Tenant Configuration"
      description="Configure settings for your tenant"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Tenant Configuration" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      }
    >
      <AdminContent>
        <TenantConfig />
      </AdminContent>
    </DashboardPage>
  );
};

export default TenantConfigWrapper;
