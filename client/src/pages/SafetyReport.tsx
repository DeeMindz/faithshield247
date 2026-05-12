/* FaithShield247 Safety Report — Sacred Modernism
 * Downloadable PDF-style report with protection scores, activity summaries, faith engagement
 * Uses window.print() for clean PDF generation via browser
 */
import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Download, Mail, Calendar, Shield, Clock, AlertTriangle, BookOpen,
  CheckCircle, TrendingUp, TrendingDown, Users, Printer, Eye,
  ChevronRight, Star, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SHIELD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-logo-A4Lo5NmYbnLa97AHWfiJdy.webp";

type ReportPeriod = "weekly" | "monthly";

/* ─── Report Data ─── */
const weeklyData = {
  period: "March 19 – March 25, 2026",
  overallScore: 91,
  scoreTrend: +3,
  totalScreenTime: "18h 42m",
  avgDailyScreenTime: "2h 40m",
  screenTimeTrend: -8,
  sitesBlocked: 47,
  blockedTrend: -12,
  devotionalsCompleted: 12,
  devotionalTrend: +18,
  journalEntries: 5,
  contentWatched: "4h 15m",
  children: [
    { name: "Emma", age: 11, score: 88, screenTime: "2h 54m/day", blocked: 22, devotionals: 5, topSites: ["KhanAcademy.org", "BibleGateway.com", "YouTube (filtered)"], concerns: ["Attempted TikTok access (3x)", "Search: 'hide browsing history'"], positives: ["Completed 5/7 devotionals", "Bible reading streak: 12 days"] },
    { name: "Caleb", age: 8, score: 94, screenTime: "1h 48m/day", blocked: 15, devotionals: 4, topSites: ["BibleGateway.com", "YouVersion.com", "PBS Kids"], concerns: ["Attempted Instagram access (1x)"], positives: ["Started devotional journal", "100% approved content this week"] },
    { name: "Lily", age: 6, score: 97, screenTime: "0h 52m/day", blocked: 0, devotionals: 3, topSites: ["KhanAcademy.org", "FocusOnTheFamily.com"], concerns: [], positives: ["All content pre-approved", "Completed Noah's Ark puzzle game", "Under screen time limit every day"] },
  ],
  topBlockedCategories: [
    { category: "Social Media", count: 24, pct: 51 },
    { category: "Video Streaming (unfiltered)", count: 12, pct: 26 },
    { category: "Gaming Sites", count: 7, pct: 15 },
    { category: "Other", count: 4, pct: 8 },
  ],
  faithEngagement: [
    { metric: "Daily Devotional Completion", value: "86%", trend: "+12%" },
    { metric: "Journal Entries Written", value: "5", trend: "+2" },
    { metric: "Scripture Reading Time", value: "2h 10m", trend: "+25min" },
    { metric: "Faith Content Watched", value: "4h 15m", trend: "+45min" },
    { metric: "Prayer Time Logged", value: "1h 30m", trend: "+15min" },
  ],
  conversationStarters: [
    { topic: "Why did you try to access TikTok?", context: "Emma attempted to visit TikTok 3 times this week. This could be a good opportunity to discuss social media pressures and why certain platforms are restricted." },
    { topic: "What did you learn from David and Goliath?", context: "Caleb watched the David and Goliath story twice. Ask what courage means to him and how he can be brave in his own life." },
    { topic: "Let's celebrate Lily's perfect week!", context: "Lily had zero blocked attempts and stayed under her screen time limit every day. Positive reinforcement builds healthy digital habits." },
  ],
};

const monthlyData = {
  ...weeklyData,
  period: "March 1 – March 25, 2026",
  overallScore: 89,
  scoreTrend: +5,
  totalScreenTime: "72h 18m",
  avgDailyScreenTime: "2h 53m",
  screenTimeTrend: -5,
  sitesBlocked: 187,
  blockedTrend: -18,
  devotionalsCompleted: 48,
  devotionalTrend: +22,
  journalEntries: 19,
  contentWatched: "16h 40m",
};

