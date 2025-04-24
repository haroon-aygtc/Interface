import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import AIVisualizationPanel from "@/components/dashboard/AIVisualizationPanel";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";

const AIVisualizationPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="AI Visualization"
      description="Real-time insights and analytics for your AI conversations"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "AI Visualization" },
      ]}
    >
      <AdminContent>
        <AIVisualizationPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default AIVisualizationPanelWrapper;
