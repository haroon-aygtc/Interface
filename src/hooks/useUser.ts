import { useState, useCallback } from "react";
import { User } from "@/types/auth";
import { apiService } from "@/services/api.service";
import { API_ENDPOINTS } from "@/config/api.config";
import { toast } from "@/components/ui/use-toast";

/**
 * Hook for user management operations
 */
export const useUser = (initialUserId?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all users
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<User[]>(API_ENDPOINTS.USERS);
      setUsers(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch users";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a user by ID
   */
  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<User>(API_ENDPOINTS.USER(id));
      setUser(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch user";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new user
   */
  const createUser = useCallback(
    async (userData: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        // Validate input data
        if (!userData.name || !userData.email || !userData.password) {
          throw new Error("Name, email, and password are required");
        }

        if (!/\S+@\S+\.\S+/.test(userData.email)) {
          throw new Error("Invalid email format");
        }

        if (userData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }

        const response = await apiService.post<User>(
          API_ENDPOINTS.USERS,
          userData,
        );
        setUsers((prev) => [...prev, response]);

        toast({
          title: "Success",
          description: "User created successfully",
          variant: "default",
        });

        return response;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to create user";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /**
   * Update a user
   */
  const updateUser = useCallback(
    async (id: string, userData: Partial<User>) => {
      setLoading(true);
      setError(null);

      try {
        // Validate email if provided
        if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
          throw new Error("Invalid email format");
        }

        const response = await apiService.patch<User>(
          API_ENDPOINTS.USER(id),
          userData,
        );
        setUsers((prev) =>
          prev.map((user) => (user.id === id ? response : user)),
        );

        if (user?.id === id) {
          setUser(response);
        }

        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "default",
        });

        return response;
      } catch (err: any) {
        const errorMessage = err.message || "Failed to update user";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  /**
   * Delete a user
   */
  const deleteUser = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        await apiService.delete(API_ENDPOINTS.USER(id));
        setUsers((prev) => prev.filter((user) => user.id !== id));

        if (user?.id === id) {
          setUser(null);
        }

        toast({
          title: "Success",
          description: "User deleted successfully",
          variant: "default",
        });
      } catch (err: any) {
        const errorMessage = err.message || "Failed to delete user";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  // Fetch user if initialUserId is provided
  if (initialUserId && !user && !loading && !error) {
    fetchById(initialUserId).catch(console.error);
  }

  return {
    users,
    user,
    loading,
    error,
    fetchUsers,
    fetchById,
    createUser,
    updateUser,
    deleteUser,
  };
};
