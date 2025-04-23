import React from "react";
import DashboardPage from "@/components/layouts/DashboardPage";
import { ROUTES } from "@/routes";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Save,
  Download,
  Upload,
  Settings,
  Search,
  Brain,
} from "lucide-react";

// Import all admin panel components
import AIModelConfig from "@/components/dashboard/AIModelConfig";
import ContextRulesPanel from "@/components/dashboard/ContextRulesPanel";
import PromptTemplatesPanel from "@/components/dashboard/PromptTemplatesPanel";
import AnalyticsPanel from "@/components/dashboard/AnalyticsPanel";
import WebScrapingPanel from "@/components/dashboard/WebScrapingPanel";
import IntegrationPanel from "@/components/dashboard/IntegrationPanel";
import SystemConfigPanel from "@/components/dashboard/SystemConfigPanel";
import KnowledgeBasePanel from "@/components/dashboard/KnowledgeBasePanel";
import UserManagementPanel from "@/components/dashboard/UserManagementPanel";
import AIInsightsPanel from "@/components/dashboard/AIInsightsPanel";

// AIModelConfig Wrapper
export const AIModelConfigWrapper: React.FC = () => {
  const handleSaveConfig = () => {
    // This will be passed to the AIModelConfig component
    console.log("Saving configuration...");
  };

  return (
    <DashboardPage
      title="AI Model Configuration"
      description="Configure and manage AI models for your chat interface"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "AI Models" },
      ]}
      actions={
        <Button className="gap-2" onClick={handleSaveConfig}>
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      }
    >
      <AIModelConfig onSave={handleSaveConfig} />
    </DashboardPage>
  );
};

// ContextRulesPanel Wrapper
export const ContextRulesPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Context Rules"
      description="Manage context rules for AI responses"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Context Rules" },
      ]}
      actions={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Rule
        </Button>
      }
    >
      <ContextRulesPanel />
    </DashboardPage>
  );
};

// PromptTemplatesPanel Wrapper
export const PromptTemplatesPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Prompt Templates"
      description="Manage and test prompt templates"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Prompt Templates" },
      ]}
      actions={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Template
        </Button>
      }
    >
      <PromptTemplatesPanel />
    </DashboardPage>
  );
};

// AnalyticsPanel Wrapper
export const AnalyticsPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Analytics"
      description="Track and analyze user interactions and AI performance"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Analytics" },
      ]}
      actions={
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      }
    >
      <AnalyticsPanel />
    </DashboardPage>
  );
};

// WebScrapingPanel Wrapper
export const WebScrapingPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Web Scraping"
      description="Configure and manage web scraping jobs"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Web Scraping" },
      ]}
      actions={
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => (window.location.href = "/ai-integration")}
          >
            <Brain className="h-4 w-4" />
            AI Integration
          </Button>
          <Button
            className="gap-2"
            onClick={() => (window.location.hash = "create-job")}
          >
            <Plus className="h-4 w-4" />
            New Scraping Job
          </Button>
        </div>
      }
    >
      <WebScrapingPanel />
    </DashboardPage>
  );
};

// IntegrationPanel Wrapper
export const IntegrationPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Integration"
      description="Manage widget and embedding options"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Integration" },
      ]}
      actions={
        <Button variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Widget Settings
        </Button>
      }
    >
      <IntegrationPanel />
    </DashboardPage>
  );
};

// SystemConfigPanel Wrapper
export const SystemConfigPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="System Configuration"
      description="Configure global system settings"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "System Config" },
      ]}
      actions={
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      }
    >
      <SystemConfigPanel />
    </DashboardPage>
  );
};

// KnowledgeBasePanel Wrapper
export const KnowledgeBasePanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="Knowledge Base"
      description="Manage your AI knowledge base"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "Knowledge Base" },
      ]}
      actions={
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Documents
        </Button>
      }
    >
      <KnowledgeBasePanel />
    </DashboardPage>
  );
};

// UserManagementPanel Wrapper
export const UserManagementPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="User Management"
      description="Manage users, roles and permissions"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "User Management" },
      ]}
      actions={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      }
    >
      <AdminContent>
        <UserManagementPanel />
      </AdminContent>
    </DashboardPage>
  );
};

// AIInsightsPanel Wrapper
export const AIInsightsPanelWrapper: React.FC = () => {
  return (
    <DashboardPage
      title="AI Insights"
      description="Gain insights from your AI chat data"
      breadcrumbItems={[
        { label: "Dashboard", href: ROUTES.DASHBOARD },
        { label: "AI Insights" },
      ]}
      actions={
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          Advanced Search
        </Button>
      }
    >
      <AdminContent>
        <AIInsightsPanel />
      </AdminContent>
    </DashboardPage>
  );
};

// AdminContent component for consistent admin panel styling
const AdminContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="w-full p-4 bg-background rounded-lg">{children}</div>;
};
