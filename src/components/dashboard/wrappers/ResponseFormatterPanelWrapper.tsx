import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Save, FileText } from "lucide-react";
import ResponseFormatterPanel from "@/components/dashboard/ResponseFormatterPanel";

const ResponseFormatterPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Response Formatter"
      description="Create and manage response formats for AI-generated content"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Response Formatter" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Formats
        </Button>
      }
    >
      <AdminContent>
        <ResponseFormatterPanel />
      </AdminContent>
    </DashboardPage>
  );
};

export default ResponseFormatterPanelWrapper;
