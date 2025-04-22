import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2, User, Mail, Lock, Shield } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordStrength(getPasswordStrengthInfo(value).label);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!acceptTerms)
      newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
        variant: "default",
      });

      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthInfo = (password) => {
    let strength = "weak";
    if (password.length >= 8) {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      if (hasLower && hasUpper && hasDigit && hasSpecial) strength = "strong";
      else if (hasLower || hasUpper || hasDigit || hasSpecial)
        strength = "medium";
    }
    return { label: strength };
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Sign up to get started with Al Yalayis services"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "email", "password", "confirmPassword"].map((field, i) => (
          <motion.div
            className="space-y-2"
            key={field}
            initial="hidden"
            animate="visible"
            custom={i}
            variants={formItemVariants}
          >
            <Label
              htmlFor={field}
              className={theme === "dark" ? "text-white" : "text-[#09090B]"}
            >
              {field === "name"
                ? "Full Name"
                : field === "email"
                  ? "Email"
                  : field === "password"
                    ? "Password"
                    : "Confirm Password"}
            </Label>
            <Input
              id={field}
              name={field}
              type={
                field.includes("password")
                  ? "password"
                  : field === "email"
                    ? "email"
                    : "text"
              }
              placeholder={
                field === "name"
                  ? "John Doe"
                  : field === "email"
                    ? "name@example.com"
                    : "••••••••"
              }
              value={formData[field]}
              onChange={handleChange}
              disabled={isSubmitting}
              prefix={
                field === "name" ? (
                  <User className="h-4 w-4 text-[#D8A23B]" />
                ) : field === "email" ? (
                  <Mail className="h-4 w-4 text-[#D8A23B]" />
                ) : (
                  <Lock className="h-4 w-4 text-[#D8A23B]" />
                )
              }
              className={`${theme === "dark" ? "bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50" : "bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50"} ${errors[field] ? "border-destructive" : ""} transition-all duration-200 hover:border-[#D8A23B]`}
            />
            {errors[field] && (
              <p className="text-sm text-[#D8A23B] mt-1 flex items-center gap-1">
                {errors[field]}
              </p>
            )}
          </motion.div>
        ))}

        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={formItemVariants}
        >
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={() => setAcceptTerms(!acceptTerms)}
            />
            I accept the{" "}
            <a href="#" className="text-[#D8A23B] underline">
              Terms & Conditions
            </a>
          </label>
          {errors.terms && (
            <p className="text-sm text-[#D8A23B] mt-1">{errors.terms}</p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={formItemVariants}
        >
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}{" "}
            Sign Up
          </Button>
        </motion.div>
      </form>
    </AuthLayout>
  );
}
