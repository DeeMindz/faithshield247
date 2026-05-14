/* FaithShield247 Dashboard — Sacred Modernism
 * Family overview, protection stats, recent alerts, daily verse
 */
import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Clock, AlertTriangle, BookOpen, TrendingDown, CheckCircle, ChevronRight, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingTour from "@/components/OnboardingTour";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const screenTimeData = [
  { day: "Mon", Emma: 2.5, Caleb: 1.8, approved: 3 },
  { day: "Tue", Emma: 3.1, Caleb: 2.2, approved: 3 },
  { day: "Wed", Emma: 1.9, Caleb: 3.0, approved: 3 },
  { day: "Thu", Emma: 2.8, Caleb: 1.5, approved: 3 },
  { day: "Fri", Emma: 4.2, Caleb: 3.8, approved: 3 },
  { day: "Sat", Emma: 5.1, Caleb: 4.5, approved: 3 },
  { day: "Sun", Emma: 2.0, Caleb: 1.2, approved: 3 },
];

const alerts = [
  { id: 1, child: "Emma", type: "Blocked Site", detail: "Attempted to access a blocked social media site", time: "2h ago", severity: "medium", icon: Shield },
  { id: 2, child: "Caleb", type: "Keyword Alert", detail: "Concerning language detected in a chat message", time: "5h ago", severity: "high", icon: AlertTriangle },
  { id: 3, child: "Emma", type: "Screen Time", detail: "Daily screen time limit reached (3 hours)", time: "Yesterday", severity: "low", icon: Clock },
  { id: 4, child: "Caleb", type: "Safe Site Approved", detail: "BibleGateway.com added to approved sites", time: "2 days ago", severity: "low", icon: CheckCircle },
];

const children = [
  { name: "Emma", age: 11, avatar: "E", screenTime: "2h 34m", limit: "3h", status: "online", blockedToday: 4, color: "oklch(0.55_0.15_255)" },
  { name: "Caleb", age: 8, avatar: "C", screenTime: "1h 12m", limit: "2h", status: "offline", blockedToday: 1, color: "oklch(0.55_0.15_145)" },
  { name: "Lily", age: 6, avatar: "L", screenTime: "0h 45m", limit: "1.5h", status: "online", blockedToday: 0, color: "oklch(0.6_0.15_75)" },
];

const statCards = [
  { label: "Sites Blocked Today", value: "47", icon: Shield, change: "-12% vs yesterday", positive: true },
  { label: "Screen Time Today", value: "4h 31m", icon: Clock, change: "+23 min vs avg", positive: false },
  { label: "Active Alerts", value: "3", icon: AlertTriangle, change: "2 need review", positive: false },
  { label: "Content Accessed", value: "128", icon: BookOpen, change: "94% faith-approved", positive: true },
];

