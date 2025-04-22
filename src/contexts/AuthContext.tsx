import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '@/lib/mockData';

// Minimal User interface for mock purposes
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Simplified AuthContext with only what's needed for UI demonstration
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  forgotPassword: (email: string) => void;
  resetPassword: (token: string, password: string) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Simplified AuthProvider that just provides mock authentication
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to logged in with admin user for demo purposes
  const adminUser = mockUsers.find(u => u.role === 'admin');
  const [user, setUser] = useState<User | null>(adminUser || null);
  const [isLoading, setIsLoading] = useState(false);

  // All functions just simulate a brief loading state and then complete
  const simulateLoading = (callback: () => void) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, 500);
  };

  // Mock login - always succeeds with any email that matches a mock user
  const login = (email: string, password: string) => {
    simulateLoading(() => {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
      }
    });
  };

  // Mock register - always succeeds
  const register = (name: string, email: string, password: string) => {
    simulateLoading(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user",
      };
      setUser(newUser);
    });
  };

  // Mock logout
  const logout = () => {
    setUser(null);
  };

  // Mock password reset functions
  const forgotPassword = (email: string) => {
    simulateLoading(() => {
      console.log(`Mock password reset for ${email}`);
    });
  };

  const resetPassword = (token: string, password: string) => {
    simulateLoading(() => {
      console.log(`Mock password reset with token ${token}`);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
