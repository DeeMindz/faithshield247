/* FaithShield247 Forgot Password â€” Sacred Modernism
 * Email entry â†’ simulated email sent confirmation with animated transition
 */
import { useState } from "react";
import { Link } from "wouter";
import { Mail, ArrowLeft, Shield, Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHIELD_IMG = "/logo.png";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-hero-HfYVr2ei75cpvuct2YthCb.webp";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enter" | "sending" | "sent">("enter");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStep("sending");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStep("sent");
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(Math.max(b.length, 3)) + c)
    : "";

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Family" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.18_0.06_255/0.92)] to-[oklch(0.18_0.06_255/0.7)]" />
        </div>
        <div className="relative flex flex-col h-full p-12">
          <div className="flex items-center gap-3">
            <img src={SHIELD_IMG} alt="FaithShield247" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-white text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              FaithShield247
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="gold-divider mb-8 max-w-xs" />
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Don't worry.<br />
              <em className="text-[oklch(0.72_0.12_75)]">We'll help you get back in.</em>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Your family's protection never stops, even when you forget a password. We'll send a secure reset link to your email in seconds.
            </p>
            <div className="gold-divider mt-8 max-w-xs" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-[oklch(0.99_0.005_80)] lg:px-16">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-9 h-9 rounded-xl object-cover" />
          <span className="text-[oklch(0.15_0.03_255)] text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
            FaithShield247
          </span>
        </div>

        <div className="max-w-sm w-full mx-auto">
          {step === "enter" && (
            <div className="animate-fade-up">
              <div className="w-14 h-14 rounded-2xl bg-[oklch(0.18_0.06_255/0.08)] flex items-center justify-center mb-6">
                <Mail size={24} className="text-[oklch(0.18_0.06_255)]" />
              </div>
              <h1 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Reset your password
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-8">
                Enter the email address associated with your account. We'll send you a secure link to create a new password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
                  />
                  {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl"
                >
                  Send Reset Link <ArrowRight size={16} />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login">
                  <button className="flex items-center gap-2 text-sm text-[oklch(0.18_0.06_255)] hover:underline mx-auto font-medium">
                    <ArrowLeft size={14} /> Back to Sign In
                  </button>
                </Link>
              </div>
            </div>
          )}

          {step === "sending" && (
            <div className="text-center animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[oklch(0.18_0.06_255/0.08)] flex items-center justify-center">
                <Loader2 size={28} className="text-[oklch(0.18_0.06_255)] animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sending reset link...
              </h2>
              <p className="text-[oklch(0.5_0.02_255)] text-sm">
                Please wait while we send a secure link to your email.
              </p>
            </div>
          )}

          {step === "sent" && (
            <div className="text-center animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Check your email
              </h2>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-[oklch(0.18_0.06_255)] font-semibold text-sm mb-6">
                {maskedEmail}
              </p>

              <div className="bg-[oklch(0.97_0.01_80)] rounded-xl p-4 border border-[oklch(0.9_0.01_80)] text-left mb-6">
                <h4 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-2">What to do next:</h4>
                <ol className="space-y-2 text-xs text-[oklch(0.4_0.02_255)]">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.18_0.06_255)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    Open the email from FaithShield247 (check spam if needed)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.18_0.06_255)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    Click the "Reset Password" button in the email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.18_0.06_255)] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    Create a new strong password for your account
                  </li>
                </ol>
              </div>

              <div className="space-y-3">
                <Link href="/reset-password">
                  <Button className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl">
                    I Have the Reset Code <ArrowRight size={16} />
                  </Button>
                </Link>
                <button
                  onClick={() => { setStep("enter"); }}
                  className="text-xs text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors mx-auto block"
                >
                  Didn't receive it? Try a different email
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-[oklch(0.9_0.01_80)]">
                <Link href="/login">
                  <button className="flex items-center gap-2 text-sm text-[oklch(0.18_0.06_255)] hover:underline mx-auto font-medium">
                    <ArrowLeft size={14} /> Back to Sign In
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[oklch(0.9_0.01_80)]">
            <Link href="/">
              <button className="flex items-center gap-2 text-xs text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors mx-auto">
                <Shield size={13} /> Back to FaithShield247 home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

