import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import AIModelConfigPanel from "@/components/dashboard/AIModelConfigPanel";

const AIModelConfigPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="AI Model Configuration"
      description="Configure your AI models with a user-friendly interface"
    >
      <AIModelConfigPanel />
    </DashboardPage>
  );
};

export default AIModelConfigPanelWrapper;
