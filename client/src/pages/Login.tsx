import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Shield, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SHIELD_IMG = "/logo.png";

export default function Login() {
  const [, navigate] = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      toast.success("Welcome back to FaithShield247!");
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  const fillDemo = () => {
    setEmail("demo@faithshield247.com");
    setPassword("demo1234");
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left â€” hero panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        <div className="absolute inset-0 bg-[oklch(0.18_0.06_255)]">
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 70% 80% at 25% 60%, oklch(0.26 0.14 268 / 0.55), transparent)"}} />
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 50% 40% at 80% 90%, oklch(0.55 0.12 75 / 0.12), transparent)"}} />
          <div className="absolute inset-0 opacity-[0.025]" style={{backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)",backgroundSize:"24px 24px"}} />
        </div>
        <div className="relative flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={SHIELD_IMG} alt="FaithShield247" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-white text-xl font-semibold font-display">
              FaithShield247
            </span>
          </div>
          {/* Quote */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="gold-divider mb-8 max-w-xs" />
            <blockquote className="text-white/90 text-2xl leading-relaxed font-medium italic mb-4 font-display">
              "Guard your heart above all else, for it determines the course of your life."
            </blockquote>
            <p className="text-[oklch(0.72_0.12_75)] text-sm font-medium">Proverbs 4:23</p>
            <div className="gold-divider mt-8 max-w-xs" />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "50K+", label: "Families Protected" },
              { value: "94.7%", label: "AI Accuracy" },
              { value: "< 50ms", label: "Filter Speed" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-[oklch(0.72_0.12_75)] font-display">
                  {s.value}
                </div>
                <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right â€” form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-[oklch(0.99_0.005_80)] lg:px-16">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-9 h-9 rounded-xl object-cover" />
          <span className="text-[oklch(0.15_0.03_255)] text-lg font-semibold font-display">
            FaithShield247
          </span>
        </div>

        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2">
            Welcome back
          </h1>
          <p className="text-[oklch(0.5_0.02_255)] text-sm mb-8">
            Sign in to your FaithShield247 parent account.
          </p>

          {/* Demo credentials hint */}
          <div className="mb-6 p-3 rounded-xl bg-[oklch(0.18_0.06_255/0.05)] border border-[oklch(0.18_0.06_255/0.15)]">
            <p className="text-xs text-[oklch(0.4_0.02_255)] mb-2">
              <strong className="text-[oklch(0.18_0.06_255)]">Demo account available.</strong> Use the credentials below or{" "}
              <button onClick={fillDemo} className="text-[oklch(0.18_0.06_255)] underline font-medium">
                click to fill automatically
              </button>
              .
            </p>
            <div className="font-mono text-xs text-[oklch(0.4_0.02_255)] space-y-0.5">
              <p>Email: <span className="text-[oklch(0.18_0.06_255)]">demo@faithshield247.com</span></p>
              <p>Password: <span className="text-[oklch(0.18_0.06_255)]">demo1234</span></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[oklch(0.18_0.06_255)] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)] pr-11"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting || isLoading}
              className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl"
            >
              {submitting ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[oklch(0.5_0.02_255)]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[oklch(0.18_0.06_255)] font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[oklch(0.9_0.01_80)]">
            <Link href="/" className="flex items-center gap-2 text-xs text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors mx-auto w-fit">
              <Shield size={13} />
              Back to FaithShield247 home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

