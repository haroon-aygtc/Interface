import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  PermissionValue,
} from "@/types/auth";
import { authService } from "@/services/auth.service";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setUserData,
  getUserData,
  removeUserData,
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
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  checkPermission: () => false,
  clearError: () => {},
});

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
      try {
        const token = getAuthToken();
        const cachedUser = getUserData();

        if (token && cachedUser) {
          // Validate token with the server
          const currentUser = await authService.getCurrentUser(token);

          if (currentUser) {
            setUser(currentUser);
          } else {
            // Token is invalid, clear storage
            clearAuthData();
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        clearAuthData();
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
      const { user, token } = await authService.login(credentials);

      // Save to local storage
      setAuthToken(token);
      setUserData(user);

      // Update state
      setUser(user);
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
      const { user, token } = await authService.register(credentials);

      // Save to local storage
      setAuthToken(token);
      setUserData(user);

      // Update state
      setUser(user);
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
        await authService.logout(user.id);
      }

      // Clear local storage
      clearAuthData();

      // Update state
      setUser(null);
      setPermissionCache({});
    } catch (err: any) {
      setError(err.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(email);
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
      await authService.resetPassword(credentials);
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

      // For other roles, check with the service
      // This would normally be an async call, but we're making it sync for simplicity
      // In a real app, you might want to use a more sophisticated caching strategy
      authService
        .hasPermission(user.role, permission)
        .then((hasPermission) => {
          setPermissionCache((prev) => ({
            ...prev,
            [cacheKey]: hasPermission,
          }));
        })
        .catch((err) => {
          console.error("Failed to check permission:", err);
        });

      // Default to false until we know for sure
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
