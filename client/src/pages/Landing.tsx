import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Shield, CheckCircle, ArrowRight, Star, Users, BookOpen,
  BarChart3, Lock, Presentation, Settings, Zap, Bell,
} from "lucide-react";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SHIELD_IMG = "/logo.png";

// â"€â"€â"€ Particle network canvas â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gentle mouse attraction
        const mx = mouseRef.current.x - p.x;
        const my = mouseRef.current.y - p.y;
        const md = Math.sqrt(mx * mx + my * my);
        if (md < 140 && md > 0) {
          p.vx += (mx / md) * 0.06;
          p.vy += (my / md) * 0.06;
          // Clamp speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.5) { p.vx = (p.vx / speed) * 1.5; p.vy = (p.vy / speed) * 1.5; }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
}

// â"€â"€â"€ Hero right-side visual â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function HeroVisual() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 select-none">
      {/* Glowing shield */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-52 h-52 rounded-full bg-[oklch(0.72_0.12_75/0.08)] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute w-40 h-40 rounded-full bg-[oklch(0.72_0.12_75/0.12)] animate-pulse" />
        <img src={SHIELD_IMG} alt="FaithShield247 shield" className="relative z-10 w-36 h-40 object-contain drop-shadow-2xl" />
      </div>

      {/* Floating stat cards */}
      <div className="flex flex-col gap-3 w-72">
        {/* Protection active */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
            <Shield size={14} className="text-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="text-white text-xs font-semibold">Protection Active</p>
            <p className="text-white/45 text-[11px]">3 devices secured now</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        </div>

        {/* Threats blocked */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-[oklch(0.72_0.12_75/0.25)] flex items-center justify-center flex-shrink-0">
            <Lock size={14} className="text-[oklch(0.85_0.09_75)]" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">47 Threats Blocked</p>
            <p className="text-white/45 text-[11px]">Today across all devices</p>
          </div>
        </div>

        {/* AI score bar */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/50 text-[11px]">AI Safety Score</p>
            <p className="text-[oklch(0.85_0.09_75)] text-xs font-bold">94.7%</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "94.7%", background: "linear-gradient(to right, oklch(0.55 0.15 155), oklch(0.72 0.12 75))" }}
            />
          </div>
        </div>

        {/* Live activity pulse */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
          <div className="flex gap-0.5 items-end h-4">
            {[3, 6, 4, 7, 5, 8, 4, 6, 3, 7].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-sm bg-[oklch(0.72_0.12_75/0.6)]"
                style={{ height: `${h * 2}px`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-white/40 text-[11px]">Live activity monitoring</p>
        </div>
      </div>
    </div>
  );
}

// â"€â"€â"€ Data â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const features = [
  { icon: Shield, title: "AI Content Filtering", desc: "Real-time detection and blocking of harmful content — pornography, violence, extremism — before it reaches your child's screen." },
  { icon: Users, title: "Parental Dashboard", desc: "A powerful, intuitive control centre. Monitor activity, set screen-time limits, receive alerts, and manage every device from one place." },
  { icon: BookOpen, title: "Curated Faith Content", desc: "A walled-garden library of age-appropriate Christian videos, Bible stories, educational games, and moral storytelling." },
  { icon: BarChart3, title: "Activity Reports", desc: "Weekly and daily reports showing what your children are doing online, with faith-based conversation starters for parents." },
  { icon: Lock, title: "Anti-Grooming Detection", desc: "AI-powered keyword and pattern detection that alerts parents to predatory language in messages and chats." },
  { icon: Star, title: "Church & School Integration", desc: "Group subscriptions and digital discipleship tools for Christian schools, churches, and youth ministries." },
];

const stats = [
  { value: "75%", label: "of teens encounter sexual content online" },
  { value: "82%", label: "encounter violent content online" },
  { value: "90%+", label: "of parents are deeply concerned" },
  { value: "$4B+", label: "child safety market by 2035" },
];

const plans = [
  {
    name: "Basic Protection", price: "$7.99", period: "/month",
    desc: "Essential protection for individual families",
    features: ["AI content filtering", "Safe browser mode", "Screen-time controls", "Up to 3 devices", "Weekly reports"],
    cta: "Start Free Trial", highlight: false,
  },
  {
    name: "Premium Family", price: "$14.99", period: "/month",
    desc: "Full ecosystem for faith-rooted families",
    features: ["Everything in Basic", "Full content library", "Anti-grooming alerts", "Unlimited devices", "Daily verse prompts", "Priority support"],
    cta: "Start Free Trial", highlight: true,
  },
  {
    name: "Church & School", price: "Custom", period: "",
    desc: "Institutional packages for ministries",
    features: ["Group management", "Digital discipleship tools", "Student analytics", "Curriculum integration", "Dedicated support"],
    cta: "Contact Us", highlight: false,
  },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "For Churches", href: "#pricing" },
];

const howItWorksSteps = [
  { step: "01", icon: Settings, title: "Install & Configure", desc: "Set up FaithShield247 on your family's devices in minutes. Create individual profiles for each child with age-appropriate settings." },
  { step: "02", icon: Zap, title: "AI Monitors in Real-Time", desc: "Our AI engine continuously scans web content, images, and messages — blocking harmful material before it reaches your child." },
  { step: "03", icon: Bell, title: "Parents Stay Informed", desc: "Receive instant alerts for concerning activity. Review weekly reports and use built-in conversation guides to discuss digital life with your children." },
  { step: "04", icon: BookOpen, title: "Children Grow & Learn", desc: "Children access a curated world of Christian content, educational games, Bible stories, and safe community — nourishment, not just restriction." },
];

// â"€â"€â"€ Page â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
export default function Landing() {
  const { enableDemoMode } = useDemo();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_80)]">

      {/* â"€â"€ Nav â"€â"€ */}
      <div className={cn("sticky top-0 z-50 transition-all duration-300 ease-out", scrolled ? "px-5 pt-3" : "")}>
        <nav className={cn(
          "transition-all duration-300 ease-out",
          scrolled
            ? "bg-[oklch(0.18_0.06_255/0.95)] backdrop-blur-md rounded-2xl shadow-[0_8px_32px_oklch(0.12_0.06_255/0.45)]"
            : "bg-[oklch(0.18_0.06_255)]"
        )}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-9 object-contain" />
              <span className="text-white font-semibold text-lg font-display">FaithShield247</span>
            </div>
            <div className="hidden md:flex items-center gap-6 ml-8">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href} className="text-white/60 hover:text-white text-sm transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost" size="sm"
                  className="text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.85_0.09_75)] hover:bg-[oklch(0.72_0.12_75/0.1)] text-xs gap-1.5 border border-[oklch(0.72_0.12_75/0.3)]"
                  onClick={(e) => { e.preventDefault(); enableDemoMode(); window.location.href = "/login"; }}
                >
                  <Presentation size={13} /> Demo
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
      </div>

      {/* â"€â"€ Hero (interactive background + 2-column) â"€â"€ */}
      <section className="relative overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center">
        {/* Base: deep near-black to dark blue-grey */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #0a0b0f 0%, #0d1220 45%, #101828 100%)" }} />
        {/* Subtle cool blue radial glow — left-centre */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 65% at 15% 55%, rgba(30,50,110,0.45), transparent)" }} />
        {/* Faint grey-blue shimmer — top-right */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 90% 15%, rgba(45,60,90,0.3), transparent)" }} />
        {/* Very subtle warm gold tint — bottom-right */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 38% 40% at 85% 92%, rgba(180,140,60,0.1), transparent)" }} />
        {/* Top vignette for depth */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent 35%)" }} />

        {/* Interactive particle network canvas */}
        <ParticleCanvas />

        {/* Content grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <Badge className="mb-6 bg-[oklch(0.72_0.12_75/0.2)] text-[oklch(0.85_0.09_75)] border-[oklch(0.72_0.12_75/0.4)] text-xs font-medium px-3 py-1">
              Faith-Based Digital Safeguarding
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="whitespace-nowrap">Protecting Innocence</span><br />
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

          {/* Right — interactive visual */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* -- Stats bar -- */}
      <section className="bg-[oklch(0.22_0.09_265)] py-12 border-y border-[oklch(0.72_0.12_75/0.2)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.value} className={`text-center ${i < 3 ? "lg:border-r lg:border-[oklch(0.72_0.12_75/0.15)]" : ""}`}>
              <div className="text-4xl font-bold text-[oklch(0.78_0.14_75)] font-display">{s.value}</div>
              <div className="text-white/65 text-sm mt-2 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* â"€â"€ Mission statement â"€â"€ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="gold-divider mb-8" />
          <blockquote className="text-2xl lg:text-3xl text-[oklch(0.15_0.03_255)] leading-relaxed font-medium italic mb-6 font-display">
            "The internet is no longer neutral. It catechises. It disciples. It shapes desire. If decent people do not build alternatives, the algorithm will keep raising children in its own image."
          </blockquote>
          <p className="text-[oklch(0.5_0.02_255)] text-sm">The cultural urgency behind FaithShield247</p>
          <div className="gold-divider mt-8" />
        </div>
      </section>

      {/* â"€â"€ Features â"€â"€ */}
      <section id="features" className="py-20 bg-[oklch(0.97_0.01_80)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4">Not Just a Filter — A Formation Tool</h2>
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
                <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-2">{f.title}</h3>
                <p className="text-[oklch(0.5_0.02_255)] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ How it works â"€â"€ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4">How FaithShield247 Works</h2>
            <p className="text-[oklch(0.5_0.02_255)] text-lg max-w-xl mx-auto">
              From setup to daily protection — designed to be effortless for parents and invisible to children.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {howItWorksSteps.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl bg-[oklch(0.97_0.01_80)] border border-[oklch(0.9_0.01_80)] p-7 overflow-hidden group hover:shadow-lg hover:border-[oklch(0.18_0.06_255/0.2)] transition-all duration-200"
              >
                <div className="absolute -top-3 -right-1 text-[7.5rem] font-bold text-[oklch(0.91_0.005_80)] font-display leading-none select-none pointer-events-none">
                  {item.step}
                </div>
                <div className="relative z-10 w-12 h-12 rounded-xl bg-[oklch(0.18_0.06_255)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  <item.icon size={22} className="text-[oklch(0.72_0.12_75)]" />
                </div>
                <h4 className="relative z-10 font-bold text-[oklch(0.15_0.03_255)] mb-2 text-base">{item.title}</h4>
                <p className="relative z-10 text-[oklch(0.5_0.02_255)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-[oklch(0.18_0.06_255)] rounded-2xl px-8 py-7">
            <div>
              <p className="text-white font-semibold text-lg mb-1">See it in action</p>
              <p className="text-white/55 text-sm">Try the live content filter and see how FaithShield247 works in real time.</p>
            </div>
            <Link href="/filter-demo" className="flex-shrink-0">
              <Button className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 font-semibold gap-2 px-6">
                Live Filter Demo <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* â"€â"€ Pricing â"€â"€ */}
      <section id="pricing" className="py-20 bg-[oklch(0.97_0.01_80)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[oklch(0.5_0.02_255)] text-lg">Start free. No credit card required.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 ${plan.highlight ? "bg-[oklch(0.18_0.06_255)] text-white shadow-2xl scale-105" : "bg-white border border-[oklch(0.9_0.01_80)] shadow-sm"}`}
              >
                {plan.highlight && (
                  <Badge className="mb-3 bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-xs">Most Popular</Badge>
                )}
                <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-[oklch(0.15_0.03_255)]"}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-white/60" : "text-[oklch(0.5_0.02_255)]"}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold font-display ${plan.highlight ? "text-[oklch(0.85_0.09_75)]" : "text-[oklch(0.15_0.03_255)]"}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? "text-white/50" : "text-[oklch(0.5_0.02_255)]"}`}>{plan.period}</span>
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
                  <Button className={`w-full ${plan.highlight ? "bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.15_0.03_255)] border-0" : "bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0"}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â"€â"€ CTA â"€â"€ */}
      <section className="bg-[oklch(0.18_0.06_255)] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-20 h-24 mx-auto mb-6 object-contain shield-pulse" />
          <h2 className="text-4xl font-bold text-white mb-4">Guard Their Hearts Online</h2>
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

      {/* â"€â"€ Footer â"€â"€ */}
      <footer className="bg-[oklch(0.13_0.05_255)] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-9 object-contain" />
                <span className="text-white font-semibold font-display">FaithShield247</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">Protecting innocence in a digital age. A faith-based digital safeguarding ecosystem.</p>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Product</p>
              <ul className="space-y-2.5">
                {[{ label: "Features", href: "#features" }, { label: "How It Works", href: "#how-it-works" }, { label: "Pricing", href: "#pricing" }, { label: "For Churches", href: "#pricing" }].map((link) => (
                  <li key={link.label}><a href={link.href} className="text-white/40 hover:text-white/80 text-sm transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Platform</p>
              <ul className="space-y-2.5">
                {["Parental Dashboard", "Child View", "Teen Mode", "Admin Portal"].map((label) => (
                  <li key={label}><Link href="/login" className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Legal</p>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map((label) => (
                  <li key={label}><a href="#" className="text-white/40 hover:text-white/80 text-sm transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">Â© 2026 FaithShield247. All rights reserved.</p>
            <p className="text-white/25 text-xs">Built for families who believe digital formation matters.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
