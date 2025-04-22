import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import AIIntegrationPanel from "@/components/dashboard/AIIntegrationPanel";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { AdminContent } from "@/components/ui/admin-layout";

const AIIntegrationPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="AI Integration"
      description="Configure and test your AI assistant"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "AI Integration" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      }
    >
      <AdminContent>
        <AIIntegrationPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default AIIntegrationPanelWrapper;
