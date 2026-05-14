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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)]">
      <PageNav />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="rounded-2xl bg-[oklch(0.18_0.06_255)] px-8 py-10 mb-10 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 70% at 80% 50%, oklch(0.55 0.12 75 / 0.15), transparent)" }} />
          <div className="relative">
            <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display leading-tight">Privacy Policy</h1>
          </div>
        </div>

        {/* Document body */}
        <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] px-8 py-10 space-y-8 text-[oklch(0.35_0.02_255)] text-[0.93rem] leading-relaxed">
          <section>
            <p>
              FaithShield247 respects your privacy and is committed to protecting any personal information you choose to share through this website.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[oklch(0.18_0.06_255)] font-display mb-3">Information We May Collect</h2>
            <p>
              We may collect information such as your name, email address, organisation, and any message you submit through our contact or waitlist forms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[oklch(0.18_0.06_255)] font-display mb-3">How We Use Your Information</h2>
            <ul className="space-y-2 pl-0">
              {[
                "Respond to your enquiry.",
                "Provide updates about FaithShield247.",
                "Manage expressions of interest, collaboration requests, or waitlist registrations.",
                "Improve our website and communications.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.12_75)] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-[oklch(0.18_0.06_255)] font-display mb-3">Data Protection</h2>
            <p>
              We do not sell your personal information. We aim to handle information responsibly and in accordance with applicable data protection requirements.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-[oklch(0.18_0.06_255)] font-display mb-3">Contact</h2>
            <p>
              If you have questions about how your information is handled, please contact us through the{" "}
              <Link href="/waitlist" className="text-[oklch(0.18_0.06_255)] underline hover:no-underline">
                website contact page
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors w-fit">
            <Shield size={13} />
            Back to Home
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
