import { API_BASE_URL, API_TIMEOUT, API_ENDPOINTS } from "@/config/api.config";
import { getAuthToken, getRefreshToken, clearAuthData } from "@/utils/storage";

/**
 * API Error class for handling API errors
 */
export class ApiError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number = 400, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Timeout promise for fetch requests
 */
const timeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new ApiError(`Request timed out after ${timeout}ms`, 408));
    }, timeout);
  });
};

/**
 * Base API service for making HTTP requests
 */
export const apiService = {
  /**
   * Make a GET request
   */
  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  },

  /**
   * Make a POST request
   */
  async post<T>(
    url: string,
    data?: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Make a PUT request
   */
  async put<T>(url: string, data?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Make a PATCH request
   */
  async patch<T>(
    url: string,
    data?: any,
    options: RequestInit = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  },

  /**
   * Base request method
   */
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = getAuthToken();
    const headers = new Headers(options.headers || {});

    // Set default headers
    if (!headers.has("Content-Type") && options.body) {
      headers.set("Content-Type", "application/json");
    }

    // Set auth token if available
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

    try {
      // Race between fetch and timeout
      let response;
      try {
        response = await Promise.race([
          fetch(fullUrl, {
            ...options,
            headers,
            credentials: 'include', // Include cookies for CORS requests
          }),
          timeoutPromise(API_TIMEOUT),
        ]);
      } catch (fetchError) {
        // Handle network errors (e.g., server not reachable)
        console.error("Network error:", fetchError);
        throw new ApiError("Network error: Unable to connect to server", 0);
      }

      // Handle 401 Unauthorized - Try to refresh token
      if (response.status === 401 && getRefreshToken() && url !== API_ENDPOINTS.REFRESH_TOKEN) {
        try {
          // Import dynamically to avoid circular dependency
          const { authService } = await import('./auth.service');
          // Try to refresh the token
          const refreshSuccess = await authService.refreshToken();

          if (refreshSuccess) {
            // Retry the request with new token
            const newToken = getAuthToken();
            if (newToken) {
              headers.set("Authorization", `Bearer ${newToken}`);
            }

            // Retry the original request with the new token
            response = await fetch(fullUrl, {
              ...options,
              headers,
              credentials: 'include', // Include cookies for CORS requests
            });
          } else {
            // If refresh failed, clear auth data and throw error
            clearAuthData();
            throw new ApiError("Session expired. Please log in again.", 401);
          }
        } catch (refreshError) {
          // Handle errors during token refresh
          clearAuthData();
          throw new ApiError("Authentication failed. Please log in again.", 401);
        }
      }

      // Parse response data
      let data: any;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle error responses
      if (!response.ok) {
        const errorMessage =
          data.message || data.error || `API error: ${response.status}`;
        throw new ApiError(errorMessage, response.status, data);
      }

      return data as T;
    } catch (error) {
      // Handle fetch errors
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        console.error("Network error:", error);
        throw new ApiError("Network error: Unable to connect to server", 0);
      }

      // Log the error for debugging
      console.error("API request error:", error);

      // Return a more user-friendly error message
      throw new ApiError(
        (error as Error).message || "An error occurred while connecting to the server",
        0
      );
    }
  },
};
