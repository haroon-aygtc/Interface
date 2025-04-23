import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { User, Mail, Lock, Save, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface UserProfileProps {
  userId?: string; // If not provided, uses the current user
  readOnly?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  readOnly = false,
}) => {
  const { user: currentUser } = useAuth();
  const { user, loading, error, updateUser } = useUser(
    userId || currentUser?.id,
  );
  const { theme } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    password: "",
  });

  // Initialize form data when user data is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const validateForm = () => {
    const errors = {
      name: "",
      password: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Only include password if it was changed
      const updateData: any = {
        name: formData.name,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await updateUser(user.id, updateData);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      });

      setIsEditing(false);
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive p-4">
            {error || "User not found"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>
          {readOnly ? "View user details" : "Manage your account information"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 ${formErrors.name ? "border-destructive" : ""}`}
                  prefix={<User className="h-4 w-4 text-[#D8A23B]" />}
                />
                {formErrors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {formErrors.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled={true} // Email cannot be changed
                  className="pl-10 bg-muted"
                  prefix={<Mail className="h-4 w-4 text-[#D8A23B]" />}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className={`pl-10 ${formErrors.password ? "border-destructive" : ""}`}
                  prefix={<Lock className="h-4 w-4 text-[#D8A23B]" />}
                />
                {formErrors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Full Name
                </h3>
                <p className="mt-1">{user.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="mt-1">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Role
                </h3>
                <p className="mt-1 capitalize">{user.role}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Member Since
                </h3>
                <p className="mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {!isEditing && !readOnly && (
        <CardFooter className="flex justify-end">
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90"
          >
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
