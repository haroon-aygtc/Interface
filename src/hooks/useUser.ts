import { useState, useEffect, useCallback } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/auth";
import { useAuth } from "./useAuth";

/**
 * Custom hook for user operations
 */
export const useUser = (userId?: string) => {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a single user by ID
  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await userService.getUserById(id);
      setUser(userData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a user
  const updateUser = useCallback(
    async (id: string, userData: Partial<User>) => {
      setLoading(true);
      setError(null);

      try {
        const updatedUser = await userService.updateUser(id, userData);
        setUser(updatedUser);
        return updatedUser;
      } catch (err: any) {
        setError(err.message || "Failed to update user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Create a user
  const createUser = useCallback(
    async (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      setLoading(true);
      setError(null);

      try {
        const newUser = await userService.createUser(userData);
        setUsers((prev) => [...prev, newUser]);
        return newUser;
      } catch (err: any) {
        setError(err.message || "Failed to create user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Delete a user
  const deleteUser = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await userService.deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        if (user?.id === id) {
          setUser(null);
        }
      } catch (err: any) {
        setError(err.message || "Failed to delete user");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  // Fetch user data on mount if userId is provided
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);

  return {
    user,
    users,
    loading,
    error,
    fetchUser,
    fetchUsers,
    updateUser,
    createUser,
    deleteUser,
    currentUser,
  };
};
