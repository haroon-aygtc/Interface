import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  PermissionValue,
} from "@/types/auth";
import { authService } from "@/services/auth.service";
import { apiService } from "@/services/api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import {
  setAuthToken,
  getAuthToken,
  setRefreshToken,
  setUserData,
  getUserData,
  clearAuthData,
} from "@/utils/storage";

// Define the shape of the auth context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  checkPermission: (permission: PermissionValue) => boolean;
  clearError: () => void;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  refreshToken: async () => false,
  forgotPassword: async () => { },
  resetPassword: async () => { },
  checkPermission: () => false,
  clearError: () => { },
});

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [permissionCache, setPermissionCache] = useState<
    Record<string, boolean>
  >({});

  // Initialize auth state from local storage
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const token = getAuthToken();
        const cachedUser = getUserData();

        if (token && cachedUser) {
          try {
            // Validate token with the server
            const userData = await apiService.get<User>(API_ENDPOINTS.PROFILE);
            if (userData) {
              // Update user data in state and storage
              setUser(userData);
              setUserData(userData);
            } else {
              // Token is invalid, clear storage
              clearAuthData();
              setUser(null);
            }
          } catch (err) {
            console.error("Failed to validate token:", err);
            // Clear auth data on error
            clearAuthData();
            setUser(null);
          }
        } else {
          // No token or user data in storage
          clearAuthData();
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.post<AuthResponse>(
        API_ENDPOINTS.LOGIN,
        credentials,
      );

      // Save to local storage
      setAuthToken(response.token);
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      setUserData(response.user);

      // Update state
      setUser(response.user);
    } catch (err: any) {
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.post<AuthResponse>(
        API_ENDPOINTS.REGISTER,
        credentials,
      );

      // Save to local storage
      setAuthToken(response.token);
      if (response.refreshToken) {
        setRefreshToken(response.refreshToken);
      }
      setUserData(response.user);

      // Update state
      setUser(response.user);
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      if (user) {
        await apiService.post(API_ENDPOINTS.LOGOUT);
      }

      // Clear local storage
      clearAuthData();

      // Update state
      setUser(null);
      setPermissionCache({});
    } catch (err: any) {
      setError(err.message || "Failed to logout");
      // Still clear local data even if server logout fails
      clearAuthData();
      setUser(null);
      setPermissionCache({});
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async (): Promise<boolean> => {
    try {
      const success = await authService.refreshToken();

      if (success) {
        // Update user data
        const userData = await apiService.get<User>(API_ENDPOINTS.PROFILE);
        if (userData) {
          setUserData(userData);
          setUser(userData);
        }
        return true;
      } else {
        // If refresh fails, log the user out
        clearAuthData();
        setUser(null);
        setPermissionCache({});
        return false;
      }
    } catch (err) {
      // If refresh fails, log the user out
      clearAuthData();
      setUser(null);
      setPermissionCache({});
      return false;
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await apiService.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (err: any) {
      setError(err.message || "Failed to process password reset");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (
    credentials: ResetPasswordCredentials,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await apiService.post(API_ENDPOINTS.RESET_PASSWORD, credentials);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific permission
  const checkPermission = useCallback(
    (permission: PermissionValue): boolean => {
      if (!user) return false;

      // Check cache first
      const cacheKey = `${user.role}:${permission}`;
      if (permissionCache[cacheKey] !== undefined) {
        return permissionCache[cacheKey];
      }

      // Admin role has all permissions
      if (user.role === "admin") {
        setPermissionCache((prev) => ({ ...prev, [cacheKey]: true }));
        return true;
      }

      // For other roles, we'll use the usePermissions hook elsewhere
      // This is a simplified implementation that defaults to false
      // until the permissions are loaded by the usePermissions hook
      return false;
    },
    [user, permissionCache],
  );

  // Clear error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshToken,
        forgotPassword,
        resetPassword,
        checkPermission,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
