import React, { useState } from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import { EmbeddedWidgetPreview } from "@/components/dashboard/EmbeddedWidgetPreview";
import { AdminContent } from "@/components/ui/admin-layout";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import { Maximize, Settings } from "lucide-react";

const EmbeddedWidgetPreviewWrapper: React.FC = () => {
  const [widgetColor, setWidgetColor] = useState("#7c3aed");
  const [widgetSize, setWidgetSize] = useState(60);
  const [widgetPosition, setWidgetPosition] = useState("bottom-right");
  const [autoOpen, setAutoOpen] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?");
  const [darkMode, setDarkMode] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [language, setLanguage] = useState("en");
  
  return (
    <DashboardPage
      title="Widget Preview"
      description="Preview and test your embedded chat widget"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Integration", href: ROUTES.INTEGRATION },
        { label: "Widget Preview" },
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Widget Settings
          </Button>
          <Button className="gap-2">
            <Maximize className="h-4 w-4" />
            Fullscreen Preview
          </Button>
        </div>
      }
    >
      <AdminContent>
        <div className="h-[600px] w-full bg-background rounded-lg overflow-hidden">
          <EmbeddedWidgetPreview
            widgetColor={widgetColor}
            widgetSize={widgetSize}
            widgetPosition={widgetPosition}
            autoOpen={autoOpen}
            welcomeMessage={welcomeMessage}
            darkMode={darkMode}
            showAIInsights={showAIInsights}
            language={language}
          />
        </div>
      </AdminContent>
    </DashboardPage>
  );
};

export default EmbeddedWidgetPreviewWrapper;
