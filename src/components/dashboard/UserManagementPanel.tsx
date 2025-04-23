import React, { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { usePermissions } from "@/hooks/usePermissions";
import { User, Role } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { UserProfile } from "@/components/auth/UserProfile";
import { PermissionGate } from "@/components/auth/PermissionGate";
import { PERMISSIONS } from "@/types/auth";
import { Loader2, Plus, Trash2, Edit, Search, UserPlus } from "lucide-react";

const UserManagementPanel: React.FC = () => {
  const { users, loading, error, fetchUsers, createUser, deleteUser } =
    useUser();
  const { hasPermission } = usePermissions();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as Role,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers().catch((err) => {
      console.error("Error fetching users:", err);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again later.",
        variant: "destructive",
      });
    });
  }, [fetchUsers]);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle role selection
  const handleRoleChange = (value: string) => {
    setNewUser((prev) => ({ ...prev, role: value as Role }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!newUser.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!newUser.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!newUser.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (newUser.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle user creation
  const handleCreateUser = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await createUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });

      toast({
        title: "Success",
        description: "User created successfully",
        variant: "default",
      });

      // Reset form and close dialog
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
      setIsCreateDialogOpen(false);

      // Refresh user list
      fetchUsers();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsSubmitting(true);

    try {
      await deleteUser(selectedUser.id);

      toast({
        title: "Success",
        description: "User deleted successfully",
        variant: "default",
      });

      // Close dialog and refresh user list
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // View user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  // Confirm user deletion
  const confirmDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#D8A23B]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-destructive">
        <p>Error loading users: {error}</p>
        <Button onClick={() => fetchUsers()} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users, roles, and permissions
            </CardDescription>
          </div>
          <PermissionGate permissions={PERMISSIONS.MANAGE_USERS}>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </PermissionGate>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <PermissionGate
                            permissions={PERMISSIONS.MANAGE_USERS}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => confirmDeleteUser(user)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </PermissionGate>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the system with specific role and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-destructive" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleInputChange}
                className={formErrors.email ? "border-destructive" : ""}
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">{formErrors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleInputChange}
                className={formErrors.password ? "border-destructive" : ""}
              />
              {formErrors.password && (
                <p className="text-sm text-destructive">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={handleRoleChange}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={isSubmitting}
              className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Edit User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and edit user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && <UserProfile userId={selectedUser.id} />}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {selectedUser.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedUser.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  <span className="capitalize">{selectedUser.role}</span>
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementPanel;
