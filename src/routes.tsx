import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
// Authentication protection removed for testing
import {
  AIModelConfigWrapper,
  ContextRulesPanelWrapper,
  PromptTemplatesPanelWrapper,
  AnalyticsPanelWrapper,
  WebScrapingPanelWrapper,
  IntegrationPanelWrapper,
  SystemConfigPanelWrapper,
  KnowledgeBasePanelWrapper,
  UserManagementPanelWrapper,
  AIInsightsPanelWrapper,
} from "./components/dashboard/wrappers/AdminPanelWrappers";
import AIIntegrationPanelWrapper from "./components/dashboard/wrappers/AIIntegrationPanelWrapper";
import AIModelConfigPanelWrapper from "./components/dashboard/wrappers/AIModelConfigPanelWrapper";
import AnalyticsDashboardWrapper from "./components/dashboard/wrappers/AnalyticsDashboardWrapper";
import LuxuryHome from "./components/landing-page/LuxuryHome";
import MockSelectorGroupManagerWrapper from "./components/dashboard/wrappers/MockSelectorGroupManagerWrapper";
import ChatWidgetTestPageWrapper from "./components/dashboard/wrappers/ChatWidgetTestPageWrapper";
import RolePermissionManagerWrapper from "./components/dashboard/wrappers/RolePermissionManagerWrapper";

