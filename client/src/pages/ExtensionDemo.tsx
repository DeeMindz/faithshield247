/* FaithShield247 Chrome Extension Prototype — Sacred Modernism
 * Interactive mockup: real-time content filter, safety score, quick-block, whitelist
 * Rendered as a browser window with extension popup overlay
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Shield, ArrowLeft, Globe, Lock, AlertTriangle, CheckCircle,
  X, Plus, Search, Eye, EyeOff, Clock, Zap, ChevronDown,
  ExternalLink, RefreshCw, Minus, Square, MoreHorizontal,
  Star, Bookmark, ChevronRight, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

const SHIELD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-logo-A4Lo5NmYbnLa97AHWfiJdy.webp";

/* ─── URL Database ─── */
interface SiteAnalysis {
  url: string;
  displayUrl: string;
  score: number; // 0-100
  status: "safe" | "caution" | "blocked";
  category: string;
  threats: string[];
  details: string;
  scanTime: string;
}

const siteDatabase: Record<string, SiteAnalysis> = {
  "biblegateway.com": {
    url: "https://www.biblegateway.com/passage/?search=John+3%3A16",
    displayUrl: "biblegateway.com/passage/?search=John+3:16",
    score: 98,
    status: "safe",
    category: "Faith & Scripture",
    threats: [],
    details: "Trusted Bible resource. No harmful content detected. Safe for all ages.",
    scanTime: "0.12s",
  },
  "khanacademy.org": {
    url: "https://www.khanacademy.org/math/algebra",
    displayUrl: "khanacademy.org/math/algebra",
    score: 95,
    status: "safe",
    category: "Education",
    threats: [],
    details: "Educational platform. Age-appropriate content verified. No ads or trackers.",
    scanTime: "0.18s",
  },
  "youtube.com": {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    displayUrl: "youtube.com/watch?v=dQw4w9WgXcQ",
    score: 62,
    status: "caution",
    category: "Video Streaming",
    threats: ["Unfiltered comments", "Autoplay may show age-inappropriate content", "Ads not pre-screened"],
    details: "Mixed content platform. Safe Search enforced. Comment section monitoring active. Some videos may contain mature themes.",
    scanTime: "0.34s",
  },
  "tiktok.com": {
    url: "https://www.tiktok.com",
    displayUrl: "tiktok.com",
    score: 28,
    status: "blocked",
    category: "Social Media",
    threats: ["Addictive algorithm", "Unmoderated content", "Privacy concerns", "Predatory contact risk"],
    details: "Blocked by FaithShield247. This platform's algorithm promotes addictive usage patterns and exposes children to unvetted content from strangers.",
    scanTime: "0.08s",
  },
  "reddit.com": {
    url: "https://www.reddit.com/r/gaming",
    displayUrl: "reddit.com/r/gaming",
    score: 35,
    status: "blocked",
    category: "Social Forum",
    threats: ["Adult subreddits accessible", "Unmoderated discussions", "Anonymous interactions", "Graphic content possible"],
    details: "Blocked by FaithShield247. Reddit contains numerous communities with adult content that cannot be reliably filtered at the page level.",
    scanTime: "0.11s",
  },
  "instagram.com": {
    url: "https://www.instagram.com",
    displayUrl: "instagram.com",
    score: 42,
    status: "blocked",
    category: "Social Media",
    threats: ["Body image concerns", "DM from strangers", "Explore page unfiltered", "Comparison culture"],
    details: "Blocked during restricted hours. Instagram's Explore page and DM system pose risks for minors. Allowed during supervised hours only.",
    scanTime: "0.15s",
  },
};

const siteKeys = Object.keys(siteDatabase);

/* ─── Whitelist ─── */
const defaultWhitelist = [
  { domain: "biblegateway.com", category: "Scripture" },
  { domain: "khanacademy.org", category: "Education" },
  { domain: "rightnowmedia.org", category: "Faith Media" },
  { domain: "focusonthefamily.com", category: "Family" },
  { domain: "youversion.com", category: "Devotional" },
];

