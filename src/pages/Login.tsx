import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  // Get the redirect path from location state, or default to dashboard
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
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

    // Save to local storage if remember me is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // Call the login function from AuthContext
    login(email, password);

    // Show success toast
    toast({
      title: "Login Successful",
      description: "Welcome back! You are now logged in.",
      variant: "default",
    });

    // Navigate to the intended destination
    setTimeout(() => {
      navigate(from, { replace: true });
      setIsSubmitting(false);
    }, 800);
  };

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-[#D8A23B]">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Password</Label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-[#D8A23B] hover:text-[#D8A23B]/90"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${errors.password ? "border-destructive" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-[#D8A23B]">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isSubmitting}
          />
          <Label
            htmlFor="remember"
            className={`text-sm font-normal cursor-pointer ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}
          >
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className={`text-center text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}>
          Don't have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/90"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
