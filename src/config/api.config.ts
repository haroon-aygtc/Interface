/**
 * API configuration for NestJS backend
 */

// Base URL for API requests to NestJS backend
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Default request timeout in milliseconds
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT as string || "10000", 10);

// API endpoints for NestJS backend
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  FORGOT_PASSWORD: "/password-reset/forgot",
  RESET_PASSWORD: "/password-reset/reset",
  PROFILE: "/auth/profile",

  // User endpoints
  USERS: "/users",
  USER: (id: string) => `/users/${id}`,

  // Permission endpoints
  PERMISSIONS: "/permissions",

  // Session endpoints
  SESSIONS: "/sessions",
  USER_SESSIONS: (userId: string) => `/sessions/user/${userId}`,
  SESSION: (token: string) => `/sessions/${token}`,
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
