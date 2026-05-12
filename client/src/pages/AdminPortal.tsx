/* FaithShield247 Church/School Admin Portal — Sacred Modernism
 * Distinct admin interface: group subscriptions, aggregate analytics, curriculum distribution
 * Deep navy + gold palette, Playfair Display headings
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  Church, Users, BookOpen, BarChart3, CreditCard, Send, Search,
  ChevronRight, ArrowLeft, Download, Plus, CheckCircle, Clock,
  AlertTriangle, TrendingUp, Shield, Eye, Trash2, Mail, Settings,
  GraduationCap, FileText, Play, Star, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SHIELD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-logo-A4Lo5NmYbnLa97AHWfiJdy.webp";

type AdminTab = "overview" | "members" | "subscriptions" | "curriculum" | "analytics" | "settings";

/* ─── Mock Data ─── */
const orgInfo = {
  name: "Grace Community Church",
  type: "Church",
  plan: "Church Premium",
  seats: 150,
  usedSeats: 87,
  monthlyRate: "$2.50/family/month",
  nextBilling: "April 1, 2026",
  totalSpend: "$217.50/month",
};

const members = [
  { id: 1, family: "The Johnsons", email: "johnson@email.com", children: 3, status: "active", joined: "Jan 2026", lastActive: "Today", protection: 94 },
  { id: 2, family: "The Williams", email: "williams@email.com", children: 2, status: "active", joined: "Feb 2026", lastActive: "Yesterday", protection: 88 },
  { id: 3, family: "The Davis Family", email: "davis@email.com", children: 4, status: "active", joined: "Jan 2026", lastActive: "Today", protection: 97 },
  { id: 4, family: "The Martinez Family", email: "martinez@email.com", children: 1, status: "active", joined: "Mar 2026", lastActive: "2 days ago", protection: 91 },
  { id: 5, family: "The Thompson Family", email: "thompson@email.com", children: 2, status: "pending", joined: "Mar 2026", lastActive: "—", protection: 0 },
  { id: 6, family: "The Anderson Family", email: "anderson@email.com", children: 3, status: "active", joined: "Feb 2026", lastActive: "Today", protection: 85 },
  { id: 7, family: "The Taylor Family", email: "taylor@email.com", children: 2, status: "inactive", joined: "Jan 2026", lastActive: "2 weeks ago", protection: 72 },
  { id: 8, family: "The Wilson Family", email: "wilson@email.com", children: 1, status: "active", joined: "Mar 2026", lastActive: "Today", protection: 96 },
];

const curriculumItems = [
  { id: 1, title: "Digital Discipleship: Week 1 — Guarding Your Eyes", type: "lesson", duration: "45 min", assigned: 62, completed: 48, category: "Foundation" },
  { id: 2, title: "Family Devotional: Screen Time & Sabbath Rest", type: "devotional", duration: "20 min", assigned: 87, completed: 71, category: "Family" },
  { id: 3, title: "Teen Workshop: Identity in Christ vs. Social Media", type: "workshop", duration: "60 min", assigned: 34, completed: 22, category: "Youth" },
  { id: 4, title: "Parent Guide: Having the Online Safety Conversation", type: "guide", duration: "15 min read", assigned: 87, completed: 55, category: "Parents" },
  { id: 5, title: "Kids Activity: The Armor of God — Digital Edition", type: "activity", duration: "30 min", assigned: 45, completed: 38, category: "Children" },
  { id: 6, title: "Family Movie Night: Discussion Guide — The Social Dilemma", type: "guide", duration: "10 min read", assigned: 87, completed: 29, category: "Family" },
];

const aggregateStats = {
  totalChildren: 156,
  avgScreenTime: "2h 15m",
  totalBlocked: 1247,
  avgProtection: 91,
  devotionalCompletion: 78,
  weeklyTrend: "+12%",
};

