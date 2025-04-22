import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  UserPlus,
  Users,
  Shield,
  Key,
  Clock,
  LogOut,
  Lock,
  Unlock,
  MoreHorizontal,
  Mail,
  User,
  UserCog,
  Building,
  Activity,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | "guest";
  status: "active" | "inactive" | "pending";
  organization: string;
  lastLogin: Date | null;
  createdAt: Date;
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface UserManagementPanelProps {
  defaultTab?: string;
}

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ defaultTab = "users" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);

  // Mock data for users
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      organization: "Example Corp",
      lastLogin: new Date(2023, 5, 17),
      createdAt: new Date(2022, 1, 15),
    },
    {
      id: "2",
      name: "John Editor",
      email: "john@example.com",
      role: "editor",
      status: "active",
      organization: "Example Corp",
      lastLogin: new Date(2023, 5, 16),
      createdAt: new Date(2022, 3, 10),
    },
    {
      id: "3",
      name: "Sarah Viewer",
      email: "sarah@example.com",
      role: "viewer",
      status: "active",
      organization: "Partner Inc",
      lastLogin: new Date(2023, 5, 10),
      createdAt: new Date(2022, 6, 22),
    },
    {
      id: "4",
      name: "Michael Guest",
      email: "michael@example.com",
      role: "guest",
      status: "pending",
      organization: "Client LLC",
      lastLogin: null,
      createdAt: new Date(2023, 5, 15),
    },
    {
      id: "5",
      name: "Emily Inactive",
      email: "emily@example.com",
      role: "editor",
      status: "inactive",
      organization: "Example Corp",
      lastLogin: new Date(2023, 2, 5),
      createdAt: new Date(2022, 4, 18),
    },
  ]);

  // Mock data for roles
  const [roles, setRoles] = useState<RoleData[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all features and settings",
      permissions: [
        "manage_users",
        "manage_roles",
        "manage_settings",
        "manage_content",
        "view_analytics",
        "export_data",
      ],
      userCount: 1,
    },
    {
      id: "editor",
      name: "Editor",
      description: "Can edit content and view analytics",
      permissions: ["manage_content", "view_analytics", "export_data"],
      userCount: 2,
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Read-only access to content and analytics",
      permissions: ["view_content", "view_analytics"],
      userCount: 1,
    },
    {
      id: "guest",
      name: "Guest",
      description: "Limited access to specific content only",
      permissions: ["view_content"],
      userCount: 1,
    },
  ]);

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setActiveTab("edit-user");
  };

  const handleCreateNewUser = () => {
    setSelectedUser(null);
    setActiveTab("edit-user");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditRole = (role: RoleData) => {
    setSelectedRole(role);
    setActiveTab("edit-role");
  };

  const handleCreateNewRole = () => {
    setSelectedRole(null);
    setActiveTab("edit-role");
  };

  const getRoleBadge = (role: UserData["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "editor":
        return <Badge className="bg-blue-500">Editor</Badge>;
      case "viewer":
        return <Badge className="bg-green-500">Viewer</Badge>;
      case "guest":
        return <Badge className="bg-gray-500">Guest</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: UserData["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={handleCreateNewUser}>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="edit-user">
            {selectedUser ? "Edit User" : "Add User"}
          </TabsTrigger>
          <TabsTrigger value="edit-role">
            {selectedRole ? "Edit Role" : "Add Role"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and their access to the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Input
                    placeholder="Search users..."
                    className="max-w-sm mr-2"
                    prefix={
                      <Search className="h-4 w-4 text-muted-foreground" />
                    }
                  />
                  <Select defaultValue="all-roles">
                    <SelectTrigger className="w-[180px] mr-2">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-roles">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all-status">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-status">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Bulk Import
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.organization}</TableCell>
                      <TableCell>
                        {user.lastLogin
                          ? user.lastLogin.toLocaleDateString()
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-500 hover:text-amber-700"
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-500 hover:text-green-700"
                            >
                              <Unlock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Manage roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input
                  placeholder="Search roles..."
                  className="max-w-sm"
                  prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                />
                <Button onClick={handleCreateNewRole}>
                  <Plus className="mr-2 h-4 w-4" /> Add Role
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <Badge
                              key={permission}
                              variant="secondary"
                              className="text-xs"
                            >
                              {permission.replace(/_/g, " ")}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{role.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{role.userCount} users</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditRole(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit-user">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedUser ? "Edit User" : "Create New User"}
              </CardTitle>
              <CardDescription>
                {selectedUser
                  ? "Update user details and permissions"
                  : "Add a new user to the system"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    placeholder="John Doe"
                    defaultValue={selectedUser?.name || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="john@example.com"
                    defaultValue={selectedUser?.email || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-role">Role</Label>
                  <Select defaultValue={selectedUser?.role || "viewer"}>
                    <SelectTrigger id="user-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-organization">Organization</Label>
                  <Input
                    id="user-organization"
                    placeholder="Company Name"
                    defaultValue={selectedUser?.organization || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder={selectedUser ? "••••••••" : "Enter password"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="user-confirm-password"
                    type="password"
                    placeholder={selectedUser ? "••••••••" : "Confirm password"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-active"
                      name="status"
                      value="active"
                      aria-label="Active status"
                      placeholder="Active"
                      defaultChecked={
                        selectedUser?.status === "active" || !selectedUser
                      }
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label htmlFor="status-active" className="cursor-pointer">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-inactive"
                      name="status"
                      value="inactive"
                      aria-label="Inactive status"
                      placeholder="Inactive"
                      defaultChecked={selectedUser?.status === "inactive"}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label htmlFor="status-inactive" className="cursor-pointer">
                      Inactive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="status-pending"
                      name="status"
                      value="pending"
                      aria-label="Pending status"
                      placeholder="Pending"
                      defaultChecked={selectedUser?.status === "pending"}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label htmlFor="status-pending" className="cursor-pointer">
                      Pending
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="send-welcome-email">Send Welcome Email</Label>
                  <Switch
                    id="send-welcome-email"
                    defaultChecked={!selectedUser}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("users")}>
                Cancel
              </Button>
              <Button>{selectedUser ? "Update User" : "Create User"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="edit-role">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedRole ? "Edit Role" : "Create New Role"}
              </CardTitle>
              <CardDescription>
                {selectedRole
                  ? "Update role details and permissions"
                  : "Define a new role with specific permissions"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="e.g., Content Manager"
                  defaultValue={selectedRole?.name || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Input
                  id="role-description"
                  placeholder="Brief description of this role"
                  defaultValue={selectedRole?.description || ""}
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Permissions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">User Management</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="Manage Users"
                          type="checkbox"
                          id="perm-manage-users"
                          defaultChecked={selectedRole?.permissions.includes(
                            "manage_users",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-manage-users"
                          className="cursor-pointer"
                        >
                          Manage Users
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="Manage Roles"
                          type="checkbox"
                          id="perm-manage-roles"
                          defaultChecked={selectedRole?.permissions.includes(
                            "manage_roles",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-manage-roles"
                          className="cursor-pointer"
                        >
                          Manage Roles
                        </Label>
                      </div>
                    </div>

                    <h4 className="font-medium">Content</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="View Content"
                          type="checkbox"
                          id="perm-view-content"
                          defaultChecked={selectedRole?.permissions.includes(
                            "view_content",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-view-content"
                          className="cursor-pointer"
                        >
                          View Content
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="Manage Content"
                          type="checkbox"
                          id="perm-manage-content"
                          defaultChecked={selectedRole?.permissions.includes(
                            "manage_content",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-manage-content"
                          className="cursor-pointer"
                        >
                          Manage Content
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Analytics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="View Analytics"
                          type="checkbox"
                          id="perm-view-analytics"
                          defaultChecked={selectedRole?.permissions.includes(
                            "view_analytics",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-view-analytics"
                          className="cursor-pointer"
                        >
                          View Analytics
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="Export Data"
                          type="checkbox"
                          id="perm-export-data"
                          defaultChecked={selectedRole?.permissions.includes(
                            "export_data",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-export-data"
                          className="cursor-pointer"
                        >
                          Export Data
                        </Label>
                      </div>
                    </div>

                    <h4 className="font-medium">System</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          aria-label="Manage Settings"
                          type="checkbox"
                          id="perm-manage-settings"
                          defaultChecked={selectedRole?.permissions.includes(
                            "manage_settings",
                          )}
                          className="h-4 w-4 text-blue-600"
                        />
                        <Label
                          htmlFor="perm-manage-settings"
                          className="cursor-pointer"
                        >
                          Manage Settings
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("roles")}>
                Cancel
              </Button>
              <Button>{selectedRole ? "Update Role" : "Create Role"}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagementPanel;
