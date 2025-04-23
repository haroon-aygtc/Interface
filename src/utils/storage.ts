/**
 * Storage utility for handling token and user data persistence
 */

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user",
  REMEMBERED_EMAIL: "remembered_email",
};

/**
 * Set auth token in local storage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Get auth token from local storage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Remove auth token from local storage
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Set user data in local storage
 */
export const setUserData = (user: any): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

/**
 * Get user data from local storage
 */
export const getUserData = (): any | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove user data from local storage
 */
export const removeUserData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

/**
 * Set remembered email in local storage
 */
export const setRememberedEmail = (email: string): void => {
  localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email);
};

/**
 * Get remembered email from local storage
 */
export const getRememberedEmail = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL);
};

/**
 * Remove remembered email from local storage
 */
export const removeRememberedEmail = (): void => {
  localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
};

/**
 * Clear all auth related data from local storage
 */
export const clearAuthData = (): void => {
  removeAuthToken();
  removeUserData();
};