const weeklyData = [
  { week: "Feb 24", blocked: 280, screenTime: 2.4, devotional: 72 },
  { week: "Mar 3", blocked: 312, screenTime: 2.3, devotional: 74 },
  { week: "Mar 10", blocked: 267, screenTime: 2.1, devotional: 78 },
  { week: "Mar 17", blocked: 234, screenTime: 2.0, devotional: 82 },
  { week: "Mar 24", blocked: 154, screenTime: 1.9, devotional: 85 },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [memberFilter, setMemberFilter] = useState<"all" | "active" | "pending" | "inactive">("all");

  const tabs: { id: AdminTab; label: string; icon: typeof Church }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "members", label: "Members", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "curriculum", label: "Curriculum", icon: GraduationCap },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const filteredMembers = members.filter((m) => {
    if (memberFilter !== "all" && m.status !== memberFilter) return false;
    if (searchQuery && !m.family.toLowerCase().includes(searchQuery.toLowerCase()) && !m.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_80)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Admin Header */}
      <header className="bg-[oklch(0.15_0.03_255)] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <button className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-8 rounded-lg object-cover" />
          <div className="flex-1">
            <h1 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              FaithShield247 <span className="text-[oklch(0.72_0.12_75)]">Admin Portal</span>
            </h1>
            <p className="text-xs text-white/50">{orgInfo.name} · {orgInfo.type}</p>
          </div>
          <Badge className="bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-xs">
            {orgInfo.plan}
          </Badge>
        </div>

        {/* Tab navigation */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "text-[oklch(0.72_0.12_75)] border-[oklch(0.72_0.12_75)]"
                    : "text-white/50 border-transparent hover:text-white/70"
                }`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* ─── OVERVIEW TAB ─── */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-up">
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Families", value: orgInfo.usedSeats.toString(), sub: `of ${orgInfo.seats} seats`, icon: Users, color: "text-[oklch(0.18_0.06_255)]" },
                { label: "Children Protected", value: aggregateStats.totalChildren.toString(), sub: aggregateStats.weeklyTrend + " this month", icon: Shield, color: "text-emerald-600" },
                { label: "Avg Screen Time", value: aggregateStats.avgScreenTime, sub: "per child/day", icon: Clock, color: "text-blue-600" },
                { label: "Sites Blocked", value: aggregateStats.totalBlocked.toLocaleString(), sub: "this month", icon: AlertTriangle, color: "text-amber-600" },
                { label: "Avg Protection", value: aggregateStats.avgProtection + "%", sub: "across families", icon: Shield, color: "text-[oklch(0.72_0.12_75)]" },
                { label: "Devotional Rate", value: aggregateStats.devotionalCompletion + "%", sub: "completion", icon: BookOpen, color: "text-purple-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={14} className={stat.color} />
                    <span className="text-xs text-[oklch(0.5_0.02_255)]">{stat.label}</span>
                  </div>
                  <p className="text-xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-[oklch(0.6_0.02_255)] mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Weekly trend chart (simplified bar chart) */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-6">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Weekly Protection Trends
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mb-4">Blocked content and devotional engagement across your congregation</p>
              <div className="flex items-end gap-3 h-40">
                {weeklyData.map((w) => (
                  <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end h-28">
                      <div
                        className="flex-1 bg-amber-400/80 rounded-t-md transition-all"
                        style={{ height: `${(w.blocked / 350) * 100}%` }}
                        title={`${w.blocked} blocked`}
                      />
                      <div
                        className="flex-1 bg-emerald-500/80 rounded-t-md transition-all"
                        style={{ height: `${w.devotional}%` }}
                        title={`${w.devotional}% devotional`}
                      />
                    </div>
                    <span className="text-[10px] text-[oklch(0.5_0.02_255)]">{w.week}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[oklch(0.94_0.01_80)]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-amber-400/80" />
                  <span className="text-xs text-[oklch(0.5_0.02_255)]">Blocked Content</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
                  <span className="text-xs text-[oklch(0.5_0.02_255)]">Devotional Completion %</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Invite Families", icon: Send, action: () => setActiveTab("members") },
                { label: "Assign Curriculum", icon: GraduationCap, action: () => setActiveTab("curriculum") },
                { label: "Export Report", icon: Download, action: () => toast.success("Report exported as PDF") },
                { label: "View Analytics", icon: BarChart3, action: () => setActiveTab("analytics") },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.action}
                  className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-4 flex items-center gap-3 hover:border-[oklch(0.72_0.12_75)] hover:shadow-sm transition-all text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center">
                    <a.icon size={16} className="text-[oklch(0.18_0.06_255)]" />
                  </div>
                  <span className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── MEMBERS TAB ─── */}
        {activeTab === "members" && (
          <div className="space-y-5 animate-fade-up">
            {/* Invite bar */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Invite Families
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="family@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]"
                />
                <Button
                  onClick={() => { toast.success(`Invitation sent to ${inviteEmail || "family"}`); setInviteEmail(""); }}
                  className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white gap-2"
                >
                  <Send size={14} /> Send Invite
                </Button>
              </div>
              <p className="text-xs text-[oklch(0.6_0.02_255)] mt-2">
                {orgInfo.seats - orgInfo.usedSeats} seats remaining on your plan. Families will receive an email with setup instructions.
              </p>
            </div>

            {/* Search and filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.6_0.02_255)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search families..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]"
                />
              </div>
              <div className="flex gap-1">
                {(["all", "active", "pending", "inactive"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setMemberFilter(f)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                      memberFilter === f
                        ? "bg-[oklch(0.18_0.06_255)] text-white"
                        : "bg-white border border-[oklch(0.9_0.01_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Member table */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[oklch(0.94_0.01_80)] bg-[oklch(0.98_0.005_80)]">
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Family</th>
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Children</th>
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Status</th>
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Protection</th>
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Last Active</th>
                      <th className="text-left text-xs font-medium text-[oklch(0.5_0.02_255)] px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="border-b border-[oklch(0.96_0.005_80)] hover:bg-[oklch(0.98_0.005_80)] transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{m.family}</p>
                            <p className="text-xs text-[oklch(0.6_0.02_255)]">{m.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[oklch(0.3_0.02_255)]">{m.children}</td>
                        <td className="px-4 py-3">
                          <Badge className={`text-[10px] border-0 ${
                            m.status === "active" ? "bg-emerald-100 text-emerald-700" :
                            m.status === "pending" ? "bg-amber-100 text-amber-700" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {m.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {m.protection > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-[oklch(0.92_0.01_80)] rounded-full">
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${m.protection}%`,
                                    background: m.protection > 90 ? "oklch(0.55 0.15 145)" : m.protection > 80 ? "oklch(0.72 0.12 75)" : "oklch(0.58 0.22 27)",
                                  }}
                                />
                              </div>
                              <span className="text-xs text-[oklch(0.5_0.02_255)]">{m.protection}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-[oklch(0.6_0.02_255)]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-[oklch(0.5_0.02_255)]">{m.lastActive}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => toast.info(`Viewing ${m.family} details`)} className="p-1.5 rounded-md hover:bg-[oklch(0.94_0.01_80)] text-[oklch(0.5_0.02_255)] transition-colors">
                              <Eye size={14} />
                            </button>
                            <button onClick={() => toast.info(`Emailing ${m.family}`)} className="p-1.5 rounded-md hover:bg-[oklch(0.94_0.01_80)] text-[oklch(0.5_0.02_255)] transition-colors">
                              <Mail size={14} />
                            </button>
                            <button onClick={() => toast.error(`Removed ${m.family}`)} className="p-1.5 rounded-md hover:bg-red-50 text-[oklch(0.5_0.02_255)] hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t border-[oklch(0.94_0.01_80)] bg-[oklch(0.98_0.005_80)] flex items-center justify-between">
                <span className="text-xs text-[oklch(0.5_0.02_255)]">{filteredMembers.length} families shown</span>
                <Button variant="outline" size="sm" className="text-xs gap-1.5 border-[oklch(0.9_0.01_80)]" onClick={() => toast.success("Member list exported")}>
                  <Download size={12} /> Export CSV
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ─── SUBSCRIPTIONS TAB ─── */}
        {activeTab === "subscriptions" && (
          <div className="space-y-5 animate-fade-up">
            {/* Current plan */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {orgInfo.plan}
                  </h3>
                  <p className="text-sm text-[oklch(0.5_0.02_255)]">{orgInfo.monthlyRate} · Billed monthly</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0">Active</Badge>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[oklch(0.97_0.01_80)]">
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">Seats Used</p>
                  <p className="text-lg font-bold text-[oklch(0.15_0.03_255)]">{orgInfo.usedSeats} / {orgInfo.seats}</p>
                  <Progress value={(orgInfo.usedSeats / orgInfo.seats) * 100} className="mt-2 h-1.5" />
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.97_0.01_80)]">
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">Monthly Total</p>
                  <p className="text-lg font-bold text-[oklch(0.15_0.03_255)]">{orgInfo.totalSpend}</p>
                </div>
                <div className="p-3 rounded-lg bg-[oklch(0.97_0.01_80)]">
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">Next Billing</p>
                  <p className="text-lg font-bold text-[oklch(0.15_0.03_255)]">{orgInfo.nextBilling}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white text-sm gap-2" onClick={() => toast.info("Upgrade flow — coming in full version")}>
                  <Plus size={14} /> Add More Seats
                </Button>
                <Button variant="outline" className="text-sm border-[oklch(0.9_0.01_80)]" onClick={() => toast.info("Billing management — coming in full version")}>
                  Manage Billing
                </Button>
              </div>
            </div>

            {/* Plan comparison */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-6">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Available Plans
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Church Starter", price: "$3.00", per: "/family/month", seats: "Up to 50 families", features: ["Basic content filtering", "Parental dashboard", "Weekly reports", "Email support"] },
                  { name: "Church Premium", price: "$2.50", per: "/family/month", seats: "Up to 200 families", features: ["AI-powered filtering", "Full content library", "Curriculum distribution", "Anti-grooming alerts", "Priority support"], current: true },
                  { name: "School District", price: "$2.00", per: "/student/month", seats: "Unlimited", features: ["Everything in Premium", "LMS integration", "Custom curriculum builder", "Admin API access", "Dedicated account manager"] },
                ].map((plan) => (
                  <div key={plan.name} className={`rounded-xl border p-5 ${plan.current ? "border-[oklch(0.72_0.12_75)] bg-[oklch(0.72_0.12_75/0.03)]" : "border-[oklch(0.92_0.01_80)]"}`}>
                    {plan.current && <Badge className="bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-[10px] mb-2">Current Plan</Badge>}
                    <h4 className="text-base font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>{plan.name}</h4>
                    <div className="flex items-baseline gap-0.5 mt-1 mb-2">
                      <span className="text-2xl font-bold text-[oklch(0.15_0.03_255)]">{plan.price}</span>
                      <span className="text-xs text-[oklch(0.5_0.02_255)]">{plan.per}</span>
                    </div>
                    <p className="text-xs text-[oklch(0.5_0.02_255)] mb-3">{plan.seats}</p>
                    <ul className="space-y-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-[oklch(0.3_0.02_255)]">
                          <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <Button variant="outline" size="sm" className="w-full mt-4 text-xs border-[oklch(0.9_0.01_80)]" onClick={() => toast.info("Plan upgrade — coming in full version")}>
                        Upgrade
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── CURRICULUM TAB ─── */}
        {activeTab === "curriculum" && (
          <div className="space-y-5 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Digital Discipleship Curriculum
                </h3>
                <p className="text-sm text-[oklch(0.5_0.02_255)]">Assign faith-based content and track completion across your congregation</p>
              </div>
              <Button className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white text-sm gap-2" onClick={() => toast.info("Custom curriculum builder — coming in full version")}>
                <Plus size={14} /> Create Lesson
              </Button>
            </div>

            <div className="space-y-3">
              {curriculumItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5 hover:border-[oklch(0.72_0.12_75/0.3)] transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === "lesson" ? "bg-blue-100 text-blue-600" :
                      item.type === "devotional" ? "bg-emerald-100 text-emerald-600" :
                      item.type === "workshop" ? "bg-purple-100 text-purple-600" :
                      item.type === "activity" ? "bg-amber-100 text-amber-600" :
                      "bg-[oklch(0.94_0.01_80)] text-[oklch(0.5_0.02_255)]"
                    }`}>
                      {item.type === "lesson" ? <BookOpen size={18} /> :
                       item.type === "devotional" ? <Star size={18} /> :
                       item.type === "workshop" ? <Users size={18} /> :
                       item.type === "activity" ? <Play size={18} /> :
                       <FileText size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{item.title}</h4>
                        <Badge className="bg-[oklch(0.94_0.01_80)] text-[oklch(0.5_0.02_255)] border-0 text-[10px]">{item.category}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[oklch(0.5_0.02_255)]">
                        <span className="capitalize">{item.type}</span>
                        <span>·</span>
                        <span>{item.duration}</span>
                        <span>·</span>
                        <span>{item.assigned} assigned</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-1.5 bg-[oklch(0.92_0.01_80)] rounded-full max-w-xs">
                          <div
                            className="h-1.5 rounded-full bg-emerald-500"
                            style={{ width: `${(item.completed / item.assigned) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-[oklch(0.5_0.02_255)]">
                          {item.completed}/{item.assigned} completed ({Math.round((item.completed / item.assigned) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="text-xs border-[oklch(0.9_0.01_80)] gap-1" onClick={() => toast.success(`Sending "${item.title}" to all families`)}>
                        <Send size={12} /> Assign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── ANALYTICS TAB ─── */}
        {activeTab === "analytics" && (
          <div className="space-y-5 animate-fade-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Congregation Analytics
                </h3>
                <p className="text-sm text-[oklch(0.5_0.02_255)]">Anonymised, aggregate data — no individual family data is exposed</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs border-[oklch(0.9_0.01_80)] gap-1.5" onClick={() => toast.success("Analytics report exported")}>
                <Download size={12} /> Export PDF
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Top blocked categories */}
              <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5">
                <h4 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Top Blocked Categories
                </h4>
                <div className="space-y-3">
                  {[
                    { category: "Social Media", count: 487, pct: 39 },
                    { category: "Adult Content", count: 312, pct: 25 },
                    { category: "Violence/Gore", count: 198, pct: 16 },
                    { category: "Gambling", count: 124, pct: 10 },
                    { category: "Other", count: 126, pct: 10 },
                  ].map((cat) => (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[oklch(0.3_0.02_255)]">{cat.category}</span>
                        <span className="text-xs text-[oklch(0.5_0.02_255)]">{cat.count} ({cat.pct}%)</span>
                      </div>
                      <div className="h-2 bg-[oklch(0.94_0.01_80)] rounded-full">
                        <div className="h-2 rounded-full bg-[oklch(0.18_0.06_255)]" style={{ width: `${cat.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement metrics */}
              <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5">
                <h4 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Faith Engagement Metrics
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Daily Devotional Completion", value: "78%", trend: "+6%", color: "emerald" },
                    { label: "Journal Entries This Week", value: "342", trend: "+18%", color: "blue" },
                    { label: "Curriculum Progress", value: "64%", trend: "+8%", color: "purple" },
                    { label: "Accountability Partner Adoption", value: "45%", trend: "+12%", color: "amber" },
                    { label: "Average Family Protection Score", value: "91%", trend: "+3%", color: "emerald" },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between py-2 border-b border-[oklch(0.96_0.005_80)] last:border-0">
                      <span className="text-sm text-[oklch(0.3_0.02_255)]">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[oklch(0.15_0.03_255)]">{metric.value}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{metric.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conversation starters */}
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-5">
              <h4 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Suggested Sermon & Small Group Topics
              </h4>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mb-4">Based on your congregation's digital activity patterns this month</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { topic: "Social Media & Self-Worth", reason: "487 social media blocks — teens seeking validation online" },
                  { topic: "Guarding Your Eyes in a Digital World", reason: "312 adult content blocks — an ongoing challenge for families" },
                  { topic: "Sabbath Rest from Screens", reason: "Average screen time is 2h 15m/day — opportunity for digital fasting" },
                ].map((s) => (
                  <div key={s.topic} className="p-4 rounded-lg bg-[oklch(0.97_0.01_80)] border border-[oklch(0.92_0.01_80)]">
                    <p className="text-sm font-medium text-[oklch(0.15_0.03_255)] mb-1">{s.topic}</p>
                    <p className="text-xs text-[oklch(0.5_0.02_255)] leading-relaxed">{s.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── SETTINGS TAB ─── */}
        {activeTab === "settings" && (
          <div className="space-y-5 animate-fade-up max-w-2xl">
            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-6">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Organization Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[oklch(0.5_0.02_255)] mb-1 block">Organization Name</label>
                  <input defaultValue={orgInfo.name} className="w-full px-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]" />
                </div>
                <div>
                  <label className="text-xs font-medium text-[oklch(0.5_0.02_255)] mb-1 block">Organization Type</label>
                  <select defaultValue="church" className="w-full px-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)] bg-white">
                    <option value="church">Church</option>
                    <option value="school">School</option>
                    <option value="ministry">Ministry</option>
                    <option value="homeschool">Homeschool Co-op</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[oklch(0.5_0.02_255)] mb-1 block">Admin Email</label>
                  <input defaultValue="admin@gracecommunity.org" className="w-full px-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]" />
                </div>
              </div>
              <Button className="mt-4 bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white text-sm" onClick={() => toast.success("Settings saved")}>
                Save Changes
              </Button>
            </div>

            <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-6">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Default Family Settings
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mb-4">These defaults apply to all new families when they join your organization.</p>
              <div className="space-y-3">
                {[
                  { label: "Auto-enable strict filtering for new families", default: true },
                  { label: "Require accountability partner setup", default: false },
                  { label: "Auto-assign welcome curriculum", default: true },
                  { label: "Send weekly report to admin", default: true },
                  { label: "Enable Teen Mode for 13+ children", default: true },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)] last:border-0">
                    <span className="text-sm text-[oklch(0.3_0.02_255)]">{s.label}</span>
                    <Switch defaultChecked={s.default} onCheckedChange={(v) => toast.success(`${s.label} ${v ? "enabled" : "disabled"}`)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
