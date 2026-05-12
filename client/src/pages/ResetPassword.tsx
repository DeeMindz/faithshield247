/* FaithShield247 Reset Password â€” Sacred Modernism
 * Token/code entry + new password form with strength indicator
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Lock, ArrowLeft, Shield, Loader2, CheckCircle, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SHIELD_IMG = "/logo.png";

export default function ResetPassword() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"code" | "password" | "submitting" | "success">("code");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (pw: string) => {
    if (!pw) return null;
    if (pw.length < 6) return { level: "weak", color: "bg-red-400", label: "Weak", pct: 25 };
    if (pw.length < 8) return { level: "fair", color: "bg-amber-400", label: "Fair", pct: 50 };
    if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { level: "strong", color: "bg-emerald-500", label: "Strong", pct: 100 };
    return { level: "good", color: "bg-blue-400", label: "Good", pct: 75 };
  };

  const strength = passwordStrength(password);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) {
      setError("Please enter the 6-digit code from your email.");
      return;
    }
    setError("");
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStep("submitting");
    await new Promise((r) => setTimeout(r, 1500));
    setStep("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[oklch(0.97_0.01_80)] px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-10 h-10 rounded-xl object-cover" />
          <span className="text-[oklch(0.15_0.03_255)] text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            FaithShield247
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] shadow-sm p-8">
          {/* Step: Enter Code */}
          {step === "code" && (
            <div className="animate-fade-up">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.18_0.06_255/0.08)] flex items-center justify-center mb-5">
                <Lock size={20} className="text-[oklch(0.18_0.06_255)]" />
              </div>
              <h1 className="text-2xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Enter reset code
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-6">
                Enter the 6-digit code we sent to your email address.
              </p>

              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Reset Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                    placeholder="000000"
                    maxLength={6}
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-[oklch(0.99_0.005_80)] text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.8_0.01_80)]"
                  />
                  {error && <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1"><AlertCircle size={12} /> {error}</p>}
                </div>
                <Button type="submit" className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl">
                  Verify Code <ArrowRight size={16} />
                </Button>
              </form>

              <p className="text-xs text-[oklch(0.5_0.02_255)] mt-4 text-center">
                For this demo, enter any 6 digits (e.g., 123456).
              </p>
            </div>
          )}

          {/* Step: New Password */}
          {step === "password" && (
            <div className="animate-fade-up">
              <div className="w-12 h-12 rounded-xl bg-[oklch(0.18_0.06_255/0.08)] flex items-center justify-center mb-5">
                <Lock size={20} className="text-[oklch(0.18_0.06_255)]" />
              </div>
              <h1 className="text-2xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Create new password
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-6">
                Choose a strong password to protect your family's account.
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-[oklch(0.99_0.005_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all pr-11"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.6_0.02_255)]">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 bg-[oklch(0.9_0.01_80)] rounded-full h-1">
                        <div className={`h-1 rounded-full transition-all ${strength.color}`} style={{ width: `${strength.pct}%` }} />
                      </div>
                      <span className="text-xs text-[oklch(0.5_0.02_255)]">{strength.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 rounded-xl border bg-[oklch(0.99_0.005_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] transition-all ${
                      confirmPassword && password !== confirmPassword ? "border-red-300" :
                      confirmPassword && password === confirmPassword ? "border-emerald-300" : "border-[oklch(0.88_0.01_80)]"
                    }`}
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <Button type="submit" className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl">
                  Reset Password <ArrowRight size={16} />
                </Button>
              </form>
            </div>
          )}

          {/* Step: Submitting */}
          {step === "submitting" && (
            <div className="text-center py-8 animate-fade-up">
              <Loader2 size={32} className="text-[oklch(0.18_0.06_255)] animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Updating your password...
              </h2>
              <p className="text-sm text-[oklch(0.5_0.02_255)]">This will only take a moment.</p>
            </div>
          )}

          {/* Step: Success */}
          {step === "success" && (
            <div className="text-center animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-[oklch(0.15_0.03_255)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Password updated!
              </h2>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>

              <div className="verse-card rounded-xl p-4 mb-6">
                <p className="text-sm italic text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "The Lord is my rock, my fortress and my deliverer."
                </p>
                <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1 font-medium">Psalm 18:2</p>
              </div>

              <Link href="/login">
                <Button className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl">
                  Sign In with New Password <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/">
            <button className="flex items-center gap-2 text-xs text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors mx-auto">
              <Shield size={13} /> Back to FaithShield247 home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

