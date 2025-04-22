import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Call the forgotPassword function from AuthContext
    forgotPassword(email);

    // Show success toast and update UI
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);

      toast({
        title: "Reset Email Sent",
        description: "Check your email for a link to reset your password.",
        variant: "default",
      });
    }, 800);
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email to receive a password reset link"
    >
      {isSubmitted ? (
        <div className="space-y-6">
          <div className={`${theme === 'dark' ? 'bg-[#D8A23B]/10' : 'bg-[#D8A23B]/5'} p-6 rounded-lg text-center`}>
            <CheckCircle className="h-12 w-12 mx-auto text-[#D8A23B] mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Check your email</h3>
            <p className={`${theme === 'dark' ? 'text-white/70' : 'text-[#09090B]/70'}`}>
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and follow the instructions to reset your password.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              className="w-full bg-[#D8A23B] text-[#09090B] hover:bg-[#D8A23B]/90 border-none"
              onClick={() => setIsSubmitted(false)}
            >
              Send Again
            </Button>

            <div className={`text-center text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}>
              Remember your password?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-[#D8A23B] font-medium hover:text-[#D8A23B]/90"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className={`${theme === 'dark' ? 'text-white' : 'text-[#09090B]'}`}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={`${theme === 'dark' ? 'bg-[#09090B]/30 text-white border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50' : 'bg-white text-[#09090B] border-[#D8A23B]/30 focus:border-[#D8A23B] focus:ring-[#D8A23B]/50'} ${error ? "border-destructive" : ""}`}
            />
            {error && (
              <p className="text-sm text-[#D8A23B]">{error}</p>
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
                Sending...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className={`text-center text-sm ${theme === 'dark' ? 'text-white/80' : 'text-[#09090B]/80'}`}>
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
