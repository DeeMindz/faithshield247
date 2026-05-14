import { useState } from "react";
import { Link } from "wouter";
import { Shield, ArrowRight, CheckCircle2, Phone, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SHIELD_IMG = "/logo.png";

function PageNav() {
  return (
    <nav className="w-full bg-[oklch(0.18_0.06_255)] px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-9 h-9 rounded-xl object-cover" />
          <span className="text-white text-lg font-semibold font-display">FaithShield247</span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
          <Shield size={14} />
          Back to Home
        </Link>
      </div>
    </nav>
  );
}

function PageFooter() {
  return (
    <footer className="w-full bg-[oklch(0.18_0.06_255)] px-6 py-5 mt-auto">
      <div className="max-w-4xl mx-auto text-center text-white/50 text-xs">
        &copy; {new Date().getFullYear()} FaithShield247 &mdash; Protecting children online. Building healthier digital futures.
      </div>
    </footer>
  );
}

const interestOptions = [
  "Parent / Caregiver",
  "School Representative",
  "Church / Community Representative",
  "Collaborator / Advisor",
  "Investor / Supporter",
];

interface FormState {
  fullName: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
}

const emptyForm: FormState = {
  fullName: "",
  email: "",
  organisation: "",
  interest: "",
  message: "",
};

export default function Waitlist() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setToast(true);
      setTimeout(() => setToast(false), 5000);
    }, 800);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[oklch(0.88_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] transition-all placeholder:text-[oklch(0.7_0.01_80)] text-[oklch(0.25_0.03_255)]";
  const labelClass = "block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-1.5";

  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)]">
      <PageNav />

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[oklch(0.18_0.06_255)] text-white px-5 py-3.5 rounded-2xl shadow-xl text-sm font-medium">
          <CheckCircle2 size={16} className="text-[oklch(0.72_0.12_75)]" />
          Thank you! We will be in touch as appropriate.
        </div>
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-14">
        {/* Hero strip */}
        <div className="rounded-2xl bg-[oklch(0.18_0.06_255)] px-8 py-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.55 0.12 75 / 0.18), transparent)" }} />
          <div className="relative">
            <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-3">Early Interest</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4 leading-tight">
              Register Your Interest
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
              If you would like to follow the development of FaithShield247, express early interest, explore collaboration, or request future updates, we would be pleased to hear from you.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[oklch(0.18_0.06_255/0.07)] flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={26} className="text-[oklch(0.18_0.06_255)]" />
                </div>
                <h2 className="text-xl font-bold text-[oklch(0.18_0.06_255)] font-display mb-3">Submission Received</h2>
                <p className="text-[oklch(0.4_0.02_255)] text-sm leading-relaxed mb-6">
                  Thank you for registering your interest in FaithShield247. We will review your submission and be in touch as appropriate.
                </p>
                <Link href="/">
                  <Button className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 px-6 py-2.5 h-auto text-sm font-semibold gap-2 rounded-xl">
                    Back to Home <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-8">
                <p className="text-[oklch(0.45_0.02_255)] text-sm leading-relaxed mb-7">
                  Please complete the short form below and we will be in touch as appropriate.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Organisation <span className="text-[oklch(0.65_0.01_80)] font-normal">(optional)</span></label>
                    <input
                      type="text"
                      name="organisation"
                      value={form.organisation}
                      onChange={handleChange}
                      placeholder="School, church, organisation name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>I am interested as <span className="text-red-500">*</span></label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Select an option</option>
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Message <span className="text-[oklch(0.65_0.01_80)] font-normal">(optional)</span></label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any additional context or questions..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 py-3 h-auto text-sm font-semibold gap-2 rounded-xl"
                  >
                    {submitting ? (
                      <><Loader2 size={15} className="animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Your Interest <ArrowRight size={15} /></>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Contact sidebar */}
          <div className="flex flex-col gap-5">
            <div className="bg-[oklch(0.18_0.06_255)] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 100% 100%, oklch(0.55 0.12 75 / 0.15), transparent)" }} />
              <div className="relative">
                <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-4">Project Lead</p>
                <p className="text-white font-bold font-display text-base mb-1">Tunde Adeparusi</p>
                <p className="text-white/60 text-xs leading-relaxed mb-5">Founder and Project Lead | Idea-Hub</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Phone size={13} className="text-[oklch(0.72_0.12_75)] mt-0.5 flex-shrink-0" />
                    <div className="text-white/70 text-xs space-y-0.5">
                      <p>+44 7990 491775</p>
                      <p>+353 83 114 9297</p>
                      <p>+234 803 301 8086</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={13} className="text-[oklch(0.72_0.12_75)] flex-shrink-0" />
                    <a
                      href="https://www.tundeadeparusi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-xs hover:text-white transition-colors underline"
                    >
                      www.tundeadeparusi.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-6">
              <p className="text-[oklch(0.4_0.02_255)] text-xs leading-relaxed">
                Your information will be handled in accordance with our{" "}
                <Link href="/privacy" className="text-[oklch(0.18_0.06_255)] underline hover:no-underline">
                  Privacy Policy
                </Link>
                . We do not share your details with third parties.
              </p>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
