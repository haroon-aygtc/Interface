import React from 'react';
import DashboardPage from '@/components/layouts/DashboardPage';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';

const AnalyticsDashboardWrapper = () => {
  return (
    <DashboardPage
      title="Analytics Dashboard"
      description="Interactive data visualization and analytics"
      breadcrumbItems={[
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Analytics', link: '/dashboard/analytics' },
        { label: 'Interactive Dashboard', link: '/dashboard/analytics/interactive' }
      ]}
    >
      <AnalyticsDashboard />
    </DashboardPage>
  );
};

export default AnalyticsDashboardWrapper;
