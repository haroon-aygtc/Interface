import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/hooks/useAuth";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  // Get the redirect path from location state, or default to dashboard
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Save to local storage if remember me is checked
    if (rememberMe) {
      setRememberedEmail(email);
    } else {
      removeRememberedEmail();
    }

    try {
      // Call the login function from AuthContext
      await login({ email, password });

      // Show success toast
      toast({
        title: "Login Successful",
        description: "Welcome back! You are now logged in.",
        variant: "default",
      });

      // Navigate to the intended destination
      navigate(from, { replace: true });
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for remembered email
  const setRememberedEmail = (email: string) => {
    localStorage.setItem("rememberedEmail", email);
  };

  const removeRememberedEmail = () => {
    localStorage.removeItem("rememberedEmail");
  };

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Define formItemVariants for the last motion div
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <Label
              htmlFor="email"
              className={`${theme === "dark" ? "text-white" : "text-[#09090B]"}`}
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className={`${theme === "dark" ? "bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50" : "bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"} ${errors.email ? "border-destructive" : ""} pl-10`}
                prefix={<Mail className="h-4 w-4 text-[#D8A23B]" />}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-[#D8A23B] mt-1 flex items-center">
                {errors.email}
              </p>
            )}
          </motion.div>

          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className={`${theme === "dark" ? "text-white" : "text-[#09090B]"}`}
              >
                Password
              </Label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm text-[#D8A23B] hover:text-[#D8A23B]/90 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className={`${theme === "dark" ? "bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50" : "bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"} ${errors.password ? "border-destructive" : ""} pl-10`}
                prefix={<Lock className="h-4 w-4 text-[#D8A23B]" />}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-[#D8A23B] mt-1 flex items-center">
                {errors.password}
              </p>
            )}
          </motion.div>
        </div>

        <motion.div
          className="flex items-center space-x-2"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isSubmitting}
            className="border-[#D8A23B]/30 data-[state=checked]:bg-[#D8A23B] data-[state=checked]:border-[#D8A23B]"
          />
          <Label
            htmlFor="remember"
            className={`text-sm font-normal cursor-pointer ${theme === "dark" ? "text-white/80" : "text-[#09090B]/80"}`}
          >
            Remember me
          </Label>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={itemVariants}>
          <Button
            type="submit"
            className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none transition-all duration-200 shadow-md hover:shadow-lg"
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
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={formItemVariants}
          className={`text-center text-sm ${theme === "dark" ? "text-white/80" : "text-[#09090B]/80"}`}
        >
          Don't have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/90 transition-colors duration-200"
          >
            Sign up
          </Link>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
