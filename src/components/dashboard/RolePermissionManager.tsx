import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";
import { apiService } from "@/services/api.service";
import { API_ENDPOINTS } from "@/config/api.config";

// Define permission types
const PERMISSIONS = {
  MANAGE_USERS: "MANAGE_USERS",
  MANAGE_ROLES: "MANAGE_ROLES",
  MANAGE_SETTINGS: "MANAGE_SETTINGS",
  MANAGE_CONTENT: "MANAGE_CONTENT",
  VIEW_ANALYTICS: "VIEW_ANALYTICS",
  EXPORT_DATA: "EXPORT_DATA",
  VIEW_CONTENT: "VIEW_CONTENT",
};

type Role = "admin" | "editor" | "viewer" | "guest";

interface RoleWithPermissions {
  role: Role;
  permissions: string[];
}

const RolePermissionManager: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("admin");
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >({
    admin: Object.values(PERMISSIONS),
    editor: [
      PERMISSIONS.MANAGE_CONTENT,
      PERMISSIONS.VIEW_ANALYTICS,
      PERMISSIONS.EXPORT_DATA,
    ],
    viewer: [PERMISSIONS.VIEW_CONTENT, PERMISSIONS.VIEW_ANALYTICS],
    guest: [PERMISSIONS.VIEW_CONTENT],
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available permissions grouped by category
  const permissionCategories = {
    User: [PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_ROLES],
    Content: [PERMISSIONS.VIEW_CONTENT, PERMISSIONS.MANAGE_CONTENT],
    Analytics: [PERMISSIONS.VIEW_ANALYTICS, PERMISSIONS.EXPORT_DATA],
    System: [PERMISSIONS.MANAGE_SETTINGS],
  };

  // Initialize selected permissions when role changes
  useEffect(() => {
    if (rolePermissions[selectedRole]) {
      setSelectedPermissions(rolePermissions[selectedRole]);
    } else {
      setSelectedPermissions([]);
    }
  }, [selectedRole, rolePermissions]);

  // Fetch all role permissions
  const fetchRolePermissions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Add a delay to ensure the component is mounted
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await apiService.get(
        `${API_ENDPOINTS.PERMISSIONS}/roles`,
      );

      // Check if the response is valid
      if (!Array.isArray(response)) {
        throw new Error("Invalid response format from server");
      }

      // Process the response
      const permissions = response.reduce(
        (acc: Record<string, string[]>, item: any) => {
          if (item && item.role && Array.isArray(item.permissions)) {
            acc[item.role] = item.permissions;
          }
          return acc;
        },
        {},
      );

      // Ensure we have default roles even if they're not in the response
      const defaultRoles = ["admin", "editor", "viewer", "guest"];
      defaultRoles.forEach(role => {
        if (!permissions[role]) {
          permissions[role] = [];
        }
      });

      setRolePermissions(permissions);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch permissions";
      console.error("Permission fetch error:", errorMessage, err);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load permissions on component mount
  useEffect(() => {
    fetchRolePermissions();
  }, []);

  // Toggle permission selection
  const togglePermission = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  };

  // Save role permissions
  const saveRolePermissions = async () => {
    setIsSaving(true);

    try {
      await apiService.post(`${API_ENDPOINTS.PERMISSIONS}/role`, {
        role: selectedRole,
        permissions: selectedPermissions,
      });

      // Update local state
      setRolePermissions((prev) => ({
        ...prev,
        [selectedRole]: selectedPermissions,
      }));

      toast({
        title: "Success",
        description: `Permissions for ${selectedRole} role updated successfully`,
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update role permissions",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-destructive">
        <p>Error loading permissions: {error}</p>
        <Button
          onClick={fetchRolePermissions}
          variant="outline"
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role & Permission Management</CardTitle>
        <CardDescription>
          Configure permissions for different user roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="admin"
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as Role)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="viewer">Viewer</TabsTrigger>
            <TabsTrigger value="guest">Guest</TabsTrigger>
          </TabsList>

          {["admin", "editor", "viewer", "guest"].map((role) => (
            <TabsContent key={role} value={role} className="space-y-4 mt-4">
              <div className="grid gap-6">
                {Object.entries(permissionCategories).map(
                  ([category, permissions]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="text-lg font-medium">
                        {category} Permissions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {permissions.map((permission) => (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${role}-${permission}`}
                              checked={selectedPermissions.includes(permission)}
                              onCheckedChange={() =>
                                togglePermission(permission)
                              }
                              disabled={
                                role === "admin" &&
                                permission === PERMISSIONS.MANAGE_USERS
                              }
                            />
                            <Label
                              htmlFor={`${role}-${permission}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.replace(/_/g, " ").toLowerCase()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={saveRolePermissions} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Permissions
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RolePermissionManager;
