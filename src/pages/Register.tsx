import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Call the register function from AuthContext
    register(formData.name, formData.email, formData.password);

    // Show success toast
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully.",
      variant: "default",
    });

    // Navigate to the dashboard after a short delay
    setTimeout(() => {
      navigate(ROUTES.DASHBOARD);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to get started with Al Yalayis services"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && (
              <p className="text-sm text-[#D8A23B]">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-[#D8A23B]">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.password ? "border-destructive" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-[#D8A23B]">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.confirmPassword ? "border-destructive" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-[#D8A23B]">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              disabled={isSubmitting}
              className={`border-[#D8A23B]/30 ${errors.terms ? "border-destructive" : ""}`}
            />
            <Label
              htmlFor="terms"
              className={`text-sm font-normal cursor-pointer ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}
            >
              I agree to the{" "}
              <Link
                to="/terms-conditions"
                className="text-[#D8A23B] hover:text-[#D8A23B]/90"
                target="_blank"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy-policy"
                className="text-[#D8A23B] hover:text-[#D8A23B]/90"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.terms && (
            <p className="text-sm text-[#D8A23B]">{errors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className={`text-center text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}>
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/90"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
