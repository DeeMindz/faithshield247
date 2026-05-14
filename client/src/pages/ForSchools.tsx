import { Link } from "wouter";
import { Shield, ArrowRight, BookOpen } from "lucide-react";
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

const highlights = [
  { label: "Practical and scalable safeguarding approaches" },
  { label: "Support for digital risk awareness in school settings" },
  { label: "Stronger dialogue between school, home, and child protection" },
];

export default function ForSchools() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)]">
      <PageNav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-14">
        {/* Hero strip */}
        <div className="rounded-2xl bg-[oklch(0.18_0.06_255)] px-8 py-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 90% 30%, oklch(0.55 0.12 75 / 0.18), transparent)" }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.12_75/0.2)] flex items-center justify-center">
                <BookOpen size={18} className="text-[oklch(0.72_0.12_75)]" />
              </div>
            </div>
            <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-3">For Schools</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4 leading-tight">
              For Schools
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
              Practical, responsible approaches to digital safeguarding designed with the realities of school life in mind.
            </p>
          </div>
        </div>

        {/* Main copy */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-8 mb-8">
            <p className="text-[oklch(0.35_0.02_255)] leading-relaxed text-[0.95rem]">
              Schools sit at the intersection of education, digital access, safeguarding, and child wellbeing. FaithShield247 is being developed with an awareness that schools need practical, scalable, and responsible approaches to digital risk. The project aims to support digital safeguarding thinking, healthier digital participation, and stronger dialogue between school, home, and child protection responsibilities.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-5">
            {highlights.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-6">
                <div className="w-1 h-8 rounded-full bg-[oklch(0.72_0.12_75)] mb-4" />
                <p className="text-[oklch(0.25_0.03_255)] font-medium text-sm leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/waitlist">
            <Button className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 px-7 py-3 h-auto text-sm font-semibold gap-2 rounded-xl">
              Join the Waitlist <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/" className="text-sm text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors flex items-center gap-1.5">
            <Shield size={13} />
            Back to Home
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
