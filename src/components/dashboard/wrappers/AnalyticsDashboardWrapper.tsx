import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";

const AnalyticsDashboardWrapper = () => {
  return (
    <DashboardPage
      title="Analytics Dashboard"
      description="Interactive data visualization and analytics"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Analytics", href: ROUTES.ANALYTICS },
        { label: "Interactive Dashboard" },
      ]}
    >
      <AdminContent>
        <AnalyticsDashboard />
      </AdminContent>
    </DashboardPage>
  );
};

export default AnalyticsDashboardWrapper;