// Define route paths as constants for easy reference
export const ROUTES = {
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  // Main routes
  HOME: "/",
  DASHBOARD: "/dashboard",

  // AI Models routes
  AI_MODELS: "/dashboard/ai-models",
  AI_MODELS_GENERAL: "/dashboard/ai-models/general",
  AI_MODELS_ADVANCED: "/dashboard/ai-models/advanced",
  AI_MODELS_TESTING: "/dashboard/ai-models/testing",
  AI_MODEL_CONFIG: "/dashboard/ai-model-config",

  // AI Integration routes
  AI_INTEGRATION: "/dashboard/ai-integration",
  AI_INTEGRATION_CONFIG: "/dashboard/ai-integration/configuration",
  AI_INTEGRATION_TEST: "/dashboard/ai-integration/test",

  // Context Rules routes
  CONTEXT_RULES: "/dashboard/context-rules",
  CONTEXT_RULES_LIST: "/dashboard/context-rules/list",
  CONTEXT_RULES_CREATE: "/dashboard/context-rules/create",
  CONTEXT_RULES_EDIT: "/dashboard/context-rules/edit",
  CONTEXT_RULES_TEST: "/dashboard/context-rules/test",

  // Prompt Templates routes
  PROMPT_TEMPLATES: "/dashboard/prompt-templates",
  PROMPT_TEMPLATES_LIST: "/dashboard/prompt-templates/list",
  PROMPT_TEMPLATES_CREATE: "/dashboard/prompt-templates/create",
  PROMPT_TEMPLATES_EDIT: "/dashboard/prompt-templates/edit",
  PROMPT_TEMPLATES_TEST: "/dashboard/prompt-templates/test",

  // Analytics routes
  ANALYTICS: "/dashboard/analytics",
  ANALYTICS_OVERVIEW: "/dashboard/analytics/overview",
  ANALYTICS_ENGAGEMENT: "/dashboard/analytics/engagement",
  ANALYTICS_PERFORMANCE: "/dashboard/analytics/performance",
  ANALYTICS_CONTENT: "/dashboard/analytics/content",
  ANALYTICS_INTERACTIVE: "/dashboard/analytics/interactive",

  // Web Scraping routes
  WEB_SCRAPING: "/dashboard/web-scraping",
  WEB_SCRAPING_JOBS: "/dashboard/web-scraping/jobs",
  WEB_SCRAPING_CREATE: "/dashboard/web-scraping/create",
  WEB_SCRAPING_EDIT: "/dashboard/web-scraping/edit",
  WEB_SCRAPING_PREVIEW: "/dashboard/web-scraping/preview",
  WEB_SCRAPING_SELECTORS: "/dashboard/web-scraping/selectors",
  WEB_SCRAPING_DATA: "/dashboard/web-scraping/data",
  WEB_SCRAPING_SETTINGS: "/dashboard/web-scraping/settings",
  SELECTOR_GROUPS: "/dashboard/web-scraping/selector-groups",

  // Integration routes
  INTEGRATION: "/dashboard/integration",
  INTEGRATION_WIDGET: "/dashboard/integration/widget",
  INTEGRATION_CODE: "/dashboard/integration/code",
  INTEGRATION_ADVANCED: "/dashboard/integration/advanced",
  CHAT_WIDGET_TEST: "/dashboard/chat-widget-test",
  AI_INSIGHTS: "/dashboard/ai-insights",

  // System Config routes
  SYSTEM_CONFIG: "/dashboard/system-config",
  SYSTEM_CONFIG_AUTH: "/dashboard/system-config/authentication",
  SYSTEM_CONFIG_API: "/dashboard/system-config/api-connections",
  SYSTEM_CONFIG_SESSIONS: "/dashboard/system-config/sessions",
  SYSTEM_CONFIG_STORAGE: "/dashboard/system-config/storage",

  // Knowledge Base routes
  KNOWLEDGE_BASE: "/dashboard/knowledge-base",
  KNOWLEDGE_BASE_ITEMS: "/dashboard/knowledge-base/items",
  KNOWLEDGE_BASE_CATEGORIES: "/dashboard/knowledge-base/categories",
  KNOWLEDGE_BASE_CREATE: "/dashboard/knowledge-base/create",
  KNOWLEDGE_BASE_EDIT: "/dashboard/knowledge-base/edit",
  KNOWLEDGE_BASE_IMPORT: "/dashboard/knowledge-base/import-export",

  // User Management routes
  USER_MANAGEMENT: "/dashboard/user-management",
  USER_MANAGEMENT_USERS: "/dashboard/user-management/users",
  USER_MANAGEMENT_ROLES: "/dashboard/user-management/roles",
  USER_MANAGEMENT_ADD_USER: "/dashboard/user-management/add-user",
  USER_MANAGEMENT_EDIT_USER: "/dashboard/user-management/edit-user",
  USER_MANAGEMENT_ADD_ROLE: "/dashboard/user-management/add-role",
  USER_MANAGEMENT_EDIT_ROLE: "/dashboard/user-management/edit-role",
  ROLE_PERMISSIONS: "/dashboard/role-permissions",

  // Redirects - Main sections
  ADMIN: "/admin",
  MODELS: "/models",
  CONFIG: "/config",
  RULES: "/rules",
  TEMPLATES: "/templates",
  STATS: "/stats",
  SCRAPING: "/scraping",
  INTEGRATE: "/integrate",
  SETTINGS: "/settings",
  USERS: "/users",
  KNOWLEDGE: "/knowledge",

  // Redirects - Specific tabs
  ANALYTICS_STATS: "/analytics/stats",
  ANALYTICS_USERS: "/analytics/users",
  ANALYTICS_METRICS: "/analytics/metrics",
  ANALYTICS_REPORTS: "/analytics/reports",

  MODEL_SETTINGS: "/model-settings",
  MODEL_ADVANCED: "/model-advanced",
  MODEL_TEST: "/model-test",

  INTEGRATION_SETUP: "/integration-setup",
  INTEGRATION_EMBED: "/integration-embed",

  RULES_LIST: "/rules-list",
  RULES_CREATE: "/rules-create",
  RULES_TEST: "/rules-test",

  TEMPLATES_LIST: "/templates-list",
  TEMPLATES_CREATE: "/templates-create",
  TEMPLATES_TEST: "/templates-test",

  SCRAPING_JOBS: "/scraping-jobs",
  SCRAPING_CREATE: "/scraping-create",
  SCRAPING_PREVIEW: "/scraping-preview",
  SCRAPING_SELECTORS: "/scraping-selectors",

  SYSTEM_AUTH: "/system-auth",
  SYSTEM_API: "/system-api",
  SYSTEM_STORAGE: "/system-storage",
};