const verse = {
  text: "Train up a child in the way he should go; even when he is old he will not depart from it.",
  ref: "Proverbs 22:6",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState("All");

  const displayChildren = useMemo(() => {
    if (!user?.children?.length) return children;
    const screenTimes = ["2h 34m", "1h 12m", "0h 45m", "3h 21m"];
    const statuses = ["online", "offline", "online", "online"] as const;
    const blocked = [4, 1, 0, 2];
    return user.children.map((c, i) => ({
      name: c.name,
      age: c.age,
      avatar: c.avatar,
      screenTime: screenTimes[i % screenTimes.length],
      limit: `${c.screenTimeLimit}h`,
      status: statuses[i % statuses.length],
      blockedToday: blocked[i % blocked.length],
      color: c.color,
    }));
  }, [user?.children]);

  return (
    <DashboardLayout title={`Welcome back, ${user?.firstName || 'Parent'}`} subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
      <div className="p-6 space-y-6">

        {/* Daily Verse */}
        <div className="verse-card rounded-xl p-4 animate-fade-up">
          <div className="flex items-start gap-3">
            <BookOpen size={18} className="text-[oklch(0.72_0.12_75)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-[oklch(0.15_0.03_255)] italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "{verse.text}"
              </p>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1 font-medium">{verse.ref}</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div data-tour="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <div key={card.label} className={`stat-card p-5 animate-fade-up-delay-${i + 1}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[oklch(0.18_0.06_255/0.07)] flex items-center justify-center">
                  <card.icon size={17} className="text-[oklch(0.18_0.06_255)]" />
                </div>
                <span className={`text-xs font-medium ${card.positive ? "text-emerald-600" : "text-amber-600"}`}>
                  {card.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-[oklch(0.15_0.03_255)] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {card.value}
              </div>
              <div className="text-xs text-[oklch(0.5_0.02_255)]">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Screen Time Chart */}
          <div className="lg:col-span-2 stat-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Weekly Screen Time
                </h3>
                <p className="text-xs text-[oklch(0.5_0.02_255)] mt-0.5">Hours per day by child</p>
              </div>
              <div className="flex gap-2">
                {["All", "Emma", "Caleb"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedChild(c)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                      selectedChild === c
                        ? "bg-[oklch(0.18_0.06_255)] text-white"
                        : "bg-[oklch(0.94_0.012_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.9_0.01_80)]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={screenTimeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="colorEmma" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.15 255)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.15 255)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCaleb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.12 75)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.72 0.12 75)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 80)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 255)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 255)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid oklch(0.9 0.01 80)", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                {(selectedChild === "All" || selectedChild === "Emma") && (
                  <Area type="monotone" dataKey="Emma" stroke="oklch(0.55 0.15 255)" strokeWidth={2} fill="url(#colorEmma)" />
                )}
                {(selectedChild === "All" || selectedChild === "Caleb") && (
                  <Area type="monotone" dataKey="Caleb" stroke="oklch(0.72 0.12 75)" strokeWidth={2} fill="url(#colorCaleb)" />
                )}
                <Area type="monotone" dataKey="approved" stroke="oklch(0.55 0.15 145)" strokeWidth={1.5} strokeDasharray="5 5" fill="none" name="Daily Limit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Children Profiles */}
          <div data-tour="children" className="stat-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Children
              </h3>
              <Link href="/profiles">
                <button className="text-xs text-[oklch(0.18_0.06_255)] hover:underline">Manage</button>
              </Link>
            </div>
            <div className="space-y-3">
              {displayChildren.map((child) => {
                const [used, total] = child.screenTime.split(" ").concat(child.limit.split(" "));
                const usedH = parseFloat(child.screenTime);
                const limitH = parseFloat(child.limit);
                const pct = Math.min((usedH / limitH) * 100, 100);
                return (
                  <div key={child.name} className="p-3 rounded-lg bg-[oklch(0.97_0.01_80)] hover:bg-[oklch(0.94_0.012_80)] transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                        style={{ background: child.color }}
                      >
                        {child.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-[oklch(0.15_0.03_255)]">{child.name}</span>
                          <span className="text-xs text-[oklch(0.5_0.02_255)]">age {child.age}</span>
                          <div className={`ml-auto w-1.5 h-1.5 rounded-full ${child.status === "online" ? "bg-emerald-400" : "bg-gray-300"}`} />
                        </div>
                        <div className="text-xs text-[oklch(0.5_0.02_255)]">{child.screenTime} of {child.limit} today</div>
                      </div>
                    </div>
                    <div className="w-full bg-[oklch(0.9_0.01_80)] rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: pct > 90 ? "oklch(0.58 0.22 27)" : pct > 70 ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.15 145)",
                        }}
                      />
                    </div>
                    {child.blockedToday > 0 && (
                      <div className="mt-1.5 flex items-center gap-1">
                        <Shield size={10} className="text-amber-500" />
                        <span className="text-[10px] text-amber-600">{child.blockedToday} blocked today</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div data-tour="alerts" className="stat-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recent Alerts
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mt-0.5">Activity requiring your attention</p>
            </div>
            <Link href="/reports">
              <Button variant="outline" size="sm" className="text-xs border-[oklch(0.9_0.01_80)] gap-1">
                View All <ChevronRight size={12} />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-[oklch(0.97_0.01_80)] transition-colors border border-transparent hover:border-[oklch(0.9_0.01_80)]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  alert.severity === "high" ? "bg-red-50" : alert.severity === "medium" ? "bg-amber-50" : "bg-emerald-50"
                }`}>
                  <alert.icon size={15} className={
                    alert.severity === "high" ? "text-red-500" : alert.severity === "medium" ? "text-amber-500" : "text-emerald-500"
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{alert.child}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      alert.severity === "high" ? "alert-badge-high" : alert.severity === "medium" ? "alert-badge-medium" : "alert-badge-low"
                    }`}>
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">{alert.detail}</p>
                </div>
                <span className="text-xs text-[oklch(0.6_0.02_255)] flex-shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div data-tour="quickactions" className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Run Filter Demo", href: "/filter-demo", icon: Zap, color: "bg-[oklch(0.18_0.06_255)] text-white" },
            { label: "Content Library", href: "/content-library", icon: BookOpen, color: "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]" },
            { label: "Child View", href: "/child-view", icon: Shield, color: "bg-emerald-600 text-white" },
            { label: "Teen Mode", href: "/teen-mode", icon: Sparkles, color: "bg-purple-600 text-white" },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <div className={`${action.color} rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer`}>
                <action.icon size={18} />
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Onboarding Tour */}
      <OnboardingTour />
    </DashboardLayout>
  );
}
