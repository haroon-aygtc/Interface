import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save, Palette } from "lucide-react";
import BrandingManagerPanel from "@/components/dashboard/BrandingManagerPanel";

const BrandingManagerPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Branding Manager"
      description="Customize the look and feel of your AI chat interface"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Branding Manager" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Brand Settings
        </Button>
      }
    >
      <AdminContent>
        <BrandingManagerPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default BrandingManagerPanelWrapper;
