import { Link } from "wouter";
import { Shield, ArrowRight, Target, Eye } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(0.97_0.01_80)]">
      <PageNav />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-14">
        {/* Hero strip */}
        <div className="rounded-2xl bg-[oklch(0.18_0.06_255)] px-8 py-10 mb-12 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.55 0.12 75 / 0.15), transparent)" }} />
          <div className="relative">
            <p className="text-[oklch(0.72_0.12_75)] text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4 leading-tight">
              About FaithShield247
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-2xl">
              A joint initiative of Idea-Hub Ireland and Idea-Hub UK Ltd.
            </p>
          </div>
        </div>

        {/* About FaithShield247 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[oklch(0.18_0.06_255)] font-display mb-5">About FaithShield247</h2>
          <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-8 mb-6">
            <p className="text-[oklch(0.35_0.02_255)] leading-relaxed text-[0.95rem] mb-4">
              FaithShield247 is an Idea-Hub-led concept being developed to help create safer digital environments for children and young people. It was created in response to a growing concern: children and young people are increasingly exposed to harmful digital content, online pressure, manipulative environments, and digital experiences that are not designed with their wellbeing in mind.
            </p>
            <p className="text-[oklch(0.35_0.02_255)] leading-relaxed text-[0.95rem]">
              FaithShield247 seeks to contribute to a better response by exploring how technology, structure, and trusted guidance can work together to support safer digital engagement.
            </p>
          </div>

          {/* Mission & Vision cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.18_0.06_255)] flex items-center justify-center flex-shrink-0">
                  <Target size={16} className="text-[oklch(0.72_0.12_75)]" />
                </div>
                <h3 className="font-bold text-[oklch(0.18_0.06_255)] font-display">Mission</h3>
              </div>
              <p className="text-[oklch(0.4_0.02_255)] text-sm leading-relaxed">
                To help create safer digital environments for children and young people through a platform approach centred on protection, guidance, and responsible support.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.18_0.06_255)] flex items-center justify-center flex-shrink-0">
                  <Eye size={16} className="text-[oklch(0.72_0.12_75)]" />
                </div>
                <h3 className="font-bold text-[oklch(0.18_0.06_255)] font-display">Vision</h3>
              </div>
              <p className="text-[oklch(0.4_0.02_255)] text-sm leading-relaxed">
                A future in which children can engage with the digital world with greater safety, stronger guidance, and more intentional support from the adults and institutions around them.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[oklch(0.88_0.01_80)] mb-12" />

        {/* About Idea-Hub Ireland & Idea-Hub UK Ltd */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[oklch(0.18_0.06_255)] font-display mb-5">About Idea-Hub Ireland &amp; Idea-Hub UK Ltd</h2>
          <div className="bg-white rounded-2xl border border-[oklch(0.9_0.01_80)] p-8">
            <p className="text-[oklch(0.35_0.02_255)] leading-relaxed text-[0.95rem] mb-4">
              Idea-Hub Ireland and Idea-Hub UK Ltd are a platform committed to developing purposeful ideas, creative solutions, and socially relevant innovation. FaithShield247 is one of the initiatives emerging from that broader vision.
            </p>
            <p className="text-[oklch(0.35_0.02_255)] leading-relaxed text-[0.95rem]">
              Together, they bring thought, creativity, strategy, and collaboration to shape ideas that respond to real human and societal needs.
            </p>
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
