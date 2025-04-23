import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2, Lock, CheckCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  const { theme } = useTheme();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // Extract token from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or has expired.",
        variant: "destructive",
      });
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, [location, navigate]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(getPasswordStrengthInfo(value).label);
    
    // Clear error
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
    
    // Check if confirm password matches
    if (confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    } else if (confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    // Clear error
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
    
    // Check if passwords match
    if (value !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        token,
        password,
      });

      setIsSuccess(true);
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Password Reset Failed",
        description: err.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthInfo = (password: string) => {
    let strength = "weak";
    if (password.length >= 8) {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (hasLower && hasUpper && hasDigit && hasSpecial) strength = "strong";
      else if ((hasLower || hasUpper) && (hasDigit || hasSpecial))
        strength = "medium";
    }
    return { label: strength };
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Create a new password for your account"
    >
      {isSuccess ? (
        <div className="space-y-6">
          <div
            className={`${
              theme === "dark" ? "bg-[#D8A23B]/10" : "bg-[#D8A23B]/5"
            } p-6 rounded-lg text-center`}
          >
            <CheckCircle className="h-12 w-12 mx-auto text-[#D8A23B] mb-4" />
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-[#09090B]"
              }`}
            >
              Password Reset Complete
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-white/70" : "text-[#09090B]/70"
              }`}
            >
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>
          </div>

          <Button
            type="button"
            className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Go to Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={`${
                  theme === "dark" ? "text-white" : "text-[#09090B]"
                }`}
              >
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                disabled={isSubmitting}
                className={`${
                  theme === "dark"
                    ? "bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"
                    : "bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"
                } ${
                  errors.password ? "border-destructive" : ""
                } pl-10`}
                prefix={<Lock className="h-4 w-4 text-[#D8A23B]" />}
              />
              {errors.password && (
                <p className="text-sm text-[#D8A23B]">{errors.password}</p>
              )}

              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength === "weak"
                            ? "bg-red-500"
                            : passwordStrength === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width:
                            passwordStrength === "weak"
                              ? "33%"
                              : passwordStrength === "medium"
                              ? "66%"
                              : "100%",
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {passwordStrength}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className={`${
                  theme === "dark" ? "text-white" : "text-[#09090B]"
                }`}
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isSubmitting}
                className={`${
                  theme === "dark"
                    ? "bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"
                    : "bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"
                } ${
                  errors.confirmPassword ? "border-destructive" : ""
                } pl-10`}
                prefix={<Lock className="h-4 w-4 text-[#D8A23B]" />}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-[#D8A23B]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div
            className={`text-center text-sm ${
              theme === "dark" ? "text-white/80" : "text-[#09090B]/80"
            }`}
          >
            Remember your password?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/90"
            >
              Back to login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
