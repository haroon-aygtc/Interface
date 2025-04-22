/**
 * API configuration
 */

// Base URL for API requests
export const API_BASE_URL = "http://localhost:3001";

// Default request timeout in milliseconds
export const API_TIMEOUT = 10000;

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
  FORGOT_PASSWORD: "/password-reset",
  RESET_PASSWORD: "/password-reset/confirm",

  // User endpoints
  USERS: "/users",
  USER: (id: string) => `/users/${id}`,

  // Session endpoints
  SESSIONS: "/sessions",
  SESSION: (id: string) => `/sessions/${id}`,

  // Permission endpoints
  PERMISSIONS: "/permissions",

  // Password reset endpoints
  PASSWORD_RESETS: "/passwordResets",
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
