export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  token: string;
  password: string;
}

export type Role = "admin" | "user" | "guest";

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RoleWithPermissions {
  role: Role;
  permissions: string[];
}

export const PERMISSIONS = {
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
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;
export type PermissionValue = (typeof PERMISSIONS)[PermissionKey];
