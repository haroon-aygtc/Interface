import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * Custom hook to access authentication context
 *
 * This hook provides access to:
 * - User data
 * - Authentication state
 * - Login, register, logout functions
 * - Password reset functionality
 * - Permission checking
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
