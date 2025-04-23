/**
 * Authentication types
 */

// User roles
export type Role = "admin" | "user" | "guest";

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

// Authentication response
export interface AuthResponse {
  user: User;
  token: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration credentials
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Reset password credentials
export interface ResetPasswordCredentials {
  token: string;
  password: string;
}

// Role with permissions
export interface RoleWithPermissions {
  role: Role;
  permissions: string[];
}

// Permission values
export type PermissionValue =
  | "view_dashboard"
  | "manage_users"
  | "manage_ai_models"
  | "manage_context_rules"
  | "manage_prompt_templates"
  | "view_analytics"
  | "manage_web_scraping"
  | "manage_integration"
  | "manage_system_config"
  | "manage_knowledge_base";

// Permissions enum
export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard" as PermissionValue,
  MANAGE_USERS: "manage_users" as PermissionValue,
  MANAGE_AI_MODELS: "manage_ai_models" as PermissionValue,
  MANAGE_CONTEXT_RULES: "manage_context_rules" as PermissionValue,
  MANAGE_PROMPT_TEMPLATES: "manage_prompt_templates" as PermissionValue,
  VIEW_ANALYTICS: "view_analytics" as PermissionValue,
  MANAGE_WEB_SCRAPING: "manage_web_scraping" as PermissionValue,
  MANAGE_INTEGRATION: "manage_integration" as PermissionValue,
  MANAGE_SYSTEM_CONFIG: "manage_system_config" as PermissionValue,
  MANAGE_KNOWLEDGE_BASE: "manage_knowledge_base" as PermissionValue,
};