export default function SafetyReport() {
  const [period, setPeriod] = useState<ReportPeriod>("weekly");
  const reportRef = useRef<HTMLDivElement>(null);

  const data = period === "weekly" ? weeklyData : monthlyData;

  const handlePrint = () => {
    // Create a new window with just the report content for clean PDF
    const printContent = reportRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to download the report");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>FaithShield247 Safety Report — ${data.period}</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'DM Sans', sans-serif; color: #1a1a2e; background: white; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1, h2, h3 { font-family: 'Playfair Display', serif; }
          .header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #c9a84c; }
          .header img { width: 48px; height: 48px; border-radius: 8px; }
          .header h1 { font-size: 24px; color: #1a1a2e; }
          .header p { font-size: 12px; color: #666; }
          .score-box { text-align: center; padding: 24px; background: #f8f6f0; border-radius: 12px; margin-bottom: 24px; }
          .score-box .score { font-size: 56px; font-weight: 700; color: #1a1a2e; font-family: 'Playfair Display', serif; }
          .score-box .label { font-size: 14px; color: #666; margin-top: 4px; }
          .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .stat { padding: 16px; background: #f8f6f0; border-radius: 8px; text-align: center; }
          .stat .value { font-size: 20px; font-weight: 700; color: #1a1a2e; font-family: 'Playfair Display', serif; }
          .stat .label { font-size: 11px; color: #666; margin-top: 2px; }
          .stat .trend { font-size: 10px; margin-top: 4px; }
          .trend-up { color: #16a34a; }
          .trend-down { color: #dc2626; }
          .section { margin-bottom: 28px; }
          .section h2 { font-size: 16px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }
          .child-card { padding: 16px; background: #f8f6f0; border-radius: 8px; margin-bottom: 12px; }
          .child-card h3 { font-size: 14px; margin-bottom: 8px; }
          .child-card .detail { font-size: 12px; color: #444; line-height: 1.6; }
          .child-card .concern { color: #dc2626; font-size: 11px; }
          .child-card .positive { color: #16a34a; font-size: 11px; }
          .bar { height: 8px; background: #e5e5e5; border-radius: 4px; margin: 4px 0; }
          .bar-fill { height: 8px; border-radius: 4px; background: #1a1a2e; }
          .conversation { padding: 12px; background: #fffbeb; border-left: 3px solid #c9a84c; border-radius: 0 8px 8px 0; margin-bottom: 8px; }
          .conversation .topic { font-size: 13px; font-weight: 600; color: #1a1a2e; margin-bottom: 4px; }
          .conversation .context { font-size: 11px; color: #666; line-height: 1.5; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 2px solid #c9a84c; text-align: center; font-size: 11px; color: #999; }
          .footer .verse { font-style: italic; font-family: 'Playfair Display', serif; color: #666; margin-bottom: 8px; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { text-align: left; padding: 8px; background: #f0f0f0; font-size: 11px; color: #666; }
          td { padding: 8px; border-bottom: 1px solid #eee; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="${SHIELD_IMG}" alt="FaithShield247" />
          <div>
            <h1>FaithShield247 Safety Report</h1>
            <p>${period === "weekly" ? "Weekly" : "Monthly"} Report · ${data.period}</p>
          </div>
        </div>

        <div class="score-box">
          <div class="score">${data.overallScore}</div>
          <div class="label">Family Protection Score (${data.scoreTrend > 0 ? "+" : ""}${data.scoreTrend}% from last ${period === "weekly" ? "week" : "month"})</div>
        </div>

        <div class="stats-grid">
          <div class="stat">
            <div class="value">${data.avgDailyScreenTime}</div>
            <div class="label">Avg Daily Screen Time</div>
            <div class="trend ${data.screenTimeTrend < 0 ? "trend-up" : "trend-down"}">${data.screenTimeTrend}% vs prior</div>
          </div>
          <div class="stat">
            <div class="value">${data.sitesBlocked}</div>
            <div class="label">Sites Blocked</div>
            <div class="trend ${data.blockedTrend < 0 ? "trend-up" : "trend-down"}">${data.blockedTrend}% vs prior</div>
          </div>
          <div class="stat">
            <div class="value">${data.devotionalsCompleted}</div>
            <div class="label">Devotionals Done</div>
            <div class="trend trend-up">+${data.devotionalTrend}% vs prior</div>
          </div>
          <div class="stat">
            <div class="value">${data.contentWatched}</div>
            <div class="label">Faith Content</div>
            <div class="trend trend-up">Growing</div>
          </div>
        </div>

        <div class="section">
          <h2>Per-Child Summary</h2>
          ${data.children.map((c) => `
            <div class="child-card">
              <h3>${c.name} (Age ${c.age}) — Protection Score: ${c.score}/100</h3>
              <div class="detail">
                <strong>Screen Time:</strong> ${c.screenTime} avg · <strong>Blocked:</strong> ${c.blocked} sites · <strong>Devotionals:</strong> ${c.devotionals} completed<br/>
                <strong>Top Sites:</strong> ${c.topSites.join(", ")}
              </div>
              ${c.concerns.length > 0 ? `<div class="concern" style="margin-top:6px">⚠ Concerns: ${c.concerns.join(" · ")}</div>` : ""}
              ${c.positives.length > 0 ? `<div class="positive" style="margin-top:4px">✓ Positives: ${c.positives.join(" · ")}</div>` : ""}
            </div>
          `).join("")}
        </div>

        <div class="section">
          <h2>Blocked Content Categories</h2>
          ${data.topBlockedCategories.map((cat) => `
            <div style="margin-bottom:8px">
              <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px">
                <span>${cat.category}</span><span>${cat.count} (${cat.pct}%)</span>
              </div>
              <div class="bar"><div class="bar-fill" style="width:${cat.pct}%"></div></div>
            </div>
          `).join("")}
        </div>

        <div class="section">
          <h2>Faith Engagement</h2>
          <table>
            <thead><tr><th>Metric</th><th>Value</th><th>Trend</th></tr></thead>
            <tbody>
              ${data.faithEngagement.map((m) => `<tr><td>${m.metric}</td><td><strong>${m.value}</strong></td><td style="color:#16a34a">${m.trend}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2>Conversation Starters</h2>
          <p style="font-size:11px;color:#666;margin-bottom:12px">Based on this ${period === "weekly" ? "week" : "month"}'s activity, here are suggested conversations to have with your children:</p>
          ${data.conversationStarters.map((c) => `
            <div class="conversation">
              <div class="topic">"${c.topic}"</div>
              <div class="context">${c.context}</div>
            </div>
          `).join("")}
        </div>

        <div class="footer">
          <div class="verse">"Train up a child in the way he should go; even when he is old he will not depart from it." — Proverbs 22:6</div>
          <p>Generated by FaithShield247 · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · faithshield247.com</p>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <DashboardLayout title="Safety Report" subtitle="Download or email your family's protection report">
      <div className="p-6 max-w-4xl">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Period toggle */}
          <div className="flex rounded-lg border border-[oklch(0.9_0.01_80)] overflow-hidden">
            {(["weekly", "monthly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
                  period === p
                    ? "bg-[oklch(0.18_0.06_255)] text-white"
                    : "bg-white text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[oklch(0.5_0.02_255)]">
            <Calendar size={13} />
            {data.period}
          </div>

          <div className="flex-1" />

          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[oklch(0.9_0.01_80)] gap-1.5"
            onClick={() => toast.success("Report emailed to your registered address")}
          >
            <Mail size={12} /> Email Report
          </Button>
          <Button
            size="sm"
            className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white text-xs gap-1.5"
            onClick={handlePrint}
          >
            <Download size={12} /> Download PDF
          </Button>
        </div>

        {/* Report preview */}
        <div ref={reportRef} className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] overflow-hidden shadow-sm">
          {/* Report header */}
          <div className="p-6 border-b border-[oklch(0.92_0.01_80)] bg-gradient-to-r from-[oklch(0.97_0.01_80)] to-white">
            <div className="flex items-center gap-4">
              <img src={SHIELD_IMG} alt="FaithShield247" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <h2 className="text-xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  FaithShield247 Safety Report
                </h2>
                <p className="text-sm text-[oklch(0.5_0.02_255)]">
                  {period === "weekly" ? "Weekly" : "Monthly"} Report · {data.period}
                </p>
              </div>
            </div>
          </div>

          {/* Overall score */}
          <div className="p-6 text-center border-b border-[oklch(0.92_0.01_80)]">
            <div className="inline-flex flex-col items-center">
              <div className="relative w-28 h-28 mb-3">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="oklch(0.94 0.01 80)" strokeWidth="8" />
                  <circle
                    cx="56" cy="56" r="48" fill="none"
                    stroke={data.overallScore >= 80 ? "oklch(0.55 0.15 145)" : data.overallScore >= 60 ? "oklch(0.72 0.12 75)" : "oklch(0.58 0.22 27)"}
                    strokeWidth="8"
                    strokeDasharray={`${(data.overallScore / 100) * 301.6} 301.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {data.overallScore}
                  </span>
                  <span className="text-[10px] text-[oklch(0.5_0.02_255)]">/100</span>
                </div>
              </div>
              <p className="text-sm font-semibold text-[oklch(0.15_0.03_255)]">Family Protection Score</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                <TrendingUp size={12} /> +{data.scoreTrend}% from last {period === "weekly" ? "week" : "month"}
              </p>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[oklch(0.92_0.01_80)]">
            {[
              { label: "Avg Daily Screen Time", value: data.avgDailyScreenTime, trend: `${data.screenTimeTrend}%`, positive: data.screenTimeTrend < 0, icon: Clock },
              { label: "Sites Blocked", value: data.sitesBlocked.toString(), trend: `${data.blockedTrend}%`, positive: data.blockedTrend < 0, icon: Shield },
              { label: "Devotionals Completed", value: data.devotionalsCompleted.toString(), trend: `+${data.devotionalTrend}%`, positive: true, icon: BookOpen },
              { label: "Faith Content Watched", value: data.contentWatched, trend: "Growing", positive: true, icon: Star },
            ].map((m) => (
              <div key={m.label} className="bg-white p-4 text-center">
                <m.icon size={16} className="mx-auto mb-2 text-[oklch(0.5_0.02_255)]" />
                <p className="text-lg font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {m.value}
                </p>
                <p className="text-[10px] text-[oklch(0.5_0.02_255)] mb-1">{m.label}</p>
                <span className={`text-[10px] font-medium ${m.positive ? "text-emerald-600" : "text-amber-600"}`}>
                  {m.trend}
                </span>
              </div>
            ))}
          </div>

          {/* Per-child breakdown */}
          <div className="p-6 border-t border-[oklch(0.92_0.01_80)]">
            <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Per-Child Summary
            </h3>
            <div className="space-y-4">
              {data.children.map((child) => (
                <div key={child.name} className="p-4 rounded-xl bg-[oklch(0.97_0.01_80)] border border-[oklch(0.92_0.01_80)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[oklch(0.18_0.06_255)] flex items-center justify-center text-white font-semibold text-sm">
                      {child.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[oklch(0.15_0.03_255)]">{child.name}</span>
                        <span className="text-xs text-[oklch(0.5_0.02_255)]">Age {child.age}</span>
                      </div>
                    </div>
                    <Badge className={`border-0 text-xs ${
                      child.score >= 90 ? "bg-emerald-100 text-emerald-700" :
                      child.score >= 75 ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      Score: {child.score}/100
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                    <div className="p-2 rounded-lg bg-white">
                      <p className="text-xs font-bold text-[oklch(0.15_0.03_255)]">{child.screenTime}</p>
                      <p className="text-[10px] text-[oklch(0.5_0.02_255)]">Avg/day</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white">
                      <p className="text-xs font-bold text-[oklch(0.15_0.03_255)]">{child.blocked}</p>
                      <p className="text-[10px] text-[oklch(0.5_0.02_255)]">Blocked</p>
                    </div>
                    <div className="p-2 rounded-lg bg-white">
                      <p className="text-xs font-bold text-[oklch(0.15_0.03_255)]">{child.devotionals}</p>
                      <p className="text-[10px] text-[oklch(0.5_0.02_255)]">Devotionals</p>
                    </div>
                  </div>

                  {child.concerns.length > 0 && (
                    <div className="mb-2">
                      {child.concerns.map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5 mb-1">
                          <AlertTriangle size={11} className="text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-amber-700">{c}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {child.positives.length > 0 && (
                    <div>
                      {child.positives.map((p, i) => (
                        <div key={i} className="flex items-start gap-1.5 mb-1">
                          <CheckCircle size={11} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-emerald-700">{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blocked categories */}
          <div className="p-6 border-t border-[oklch(0.92_0.01_80)]">
            <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Blocked Content Categories
            </h3>
            <div className="space-y-3">
              {data.topBlockedCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[oklch(0.3_0.02_255)]">{cat.category}</span>
                    <span className="text-xs text-[oklch(0.5_0.02_255)]">{cat.count} ({cat.pct}%)</span>
                  </div>
                  <div className="h-2 bg-[oklch(0.94_0.01_80)] rounded-full">
                    <div className="h-2 rounded-full bg-[oklch(0.18_0.06_255)]" style={{ width: `${cat.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faith engagement */}
          <div className="p-6 border-t border-[oklch(0.92_0.01_80)]">
            <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Faith Engagement Metrics
            </h3>
            <div className="space-y-2">
              {data.faithEngagement.map((m) => (
                <div key={m.metric} className="flex items-center justify-between py-2 border-b border-[oklch(0.96_0.005_80)] last:border-0">
                  <span className="text-xs text-[oklch(0.3_0.02_255)]">{m.metric}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[oklch(0.15_0.03_255)]">{m.value}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{m.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation starters */}
          <div className="p-6 border-t border-[oklch(0.92_0.01_80)]">
            <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Suggested Conversation Starters
            </h3>
            <p className="text-xs text-[oklch(0.5_0.02_255)] mb-4">Based on this {period === "weekly" ? "week" : "month"}'s activity patterns</p>
            <div className="space-y-3">
              {data.conversationStarters.map((c, i) => (
                <div key={i} className="p-4 rounded-lg bg-[oklch(0.98_0.02_75/0.3)] border-l-3 border-[oklch(0.72_0.12_75)]" style={{ borderLeft: "3px solid oklch(0.72 0.12 75)" }}>
                  <p className="text-sm font-medium text-[oklch(0.15_0.03_255)] mb-1">"{c.topic}"</p>
                  <p className="text-xs text-[oklch(0.5_0.02_255)] leading-relaxed">{c.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t-2 border-[oklch(0.72_0.12_75)] bg-[oklch(0.97_0.01_80)] text-center">
            <p className="text-sm italic text-[oklch(0.4_0.02_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              "Train up a child in the way he should go; even when he is old he will not depart from it."
            </p>
            <p className="text-xs text-[oklch(0.5_0.02_255)] mb-1">— Proverbs 22:6</p>
            <p className="text-[10px] text-[oklch(0.6_0.02_255)] mt-3">
              Generated by FaithShield247 · {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · faithshield247.com
            </p>
          </div>
        </div>

        {/* Auto-email settings */}
        <div className="mt-6 p-5 bg-white rounded-xl border border-[oklch(0.92_0.01_80)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center">
              <Mail size={16} className="text-[oklch(0.18_0.06_255)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[oklch(0.15_0.03_255)]">Automatic Email Reports</p>
              <p className="text-xs text-[oklch(0.5_0.02_255)]">Receive this report automatically every {period === "weekly" ? "Monday" : "1st of the month"}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-[oklch(0.9_0.01_80)]"
              onClick={() => toast.success(`${period === "weekly" ? "Weekly" : "Monthly"} auto-email enabled`)}
            >
              Enable Auto-Email
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
