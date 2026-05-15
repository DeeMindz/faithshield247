import { Link } from "wouter";
import { Shield } from "lucide-react";

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

const terms = [
  "The content on this website is provided for general information about FaithShield247 and may be updated, changed, or removed as the project develops.",
  "Nothing on this website constitutes a guarantee of future product availability, service delivery, or commercial offering.",
  "All website content, branding, and materials remain subject to the intellectual property rights of Idea-Hub Ireland, Idea-Hub UK Ltd, and/or FaithShield247 unless otherwise stated.",
  "Unauthorized copying, misuse, or misrepresentation of website content is not permitted.",
];

export default function TermsOfUse() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)]">
      <PageNav />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="rounded-2xl bg-[oklch(0.18_0.06_255)] px-8 py-10 mb-10 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 80% 50%, oklch(0.55 0.12 75 / 0.15), transparent)" }} />
          <div className="relative">
            <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display leading-tight">Terms of Use</h1>
          </div>
        </div>

        {/* Document body */}
        <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] px-8 py-10 space-y-8 text-[oklch(0.35_0.02_255)] text-[0.93rem] leading-relaxed">
          <section>
            <p>
              By using this website, you agree to use it lawfully and appropriately.
            </p>
          </section>

          <section>
            <ul className="space-y-5">
              {terms.map((term) => (
                <li key={term} className="flex items-start gap-3.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.12_75)] flex-shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-2 border-t border-[oklch(0.93_0.01_80)]">
            <p className="text-[oklch(0.5_0.02_255)] text-xs">
              These terms may be updated as the project develops. Continued use of this website constitutes acceptance of the current terms.
            </p>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors">
            <Shield size={13} />
            Back to Home
          </Link>
          <Link href="/privacy" className="text-sm text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