// Define the routes configuration
const routes = [
  // Auth routes
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.HOME,
    element: <LuxuryHome />,
  },
  // Dashboard route (public for testing)
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
  },
  // AI Models routes
  {
    path: ROUTES.AI_MODELS,
    element: <AIModelConfigWrapper />,
  },
  {
    path: ROUTES.AI_MODEL_CONFIG,
    element: <AIModelConfigPanelWrapper />,
  },
  // AI Integration routes
  {
    path: ROUTES.AI_INTEGRATION,
    element: <AIIntegrationPanelWrapper />,
  },
  // Context Rules routes
  {
    path: ROUTES.CONTEXT_RULES,
    element: <ContextRulesPanelWrapper />,
  },
  // Prompt Templates routes
  {
    path: ROUTES.PROMPT_TEMPLATES,
    element: <PromptTemplatesPanelWrapper />,
  },
  // Analytics routes
  {
    path: ROUTES.ANALYTICS,
    element: <AnalyticsPanelWrapper />,
  },
  {
    path: ROUTES.ANALYTICS_INTERACTIVE,
    element: <AnalyticsDashboardWrapper />,
  },
  // Web Scraping routes
  {
    path: ROUTES.WEB_SCRAPING,
    element: <WebScrapingPanelWrapper />,
  },
  // Selector Groups route
  {
    path: ROUTES.SELECTOR_GROUPS,
    element: <MockSelectorGroupManagerWrapper />,
  },
  // Integration routes
  {
    path: ROUTES.INTEGRATION,
    element: <IntegrationPanelWrapper />,
  },
  // Chat Widget Test route
  {
    path: ROUTES.CHAT_WIDGET_TEST,
    element: <ChatWidgetTestPageWrapper />,
  },
  // AI Insights route
  {
    path: ROUTES.AI_INSIGHTS,
    element: <AIInsightsPanelWrapper />,
  },
  // System Config routes
  {
    path: ROUTES.SYSTEM_CONFIG,
    element: <SystemConfigPanelWrapper />,
  },
  // Knowledge Base routes
  {
    path: ROUTES.KNOWLEDGE_BASE,
    element: <KnowledgeBasePanelWrapper />,
  },
  // User Management routes
  {
    path: ROUTES.USER_MANAGEMENT,
    element: <UserManagementPanelWrapper />,
  },
  // Role Permissions route
  {
    path: ROUTES.ROLE_PERMISSIONS,
    element: <RolePermissionManagerWrapper />,
  },
  // Redirects
  {
    path: ROUTES.ADMIN,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.MODELS,
    element: <Navigate to={ROUTES.AI_MODELS} replace />,
  },
  {
    path: ROUTES.CONFIG,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG} replace />,
  },
  {
    path: ROUTES.RULES,
    element: <Navigate to={ROUTES.CONTEXT_RULES} replace />,
  },
  {
    path: ROUTES.TEMPLATES,
    element: <Navigate to={ROUTES.PROMPT_TEMPLATES} replace />,
  },
  {
    path: ROUTES.STATS,
    element: <Navigate to={ROUTES.ANALYTICS} replace />,
  },
  {
    path: ROUTES.SCRAPING,
    element: <Navigate to={ROUTES.WEB_SCRAPING} replace />,
  },
  {
    path: ROUTES.INTEGRATE,
    element: <Navigate to={ROUTES.INTEGRATION} replace />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <Navigate to={ROUTES.SYSTEM_CONFIG} replace />,
  },
  {
    path: ROUTES.USERS,
    element: <Navigate to={ROUTES.USER_MANAGEMENT} replace />,
  },
  {
    path: ROUTES.KNOWLEDGE,
    element: <Navigate to={ROUTES.KNOWLEDGE_BASE} replace />,
  },
  // Allow Tempo routes
  {
    path: "/tempobook/*",
    element: null,
  },
  // Default redirect for unknown routes
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
];

export default routes;
