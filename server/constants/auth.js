/**
 * Authentication constants
 */

// Permission constants
const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_USERS: "manage_users",
  MANAGE_AI_MODELS: "manage_ai_models",
  MANAGE_CONTEXT_RULES: "manage_context_rules",
  MANAGE_PROMPT_TEMPLATES: "manage_prompt_templates",
  VIEW_ANALYTICS: "view_analytics",
  MANAGE_WEB_SCRAPING: "manage_web_scraping",
  MANAGE_INTEGRATION: "manage_integration",
  MANAGE_SYSTEM_CONFIG: "manage_system_config",
  MANAGE_KNOWLEDGE_BASE: "manage_knowledge_base",
};

// Role constants
const ROLES = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest",
};

module.exports = {
  PERMISSIONS,
  ROLES,
};
