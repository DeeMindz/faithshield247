/* FaithShield247 Filter Demo — AI Content Filter Simulation
 * Shows how the AI engine analyses and categorises content in real-time
 */
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Shield, AlertTriangle, CheckCircle, Zap, Clock, X, Eye, Brain, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Severity = "blocked" | "warning" | "safe";

interface AnalysisResult {
  category: string;
  score: number;
  status: Severity;
  detail: string;
}

interface ScanResult {
  url: string;
  verdict: Severity;
  timeMs: number;
  categories: AnalysisResult[];
  aiReason: string;
}

const testUrls = [
  { url: "biblegateway.com/verse/john-3-16", expected: "safe", label: "Bible Gateway" },
  { url: "kidssundayschool.com/lessons", expected: "safe", label: "Kids Sunday School" },
  { url: "youtube.com/watch?v=xyz123", expected: "warning", label: "YouTube (unfiltered)" },
  { url: "explicit-adult-site.com", expected: "blocked", label: "Adult Content Site" },
  { url: "nationalgeographic.com/animals", expected: "safe", label: "National Geographic" },
  { url: "gambling-casino-online.com", expected: "blocked", label: "Gambling Site" },
  { url: "instagram.com/feed", expected: "warning", label: "Instagram" },
  { url: "violence-gore-videos.net", expected: "blocked", label: "Violence Site" },
];

const categoryAnalysis: Record<string, AnalysisResult[]> = {
  safe: [
    { category: "Adult Content", score: 0, status: "safe", detail: "No adult content detected" },
    { category: "Violence", score: 2, status: "safe", detail: "No violent content detected" },
    { category: "Language", score: 1, status: "safe", detail: "Age-appropriate language" },
    { category: "Faith Alignment", score: 95, status: "safe", detail: "Faith-positive content" },
    { category: "Grooming Patterns", score: 0, status: "safe", detail: "No concerning patterns" },
  ],
  warning: [
    { category: "Adult Content", score: 15, status: "safe", detail: "Low risk, monitoring" },
    { category: "Violence", score: 8, status: "safe", detail: "Mild content possible" },
    { category: "Language", score: 22, status: "warning", detail: "Some inappropriate language possible" },
    { category: "Faith Alignment", score: 35, status: "warning", detail: "Secular/mixed content" },
    { category: "Grooming Patterns", score: 5, status: "safe", detail: "No concerning patterns" },
  ],
  blocked: [
    { category: "Adult Content", score: 94, status: "blocked", detail: "Explicit adult content detected" },
    { category: "Violence", score: 78, status: "blocked", detail: "Graphic violent content" },
    { category: "Language", score: 85, status: "blocked", detail: "Highly inappropriate language" },
    { category: "Faith Alignment", score: 2, status: "blocked", detail: "Harmful to faith formation" },
    { category: "Grooming Patterns", score: 45, status: "warning", detail: "Potential risk patterns" },
  ],
};

const aiReasons: Record<string, string> = {
  safe: "Content analysis complete. This domain is verified safe for children. It contains age-appropriate, faith-aligned material with no detected harmful patterns. Access granted.",
  warning: "Content analysis flagged this domain for parental review. While not explicitly harmful, this platform contains user-generated content that may not align with your family's values. Parental supervision recommended.",
  blocked: "BLOCKED. This domain has been identified as containing content that violates FaithShield247's protection policies. The content poses a significant risk to children's wellbeing and moral formation. Access denied and parent notified.",
};

const liveLog: string[] = [
  "FaithShield247 AI Engine v3.2 — initialised",
  "Neural content classifier loaded (94.7% accuracy)",
  "Grooming pattern detector active",
  "Image recognition model ready",
  "DNS-level filter active on 3 devices",
  "Real-time monitoring enabled",
];

