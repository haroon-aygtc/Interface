import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import MockSelectorGroupManager from "@/components/dashboard/MockSelectorGroupManager";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminContent } from "@/components/ui/admin-layout";

const MockSelectorGroupManagerWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Selector Groups"
      description="Manage reusable selector groups for web scraping"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Web Scraping", href: ROUTES.WEB_SCRAPING },
        { label: "Selector Groups" },
      ]}
      actions={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Group
        </Button>
      }
    >
      <AdminContent>
        <MockSelectorGroupManager />
      </AdminContent>
    </DashboardPage>
  );
};

export default MockSelectorGroupManagerWrapper;
