import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Shield, ArrowRight, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth, type SignupData } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SHIELD_IMG = "/logo.png";

const plans = [
  {
    id: "basic" as const,
    name: "Basic",
    price: "$7.99/mo",
    features: ["AI content filtering", "Up to 3 devices", "Weekly reports"],
  },
  {
    id: "premium" as const,
    name: "Premium",
    price: "$14.99/mo",
    features: ["Everything in Basic", "Full content library", "Anti-grooming alerts", "Unlimited devices"],
    popular: true,
  },
  {
    id: "church" as const,
    name: "Church / School",
    price: "Custom",
    features: ["Group management", "Curriculum tools", "Bulk pricing"],
  },
];

export default function Signup() {
  const [, navigate] = useLocation();
  const { signup, isLoading } = useAuth();

  const [step, setStep] = useState<"plan" | "account">("plan");
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "church">("premium");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    church: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateAccount = () => {
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!form.email.trim() || !form.email.includes("@")) return "Please enter a valid email address.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateAccount();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    const data: SignupData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      church: form.church || undefined,
      plan: selectedPlan,
    };
    const result = await signup(data);
    setSubmitting(false);
    if (result.success) {
      toast.success("Account created! Let's set up your family.");
      navigate("/onboarding");
    } else {
      setError(result.error || "Sign-up failed. Please try again.");
    }
  };

  const passwordStrength = (pw: string) => {
    if (!pw) return null;
    if (pw.length < 6) return { level: "weak", color: "bg-red-400", label: "Weak" };
    if (pw.length < 8) return { level: "fair", color: "bg-amber-400", label: "Fair" };
    if (pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { level: "strong", color: "bg-emerald-500", label: "Strong" };
    return { level: "good", color: "bg-blue-400", label: "Good" };
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative flex-col bg-[oklch(0.18_0.06_255)]">
        <div className="relative flex flex-col h-full p-12">
          <div className="flex items-center gap-3">
            <img src={SHIELD_IMG} alt="FaithShield247" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-white text-xl font-semibold font-display">
              FaithShield247
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
              Protect your children.<br />
              <em className="text-[oklch(0.72_0.12_75)]">Nurture their faith.</em>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Join thousands of Christian families who use FaithShield247 to guard their children's hearts and minds in a digital world.
            </p>
            {/* Stats grid replacing broken CDN image */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { value: "50K+", label: "Families Protected" },
                { value: "94.7%", label: "AI Accuracy" },
                { value: "< 50ms", label: "Filter Speed" },
                { value: "24/7", label: "Always On Guard" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[oklch(0.72_0.12_75)] font-display">{s.value}</div>
                  <div className="text-white/45 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                "14-day free trial, no credit card required",
                "Cancel anytime",
                "Works on all devices",
                "Backed by Christian families and churches",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle size={14} className="text-[oklch(0.72_0.12_75)] flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-[oklch(0.99_0.005_80)] lg:px-12 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-9 h-9 rounded-xl object-cover" />
          <span className="text-[oklch(0.15_0.03_255)] text-lg font-semibold font-display">
            FaithShield247
          </span>
        </div>

        <div className="max-w-lg w-full mx-auto">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {["Choose Plan", "Create Account"].map((label, i) => {
              const currentStep = step === "plan" ? 0 : 1;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i <= currentStep ? "bg-[oklch(0.18_0.06_255)] text-white" : "bg-[oklch(0.9_0.01_80)] text-[oklch(0.5_0.02_255)]"
                  }`}>
                    {i < currentStep ? <CheckCircle size={12} /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i <= currentStep ? "text-[oklch(0.18_0.06_255)]" : "text-[oklch(0.6_0.02_255)]"}`}>
                    {label}
                  </span>
                  {i < 1 && <div className="w-8 h-px bg-[oklch(0.88_0.01_80)] mx-1" />}
                </div>
              );
            })}
          </div>

          {step === "plan" ? (
            <>
              <h1 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2">
                Choose your plan
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-6">
                All plans include a 14-day free trial.
              </p>
              <div className="space-y-3 mb-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id
                        ? "border-[oklch(0.18_0.06_255)] bg-[oklch(0.18_0.06_255/0.04)]"
                        : "border-[oklch(0.88_0.01_80)] bg-white hover:border-[oklch(0.7_0.02_255)]"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2.5 left-4 bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-[10px]">
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedPlan === plan.id ? "border-[oklch(0.18_0.06_255)]" : "border-[oklch(0.7_0.02_255)]"
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 rounded-full bg-[oklch(0.18_0.06_255)]" />
                          )}
                        </div>
                        <span className="font-semibold text-sm text-[oklch(0.15_0.03_255)]">{plan.name}</span>
                      </div>
                      <span className="font-bold text-sm text-[oklch(0.18_0.06_255)]">{plan.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 pl-7">
                      {plan.features.map((f) => (
                        <span key={f} className="text-xs text-[oklch(0.5_0.02_255)] flex items-center gap-1">
                          <CheckCircle size={10} className="text-emerald-500" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setStep("account")}
                className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl"
              >
                Continue with {plans.find((p) => p.id === selectedPlan)?.name} <ArrowRight size={16} />
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2">
                Create your account
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-sm mb-6">
                <button onClick={() => setStep("plan")} className="text-[oklch(0.18_0.06_255)] hover:underline">
                  â† Change plan
                </button>
                {" Â· "}
                <span className="font-medium text-[oklch(0.18_0.06_255)]">
                  {plans.find((p) => p.id === selectedPlan)?.name} â€” {plans.find((p) => p.id === selectedPlan)?.price}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Sarah"
                      autoComplete="given-name"
                      className="w-full px-3 py-2.5 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Thompson"
                      autoComplete="family-name"
                      className="w-full px-3 py-2.5 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full px-3 py-2.5 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">
                    Church / Ministry <span className="text-[oklch(0.6_0.02_255)] font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.church}
                    onChange={(e) => set("church", e.target.value)}
                    placeholder="Grace Community Church"
                    className="w-full px-3 py-2.5 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className="w-full px-3 py-2.5 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)] pr-10"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)]"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 bg-[oklch(0.9_0.01_80)] rounded-full h-1">
                        <div className={`h-1 rounded-full transition-all ${strength.color}`} style={{
                          width: strength.level === "weak" ? "25%" : strength.level === "fair" ? "50%" : strength.level === "good" ? "75%" : "100%"
                        }} />
                      </div>
                      <span className="text-xs text-[oklch(0.5_0.02_255)]">{strength.label}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => set("confirmPassword", e.target.value)}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className={`w-full px-3 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] transition-all placeholder:text-[oklch(0.7_0.01_80)] ${
                      form.confirmPassword && form.password !== form.confirmPassword
                        ? "border-red-300 focus:border-red-400"
                        : form.confirmPassword && form.password === form.confirmPassword
                        ? "border-emerald-300 focus:border-emerald-400"
                        : "border-[oklch(0.88_0.01_80)] focus:border-[oklch(0.72_0.12_75)]"
                    }`}
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700">{error}</p>
                  </div>
                )}

                <p className="text-xs text-[oklch(0.6_0.02_255)]">
                  By creating an account you agree to our{" "}
                  <button type="button" className="text-[oklch(0.18_0.06_255)] hover:underline" onClick={() => toast.info("Terms of Service â€” available in full version")}>
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button type="button" className="text-[oklch(0.18_0.06_255)] hover:underline" onClick={() => toast.info("Privacy Policy â€” available in full version")}>
                    Privacy Policy
                  </button>
                  .
                </p>

                <Button
                  type="submit"
                  disabled={submitting || isLoading}
                  className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl"
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Creating account...</>
                  ) : (
                    <>Create Account & Continue <ArrowRight size={16} /></>
                  )}
                </Button>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-[oklch(0.5_0.02_255)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[oklch(0.18_0.06_255)] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[oklch(0.9_0.01_80)]">
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