type ExtView = "popup" | "scanning" | "result" | "whitelist" | "settings";

export default function ExtensionDemo() {
  const [currentSite, setCurrentSite] = useState("biblegateway.com");
  const [extView, setExtView] = useState<ExtView>("popup");
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [scanning, setScanning] = useState(false);
  const [whitelist, setWhitelist] = useState(defaultWhitelist);
  const [newDomain, setNewDomain] = useState("");
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [safeSearch, setSafeSearch] = useState(true);
  const [urlInput, setUrlInput] = useState("https://www.biblegateway.com/passage/?search=John+3:16");
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runScan = (site: string) => {
    setScanning(true);
    setExtView("scanning");
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);

    scanTimeoutRef.current = setTimeout(() => {
      const result = siteDatabase[site];
      if (result) {
        setAnalysis(result);
      } else {
        setAnalysis({
          url: `https://${site}`,
          displayUrl: site,
          score: 50 + Math.floor(Math.random() * 40),
          status: "caution",
          category: "Unknown",
          threats: ["Site not yet reviewed by FaithShield247"],
          details: "This site has not been fully analyzed. Proceed with caution.",
          scanTime: `${(0.2 + Math.random() * 0.3).toFixed(2)}s`,
        });
      }
      setScanning(false);
      setExtView("result");
    }, 800 + Math.random() * 600);
  };

  const handleSiteChange = (site: string) => {
    setCurrentSite(site);
    const data = siteDatabase[site];
    if (data) setUrlInput(data.url);
    runScan(site);
  };

  useEffect(() => {
    runScan(currentSite);
    return () => { if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current); };
  }, []);

  const scoreColor = (score: number) =>
    score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-600";
  const scoreBg = (score: number) =>
    score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  const statusLabel = (s: string) =>
    s === "safe" ? "Safe" : s === "caution" ? "Caution" : "Blocked";

  return (
    <DashboardLayout title="Browser Extension" subtitle="Interactive prototype of the FaithShield247 Chrome extension">
      <div className="p-6 max-w-5xl">
        {/* Intro */}
        <div className="mb-6 p-4 rounded-xl bg-[oklch(0.18_0.06_255/0.04)] border border-[oklch(0.18_0.06_255/0.1)]">
          <p className="text-sm text-[oklch(0.3_0.02_255)]">
            <strong>This is an interactive prototype</strong> of the FaithShield247 browser extension. Click different websites below to see how the real-time content filter analyzes and scores each page. The extension popup shows safety scores, threat analysis, and quick-block controls.
          </p>
        </div>

        {/* Test site selector */}
        <div className="mb-5">
          <p className="text-xs font-medium text-[oklch(0.5_0.02_255)] mb-2 uppercase tracking-wider">Test with different websites:</p>
          <div className="flex flex-wrap gap-2">
            {siteKeys.map((site) => {
              const data = siteDatabase[site];
              return (
                <button
                  key={site}
                  onClick={() => handleSiteChange(site)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    currentSite === site
                      ? "bg-[oklch(0.18_0.06_255)] text-white border-[oklch(0.18_0.06_255)]"
                      : "bg-white border-[oklch(0.9_0.01_80)] text-[oklch(0.3_0.02_255)] hover:border-[oklch(0.72_0.12_75)]"
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                    data.status === "safe" ? "bg-emerald-500" : data.status === "caution" ? "bg-amber-500" : "bg-red-500"
                  }`} />
                  {site}
                </button>
              );
            })}
          </div>
        </div>

        {/* Browser mockup */}
        <div className="rounded-xl border border-[oklch(0.85_0.01_80)] shadow-lg overflow-hidden bg-white">
          {/* Chrome title bar */}
          <div className="bg-[oklch(0.94_0.005_80)] px-3 py-2 flex items-center gap-2 border-b border-[oklch(0.88_0.01_80)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 flex items-center gap-2 ml-4">
              {/* Tab */}
              <div className="bg-white rounded-t-lg px-4 py-1.5 text-xs text-[oklch(0.3_0.02_255)] border border-b-0 border-[oklch(0.88_0.01_80)] flex items-center gap-2 max-w-xs">
                <Globe size={11} className="text-[oklch(0.5_0.02_255)] flex-shrink-0" />
                <span className="truncate">{currentSite}</span>
                <X size={10} className="text-[oklch(0.6_0.02_255)] flex-shrink-0 ml-2" />
              </div>
              <Plus size={12} className="text-[oklch(0.5_0.02_255)]" />
            </div>
          </div>

          {/* URL bar */}
          <div className="bg-[oklch(0.96_0.005_80)] px-3 py-2 flex items-center gap-2 border-b border-[oklch(0.9_0.01_80)]">
            <div className="flex items-center gap-1">
              <ArrowLeft size={14} className="text-[oklch(0.6_0.02_255)]" />
              <ChevronRight size={14} className="text-[oklch(0.6_0.02_255)]" />
              <RefreshCw size={14} className="text-[oklch(0.6_0.02_255)]" />
            </div>
            <div className="flex-1 flex items-center bg-white rounded-full px-3 py-1.5 border border-[oklch(0.9_0.01_80)]">
              {analysis?.status === "safe" ? (
                <Lock size={12} className="text-emerald-600 mr-2 flex-shrink-0" />
              ) : analysis?.status === "blocked" ? (
                <Shield size={12} className="text-red-500 mr-2 flex-shrink-0" />
              ) : (
                <AlertTriangle size={12} className="text-amber-500 mr-2 flex-shrink-0" />
              )}
              <span className="text-xs text-[oklch(0.3_0.02_255)] truncate">{urlInput}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-[oklch(0.6_0.02_255)]" />
              {/* Extension icon */}
              <button
                onClick={() => setExtView(extView === "popup" || extView === "scanning" || extView === "result" ? "popup" : "popup")}
                className="relative"
              >
                <img src={SHIELD_IMG} alt="FaithShield247" className="w-5 h-5 rounded object-cover" />
                {analysis && (
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                    analysis.status === "safe" ? "bg-emerald-500" : analysis.status === "caution" ? "bg-amber-500" : "bg-red-500"
                  }`} />
                )}
              </button>
              <MoreHorizontal size={14} className="text-[oklch(0.6_0.02_255)]" />
            </div>
          </div>

          {/* Browser content area with extension popup overlay */}
          <div className="relative min-h-[480px] bg-[oklch(0.98_0.005_80)]">
            {/* Simulated page content */}
            {analysis?.status === "blocked" ? (
              <div className="flex items-center justify-center h-[480px] bg-gradient-to-b from-red-50 to-white">
                <div className="text-center max-w-md px-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 flex items-center justify-center">
                    <Shield size={32} className="text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    This Site Has Been Blocked
                  </h2>
                  <p className="text-sm text-[oklch(0.5_0.02_255)] mb-4">
                    FaithShield247 has blocked access to <strong>{currentSite}</strong> because it contains content that doesn't meet your family's safety standards.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {analysis.threats.map((t, i) => (
                      <Badge key={i} className="bg-red-100 text-red-700 border-0 text-xs">{t}</Badge>
                    ))}
                  </div>
                  <p className="text-xs text-[oklch(0.6_0.02_255)] italic">
                    "Above all else, guard your heart, for everything you do flows from it." — Proverbs 4:23
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 h-[480px] overflow-hidden">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="h-4 bg-[oklch(0.92_0.01_80)] rounded w-3/4" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-full" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-5/6" />
                  <div className="h-40 bg-[oklch(0.94_0.01_80)] rounded-lg mt-4" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-full" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-4/5" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-full" />
                  <div className="h-3 bg-[oklch(0.94_0.01_80)] rounded w-2/3" />
                </div>
              </div>
            )}

            {/* Extension popup overlay */}
            <div className="absolute top-2 right-2 w-[300px] bg-white rounded-xl shadow-2xl border border-[oklch(0.88_0.01_80)] overflow-hidden z-10">
              {/* Popup header */}
              <div className="bg-[oklch(0.15_0.03_255)] px-4 py-3 flex items-center gap-2">
                <img src={SHIELD_IMG} alt="" className="w-6 h-6 rounded object-cover" />
                <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  FaithShield247
                </span>
                <div className="flex-1" />
                <div className="flex gap-1">
                  {(["popup", "whitelist", "settings"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setExtView(v)}
                      className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                        (extView === v || (v === "popup" && (extView === "scanning" || extView === "result")))
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {v === "popup" ? "Scan" : v === "whitelist" ? "Allow" : "Settings"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popup content */}
              <div className="p-4">
                {/* Scanning state */}
                {(extView === "popup" || extView === "scanning") && scanning && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-[oklch(0.72_0.12_75)] border-t-transparent animate-spin" />
                    <p className="text-sm font-medium text-[oklch(0.15_0.03_255)]">Scanning page...</p>
                    <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1">Analyzing content, links, and trackers</p>
                  </div>
                )}

                {/* Result state */}
                {(extView === "popup" || extView === "result") && !scanning && analysis && (
                  <div className="space-y-3">
                    {/* Score circle */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="oklch(0.94 0.01 80)" strokeWidth="4" />
                          <circle
                            cx="32" cy="32" r="28" fill="none"
                            stroke={analysis.score >= 80 ? "oklch(0.55 0.15 145)" : analysis.score >= 50 ? "oklch(0.72 0.15 75)" : "oklch(0.58 0.22 27)"}
                            strokeWidth="4"
                            strokeDasharray={`${(analysis.score / 100) * 175.9} 175.9`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold ${scoreColor(analysis.score)}`}>{analysis.score}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {analysis.status === "safe" ? <CheckCircle size={14} className="text-emerald-600" /> :
                           analysis.status === "caution" ? <AlertTriangle size={14} className="text-amber-500" /> :
                           <XCircle size={14} className="text-red-500" />}
                          <span className={`text-sm font-semibold ${
                            analysis.status === "safe" ? "text-emerald-600" : analysis.status === "caution" ? "text-amber-600" : "text-red-600"
                          }`}>
                            {statusLabel(analysis.status)}
                          </span>
                        </div>
                        <p className="text-xs text-[oklch(0.5_0.02_255)]">{analysis.category}</p>
                        <p className="text-[10px] text-[oklch(0.6_0.02_255)] mt-0.5">Scanned in {analysis.scanTime}</p>
                      </div>
                    </div>

                    {/* Threats */}
                    {analysis.threats.length > 0 && (
                      <div className="p-2.5 rounded-lg bg-[oklch(0.97_0.01_80)] border border-[oklch(0.92_0.01_80)]">
                        <p className="text-[10px] font-semibold text-[oklch(0.5_0.02_255)] uppercase tracking-wider mb-1.5">Concerns Detected</p>
                        <div className="space-y-1">
                          {analysis.threats.map((t, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <AlertTriangle size={10} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              <span className="text-[11px] text-[oklch(0.4_0.02_255)] leading-tight">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Details */}
                    <p className="text-[11px] text-[oklch(0.5_0.02_255)] leading-relaxed">{analysis.details}</p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1">
                      {analysis.status !== "blocked" ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs h-8 gap-1"
                          onClick={() => toast.success(`${currentSite} has been blocked`)}
                        >
                          <Shield size={12} /> Block Site
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1"
                          onClick={() => toast.info("Unblocking requires parent PIN")}
                        >
                          <CheckCircle size={12} /> Unblock
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs h-8 gap-1 border-[oklch(0.9_0.01_80)]"
                        onClick={() => toast.info("Detailed report sent to parent dashboard")}
                      >
                        <Eye size={12} /> Report
                      </Button>
                    </div>
                  </div>
                )}

                {/* Whitelist view */}
                {extView === "whitelist" && (
                  <div className="space-y-3">
                    <p className="text-xs text-[oklch(0.5_0.02_255)]">Sites always allowed through the filter:</p>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="domain.com"
                        className="flex-1 px-2.5 py-1.5 rounded-md border border-[oklch(0.9_0.01_80)] text-xs focus:outline-none focus:ring-1 focus:ring-[oklch(0.72_0.12_75/0.3)]"
                      />
                      <Button
                        size="sm"
                        className="bg-[oklch(0.18_0.06_255)] text-white text-xs h-7 px-2"
                        onClick={() => {
                          if (newDomain.trim()) {
                            setWhitelist((prev) => [...prev, { domain: newDomain.trim(), category: "Custom" }]);
                            setNewDomain("");
                            toast.success(`${newDomain} added to whitelist`);
                          }
                        }}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {whitelist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-[oklch(0.97_0.01_80)] group">
                          <CheckCircle size={11} className="text-emerald-500 flex-shrink-0" />
                          <span className="text-xs text-[oklch(0.3_0.02_255)] flex-1">{item.domain}</span>
                          <span className="text-[10px] text-[oklch(0.6_0.02_255)]">{item.category}</span>
                          <button
                            onClick={() => {
                              setWhitelist((prev) => prev.filter((_, i) => i !== idx));
                              toast("Removed from whitelist");
                            }}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings view */}
                {extView === "settings" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-xs font-medium text-[oklch(0.15_0.03_255)]">Content Filter</p>
                        <p className="text-[10px] text-[oklch(0.6_0.02_255)]">Real-time page scanning</p>
                      </div>
                      <Switch checked={filterEnabled} onCheckedChange={setFilterEnabled} />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-xs font-medium text-[oklch(0.15_0.03_255)]">Safe Search</p>
                        <p className="text-[10px] text-[oklch(0.6_0.02_255)]">Enforce on Google, Bing, etc.</p>
                      </div>
                      <Switch checked={safeSearch} onCheckedChange={setSafeSearch} />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-xs font-medium text-[oklch(0.15_0.03_255)]">Image Scanning</p>
                        <p className="text-[10px] text-[oklch(0.6_0.02_255)]">AI-powered image analysis</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <div>
                        <p className="text-xs font-medium text-[oklch(0.15_0.03_255)]">Chat Monitoring</p>
                        <p className="text-[10px] text-[oklch(0.6_0.02_255)]">Detect concerning language</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="pt-2 border-t border-[oklch(0.94_0.01_80)]">
                      <p className="text-[10px] text-[oklch(0.6_0.02_255)]">
                        Protection level: <strong>Strict</strong> · Child: Emma · v2.1.0
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Popup footer */}
              <div className="px-4 py-2 bg-[oklch(0.97_0.01_80)] border-t border-[oklch(0.92_0.01_80)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-[oklch(0.5_0.02_255)]">Protection active</span>
                </div>
                <Link href="/dashboard">
                  <span className="text-[10px] text-[oklch(0.18_0.06_255)] hover:underline cursor-pointer">
                    Open Dashboard
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { icon: Zap, title: "Real-Time Scanning", desc: "Every page is analyzed in under 0.5 seconds using our AI engine. URLs, content, images, and links are all checked against our faith-based safety database." },
            { icon: Shield, title: "Intelligent Blocking", desc: "Harmful sites are blocked instantly with a faith-affirming message. The block page includes a relevant Bible verse and explains why the content was restricted." },
            { icon: Eye, title: "Parent Visibility", desc: "Every scan, block, and override is logged and sent to the parent dashboard. Critical alerts trigger real-time push notifications to the parent's device." },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5">
              <div className="w-9 h-9 rounded-lg bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center mb-3">
                <item.icon size={18} className="text-[oklch(0.18_0.06_255)]" />
              </div>
              <h4 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h4>
              <p className="text-xs text-[oklch(0.5_0.02_255)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
