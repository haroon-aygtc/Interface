import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save, MessageSquare } from "lucide-react";
import FollowUpBuilderPanel from "@/components/dashboard/FollowUpBuilderPanel";

const FollowUpBuilderPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Follow-Up Builder"
      description="Create and manage follow-up questions for your AI conversations"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Follow-Up Builder" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Questions
        </Button>
      }
    >
      <AdminContent>
        <FollowUpBuilderPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default FollowUpBuilderPanelWrapper;
