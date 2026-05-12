/* FaithShield247 Landing Page — Sacred Modernism
 * Deep navy + warm gold + off-white cream
 * Playfair Display headings, DM Sans body
 */
import { Link } from "wouter";
import { Shield, CheckCircle, ArrowRight, Star, Users, BookOpen, BarChart3, Lock, Presentation } from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-hero-HfYVr2ei75cpvuct2YthCb.webp";
const SHIELD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-logo-A4Lo5NmYbnLa97AHWfiJdy.webp";
const KIDS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-kids-DBoo5yMAgcgBjyCFseKAe8.webp";

const features = [
  {
    icon: Shield,
    title: "AI Content Filtering",
    desc: "Real-time detection and blocking of harmful content — pornography, violence, extremism — before it reaches your child's screen.",
  },
  {
    icon: Users,
    title: "Parental Dashboard",
    desc: "A powerful, intuitive control centre. Monitor activity, set screen-time limits, receive alerts, and manage every device from one place.",
  },
  {
    icon: BookOpen,
    title: "Curated Faith Content",
    desc: "A walled-garden library of age-appropriate Christian videos, Bible stories, educational games, and moral storytelling.",
  },
  {
    icon: BarChart3,
    title: "Activity Reports",
    desc: "Weekly and daily reports showing what your children are doing online, with faith-based conversation starters for parents.",
  },
  {
    icon: Lock,
    title: "Anti-Grooming Detection",
    desc: "AI-powered keyword and pattern detection that alerts parents to predatory language in messages and chats.",
  },
  {
    icon: Star,
    title: "Church & School Integration",
    desc: "Group subscriptions and digital discipleship tools for Christian schools, churches, and youth ministries.",
  },
];

const stats = [
  { value: "75%", label: "of teens encounter sexual content online" },
  { value: "82%", label: "encounter violent content online" },
  { value: "90%+", label: "of parents are deeply concerned" },
  { value: "$4B+", label: "child safety market by 2035" },
];