export default function FilterDemo() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [log, setLog] = useState(liveLog);
  const [blockedCount, setBlockedCount] = useState(47);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockedCount((c) => c + Math.floor(Math.random() * 3));
      const msgs = [
        "Scanning incoming request...",
        `Blocked: suspicious-site-${Math.floor(Math.random() * 999)}.com`,
        "Image hash check passed",
        "DNS query intercepted and filtered",
        "Safe content verified: biblestudytools.com",
        "Keyword pattern scan complete — no threats",
      ];
      setLog((prev) => [...prev.slice(-20), msgs[Math.floor(Math.random() * msgs.length)]]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const runScan = async (url: string, expected?: string) => {
    setScanning(true);
    setResult(null);
    setProgress(0);
    const target = url || customUrl || "unknown-site.com";

    const verdict: Severity = (expected as Severity) ||
      (target.includes("bible") || target.includes("faith") || target.includes("christian") || target.includes("national") ? "safe" :
        target.includes("youtube") || target.includes("instagram") || target.includes("tiktok") ? "warning" : "blocked");

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 40));
      setProgress(i);
    }

    const timeMs = Math.floor(Math.random() * 80) + 20;
    setResult({
      url: target,
      verdict,
      timeMs,
      categories: categoryAnalysis[verdict],
      aiReason: aiReasons[verdict],
    });
    setScanning(false);
    setLog((prev) => [...prev, `Scan complete: ${target} → ${verdict.toUpperCase()} (${timeMs}ms)`]);
  };

  const verdictConfig = {
    safe: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle, label: "SAFE — Access Granted" },
    warning: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle, label: "WARNING — Parental Review" },
    blocked: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: X, label: "BLOCKED — Access Denied" },
  };

  return (
    <DashboardLayout title="AI Filter Demo" subtitle="See how FaithShield247's AI engine analyses content in real-time">
      <div className="p-6 space-y-6">

        {/* Live stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Blocked Today", value: blockedCount.toLocaleString(), icon: Shield, color: "text-red-600", bg: "bg-red-50" },
            { label: "Scan Speed", value: "~45ms", icon: Zap, color: "text-[oklch(0.72_0.12_75)]", bg: "bg-[oklch(0.97_0.05_75)]" },
            { label: "AI Accuracy", value: "94.7%", icon: Brain, color: "text-[oklch(0.18_0.06_255)]", bg: "bg-[oklch(0.18_0.06_255/0.07)]" },
          ].map((s) => (
            <div key={s.label} className="stat-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <div className="text-xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div className="text-xs text-[oklch(0.5_0.02_255)]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner */}
          <div className="space-y-4">
            <div className="stat-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Cpu size={18} className="text-[oklch(0.18_0.06_255)]" />
                <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  URL Scanner
                </h3>
                <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">Live Demo</Badge>
              </div>

              {/* Custom URL input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="Enter any URL to analyse..."
                  className="flex-1 px-3 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)] bg-[oklch(0.97_0.01_80)]"
                />
                <Button
                  onClick={() => runScan(customUrl)}
                  disabled={scanning || !customUrl}
                  className="bg-[oklch(0.18_0.06_255)] text-white border-0 gap-1.5"
                >
                  <Zap size={14} /> Scan
                </Button>
              </div>

              {/* Progress */}
              {scanning && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[oklch(0.5_0.02_255)] mb-1.5">
                    <span>Analysing content...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="mt-2 text-xs text-[oklch(0.5_0.02_255)] space-y-0.5">
                    {progress > 20 && <p>✓ DNS lookup complete</p>}
                    {progress > 40 && <p>✓ Domain reputation check</p>}
                    {progress > 60 && <p>✓ Content category analysis</p>}
                    {progress > 80 && <p>✓ Image hash verification</p>}
                    {progress > 90 && <p>✓ Grooming pattern scan</p>}
                  </div>
                </div>
              )}

              {/* Result */}
              {result && !scanning && (
                <div className={`rounded-xl p-4 border ${verdictConfig[result.verdict].bg} ${verdictConfig[result.verdict].border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {(() => {
                      const Icon = verdictConfig[result.verdict].icon;
                      return <Icon size={18} className={verdictConfig[result.verdict].color} />;
                    })()}
                    <span className={`font-bold text-sm ${verdictConfig[result.verdict].color}`}>
                      {verdictConfig[result.verdict].label}
                    </span>
                    <span className="ml-auto text-xs text-[oklch(0.5_0.02_255)] flex items-center gap-1">
                      <Clock size={10} /> {result.timeMs}ms
                    </span>
                  </div>
                  <p className="text-xs text-[oklch(0.3_0.02_255)] leading-relaxed mb-3 italic">
                    {result.aiReason}
                  </p>
                  <div className="space-y-2">
                    {result.categories.map((cat) => (
                      <div key={cat.category} className="flex items-center gap-2">
                        <span className="text-xs text-[oklch(0.4_0.02_255)] w-32 flex-shrink-0">{cat.category}</span>
                        <div className="flex-1 bg-white/60 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${cat.score}%`,
                              background: cat.status === "blocked" ? "oklch(0.58 0.22 27)" : cat.status === "warning" ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.15 145)",
                            }}
                          />
                        </div>
                        <span className="text-xs text-[oklch(0.5_0.02_255)] w-8 text-right">{cat.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pre-set test URLs */}
              <div className="mt-4">
                <p className="text-xs font-medium text-[oklch(0.5_0.02_255)] mb-2">Quick test URLs:</p>
                <div className="grid grid-cols-2 gap-2">
                  {testUrls.map((t) => (
                    <button
                      key={t.url}
                      onClick={() => runScan(t.url, t.expected)}
                      disabled={scanning}
                      className={`text-left text-xs p-2.5 rounded-lg border transition-colors hover:opacity-80 ${
                        t.expected === "safe" ? "bg-emerald-50 border-emerald-100 text-emerald-700" :
                        t.expected === "warning" ? "bg-amber-50 border-amber-100 text-amber-700" :
                        "bg-red-50 border-red-100 text-red-700"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {t.expected === "safe" ? <CheckCircle size={10} /> : t.expected === "warning" ? <AlertTriangle size={10} /> : <X size={10} />}
                        <span className="font-medium">{t.label}</span>
                      </div>
                      <p className="text-[10px] opacity-70 mt-0.5 truncate">{t.url}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live AI Log */}
          <div className="stat-card p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={18} className="text-[oklch(0.18_0.06_255)]" />
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Live AI Engine Log
              </h3>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-600">Active</span>
              </div>
            </div>
            <div
              ref={logRef}
              className="flex-1 bg-[oklch(0.13_0.05_255)] rounded-xl p-4 overflow-y-auto font-mono text-xs space-y-1.5"
              style={{ minHeight: "320px", maxHeight: "420px" }}
            >
              {log.map((entry, i) => (
                <div key={i} className={`${
                  entry.includes("Blocked") || entry.includes("BLOCKED") ? "text-red-400" :
                  entry.includes("Safe") || entry.includes("safe") || entry.includes("passed") ? "text-emerald-400" :
                  entry.includes("WARNING") ? "text-amber-400" :
                  "text-[oklch(0.7_0.02_255)]"
                }`}>
                  <span className="text-[oklch(0.4_0.02_255)]">[{new Date().toLocaleTimeString()}] </span>
                  {entry}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[oklch(0.18_0.06_255/0.06)] rounded-lg border border-[oklch(0.18_0.06_255/0.1)]">
              <p className="text-xs text-[oklch(0.4_0.02_255)] leading-relaxed">
                <strong className="text-[oklch(0.18_0.06_255)]">How the AI works:</strong> FaithShield247 uses a multi-layer neural network trained on millions of web pages. It analyses domain reputation, page content, images (via hash and visual AI), and language patterns simultaneously — delivering a verdict in under 50ms.
              </p>
            </div>
          </div>
        </div>

        {/* How the filter layers work */}
        <div className="stat-card p-6">
          <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            The 5-Layer Protection Architecture
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { layer: "1", title: "DNS Filter", desc: "Blocks known harmful domains before any content loads", icon: "🌐" },
              { layer: "2", title: "Content AI", desc: "Neural network classifies page text and context in real-time", icon: "🧠" },
              { layer: "3", title: "Image Scanner", desc: "Visual AI and hash-matching detects harmful images", icon: "👁️" },
              { layer: "4", title: "Chat Monitor", desc: "Keyword and pattern detection in messages and chats", icon: "💬" },
              { layer: "5", title: "Parent Alert", desc: "Instant notification to parents for high-risk events", icon: "🔔" },
            ].map((l) => (
              <div key={l.layer} className="text-center p-4 rounded-xl bg-[oklch(0.97_0.01_80)] border border-[oklch(0.9_0.01_80)]">
                <div className="text-2xl mb-2">{l.icon}</div>
                <div className="w-6 h-6 rounded-full bg-[oklch(0.18_0.06_255)] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                  {l.layer}
                </div>
                <h4 className="font-semibold text-xs text-[oklch(0.15_0.03_255)] mb-1">{l.title}</h4>
                <p className="text-[10px] text-[oklch(0.5_0.02_255)] leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
