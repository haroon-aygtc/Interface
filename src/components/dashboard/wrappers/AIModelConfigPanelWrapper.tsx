import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import AIModelConfigPanel from "@/components/dashboard/AIModelConfigPanel";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";

const AIModelConfigPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="AI Model Configuration"
      description="Configure your AI models with a user-friendly interface"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "AI Model Configuration" },
      ]}
    >
      <AdminContent>
        <AIModelConfigPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default AIModelConfigPanelWrapper;
