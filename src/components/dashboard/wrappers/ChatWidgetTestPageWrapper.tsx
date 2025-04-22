import React from 'react';
import DashboardPage from '@/components/layouts/DashboardPage';
import ChatWidgetTestPage from '@/components/dashboard/ChatWidgetTestPage';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';

const ChatWidgetTestPageWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Chat Widget Test"
      description="Preview and test your chat widget with different configurations"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Integration", href: ROUTES.INTEGRATION },
        { label: "Widget Test" }
      ]}
      actions={
        <Button variant="outline" className="gap-2">
          <Maximize className="h-4 w-4" />
          Fullscreen Preview
        </Button>
      }
    >
      <ChatWidgetTestPageWithoutHeader />
    </DashboardPage>
  );
};

// Modified version of ChatWidgetTestPage without the header
const ChatWidgetTestPageWithoutHeader: React.FC = () => {
  // Use the original component but render without its header
  return <ChatWidgetTestPage />;
};

export default ChatWidgetTestPageWrapper;