const plans = [
  {
    name: "Basic Protection",
    price: "$7.99",
    period: "/month",
    desc: "Essential protection for individual families",
    features: ["AI content filtering", "Safe browser mode", "Screen-time controls", "Up to 3 devices", "Weekly reports"],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Premium Family",
    price: "$14.99",
    period: "/month",
    desc: "Full ecosystem for faith-rooted families",
    features: ["Everything in Basic", "Full content library", "Anti-grooming alerts", "Unlimited devices", "Daily verse prompts", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Church & School",
    price: "Custom",
    period: "",
    desc: "Institutional packages for ministries",
    features: ["Group management", "Digital discipleship tools", "Student analytics", "Curriculum integration", "Dedicated support"],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function Landing() {
  const { enableDemoMode } = useDemo();

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_80)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="bg-[oklch(0.18_0.06_255)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-white font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              FaithShield247
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-8">
            {["Features", "How It Works", "Pricing", "For Churches"].map((item) => (
              <a key={item} href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.85_0.09_75)] hover:bg-[oklch(0.72_0.12_75/0.1)] text-xs gap-1.5 border border-[oklch(0.72_0.12_75/0.3)]"
                onClick={(e) => {
                  e.preventDefault();
                  enableDemoMode();
                  window.location.href = "/login";
                }}
              >
                <Presentation size={13} />
                Demo
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] font-semibold border-0 text-sm">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Family" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.06_255/0.92)] via-[oklch(0.18_0.06_255/0.75)] to-[oklch(0.18_0.06_255/0.3)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-40">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-[oklch(0.72_0.12_75/0.2)] text-[oklch(0.85_0.09_75)] border-[oklch(0.72_0.12_75/0.4)] text-xs font-medium px-3 py-1">
              Faith-Based Digital Safeguarding
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Protecting Innocence<br />
              <em className="text-[oklch(0.85_0.09_75)]">in a Digital Age</em>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
              FaithShield247 is a Christian digital safeguarding platform that protects children from harmful online content while nurturing moral clarity, spiritual growth, and healthy digital habits.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg" className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] font-semibold border-0 gap-2">
                  Start Free Trial <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {["AI-Powered Filtering", "Faith Formation Tools", "Parental Dashboard"].map((tag) => (
                <div key={tag} className="flex items-center gap-1.5 text-white/70 text-sm">
                  <CheckCircle size={14} className="text-[oklch(0.72_0.12_75)]" />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[oklch(0.18_0.06_255)] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="text-3xl font-bold text-[oklch(0.72_0.12_75)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.value}
              </div>
              <div className="text-white/55 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="gold-divider mb-8" />
          <blockquote className="text-2xl lg:text-3xl text-[oklch(0.15_0.03_255)] leading-relaxed font-medium italic mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            "The internet is no longer neutral. It catechises. It disciples. It shapes desire. If decent people do not build alternatives, the algorithm will keep raising children in its own image."
          </blockquote>
          <p className="text-[oklch(0.5_0.02_255)] text-sm">The cultural urgency behind FaithShield247</p>
          <div className="gold-divider mt-8" />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[oklch(0.97_0.01_80)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Not Just a Filter — A Formation Tool
            </h2>
            <p className="text-[oklch(0.5_0.02_255)] text-lg max-w-2xl mx-auto">
              FaithShield247 combines protection with purpose. Blocking poison is only half the battle. We also provide nourishment.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`stat-card p-6 animate-fade-up-delay-${Math.min(i + 1, 5)}`}>
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.18_0.06_255/0.08)] flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-[oklch(0.18_0.06_255)]" />
                </div>
                <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {f.title}
                </h3>
                <p className="text-[oklch(0.5_0.02_255)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                How FaithShield247 Works
              </h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Install & Configure", desc: "Set up FaithShield247 on your family's devices in minutes. Create individual profiles for each child with age-appropriate settings." },
                  { step: "02", title: "AI Monitors in Real-Time", desc: "Our AI engine continuously scans web content, images, and messages — blocking harmful material before it reaches your child." },
                  { step: "03", title: "Parents Stay Informed", desc: "Receive instant alerts for concerning activity. Review weekly reports and use built-in conversation guides to discuss digital life with your children." },
                  { step: "04", title: "Children Grow & Learn", desc: "Children access a curated world of Christian content, educational games, Bible stories, and safe community — nourishment, not just restriction." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[oklch(0.18_0.06_255)] flex items-center justify-center text-[oklch(0.72_0.12_75)] font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[oklch(0.15_0.03_255)] mb-1">{item.title}</h4>
                      <p className="text-[oklch(0.5_0.02_255)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/filter-demo">
                  <Button className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white gap-2">
                    See the Filter in Action <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src={KIDS_IMG} alt="Children using FaithShield247" className="rounded-2xl w-full object-cover shadow-2xl" />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-[oklch(0.9_0.01_80)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[oklch(0.15_0.03_255)]">Protection Active</p>
                    <p className="text-xs text-[oklch(0.5_0.02_255)]">3 devices secured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[oklch(0.97_0.01_80)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Simple, Transparent Pricing
            </h2>
            <p className="text-[oklch(0.5_0.02_255)] text-lg">Start free. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 ${
                  plan.highlight
                    ? "bg-[oklch(0.18_0.06_255)] text-white shadow-2xl scale-105"
                    : "bg-white border border-[oklch(0.9_0.01_80)] shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <Badge className="mb-3 bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-xs">
                    Most Popular
                  </Badge>
                )}
                <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-[oklch(0.15_0.03_255)]"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-white/60" : "text-[oklch(0.5_0.02_255)]"}`}>
                  {plan.desc}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlight ? "text-[oklch(0.85_0.09_75)]" : "text-[oklch(0.15_0.03_255)]"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? "text-white/50" : "text-[oklch(0.5_0.02_255)]"}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-white/80" : "text-[oklch(0.4_0.02_255)]"}`}>
                      <CheckCircle size={14} className={plan.highlight ? "text-[oklch(0.72_0.12_75)]" : "text-emerald-500"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full ${
                      plan.highlight
                        ? "bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] border-0"
                        : "bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[oklch(0.18_0.06_255)] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-20 h-20 mx-auto mb-6 rounded-2xl object-cover shield-pulse" />
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Guard Their Hearts Online
          </h2>
          <p className="text-white/65 text-lg mb-8 leading-relaxed">
            Children are being discipled daily by screens. If the family, the church, and good technology do not stand in the gap, something else will.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] font-semibold border-0 gap-2 text-base px-8">
                Start Free Trial <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent text-base px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.13_0.05_255)] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={SHIELD_IMG} alt="FaithShield247" className="w-7 h-7 rounded object-cover" />
            <span className="text-white/70 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>FaithShield247</span>
          </div>
          <p className="text-white/30 text-xs text-center">
            Protecting innocence in a digital age. A faith-based digital safeguarding ecosystem.
          </p>
          <p className="text-white/30 text-xs">© 2026 FaithShield247</p>
        </div>
      </footer>
    </div>
  );
}
