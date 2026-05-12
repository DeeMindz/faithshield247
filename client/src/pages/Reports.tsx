/* FaithShield247 Reports — Activity reports and analytics */
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Download, MessageCircle, Shield, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const weeklyBlocked = [
  { day: "Mon", blocked: 8, warnings: 3 },
  { day: "Tue", blocked: 12, warnings: 5 },
  { day: "Wed", blocked: 6, warnings: 2 },
  { day: "Thu", blocked: 15, warnings: 7 },
  { day: "Fri", blocked: 22, warnings: 9 },
  { day: "Sat", blocked: 31, warnings: 12 },
  { day: "Sun", blocked: 9, warnings: 4 },
];

const categoryBreakdown = [
  { name: "Adult Content", value: 38, color: "oklch(0.58 0.22 27)" },
  { name: "Social Media", value: 24, color: "oklch(0.72 0.12 75)" },
  { name: "Violence", value: 18, color: "oklch(0.55 0.15 255)" },
  { name: "Gambling", value: 12, color: "oklch(0.55 0.15 145)" },
  { name: "Other", value: 8, color: "oklch(0.6 0.02 255)" },
];

const conversationStarters = [
  { topic: "Why some websites are blocked", verse: "Psalm 101:3", prompt: "Ask your child: 'What do you think makes something good or harmful to look at?'" },
  { topic: "Screen time and rest", verse: "Psalm 127:2", prompt: "Discuss: 'How do you feel when you spend too long on a screen? What does rest look like for you?'" },
  { topic: "Online friendships", verse: "Proverbs 13:20", prompt: "Ask: 'Who are the people you talk to online? Are they people who make you a better person?'" },
];

const alerts = [
  { child: "Caleb", type: "Keyword Alert", detail: "Concerning language in chat", time: "5h ago", severity: "high" },
  { child: "Emma", type: "Blocked Site", detail: "Attempted social media access", time: "2h ago", severity: "medium" },
  { child: "Emma", type: "Screen Time", detail: "Daily limit reached", time: "Yesterday", severity: "low" },
];

export default function Reports() {
  return (
    <DashboardLayout title="Activity Reports" subtitle="Weekly summary and insights for your family">
      <div className="p-6 space-y-6">

        {/* Summary row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Blocked (Week)", value: "103", icon: Shield, color: "text-red-600", bg: "bg-red-50" },
            { label: "Screen Time (Week)", value: "31h 22m", icon: Clock, color: "text-[oklch(0.18_0.06_255)]", bg: "bg-[oklch(0.18_0.06_255/0.07)]" },
            { label: "Alerts This Week", value: "8", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Faith Content Viewed", value: "42 items", icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="stat-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <div className="text-xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div className="text-xs text-[oklch(0.5_0.02_255)]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Blocked chart */}
          <div className="lg:col-span-2 stat-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Weekly Blocked Content
              </h3>
              <Button variant="outline" size="sm" className="text-xs gap-1 border-[oklch(0.9_0.01_80)]" onClick={() => toast.info("Report exported — PDF download in full version")}>
                <Download size={12} /> Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyBlocked} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 80)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "oklch(0.5 0.02 255)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.02 255)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "white", border: "1px solid oklch(0.9 0.01 80)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Bar dataKey="blocked" fill="oklch(0.58 0.22 27)" radius={[4, 4, 0, 0]} name="Blocked" />
                <Bar dataKey="warnings" fill="oklch(0.72 0.12 75)" radius={[4, 4, 0, 0]} name="Warnings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category breakdown */}
          <div className="stat-card p-6">
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              By Category
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-[oklch(0.4_0.02_255)] flex-1">{cat.name}</span>
                  <span className="font-medium text-[oklch(0.15_0.03_255)]">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="stat-card p-6">
          <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Alerts Requiring Attention
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[oklch(0.97_0.01_80)] border border-[oklch(0.9_0.01_80)]">
                <div className={`w-2 h-8 rounded-full flex-shrink-0 ${alert.severity === "high" ? "bg-red-500" : alert.severity === "medium" ? "bg-amber-500" : "bg-emerald-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{alert.child}</span>
                    <Badge className={`text-[10px] border ${alert.severity === "high" ? "alert-badge-high" : alert.severity === "medium" ? "alert-badge-medium" : "alert-badge-low"}`}>
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_255)] mt-0.5">{alert.detail}</p>
                </div>
                <span className="text-xs text-[oklch(0.6_0.02_255)]">{alert.time}</span>
                <Button size="sm" variant="outline" className="text-xs border-[oklch(0.9_0.01_80)]" onClick={() => toast.success("Alert reviewed")}>
                  Review
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation starters */}
        <div className="stat-card p-6">
          <h3 className="font-semibold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Faith-Based Conversation Starters
          </h3>
          <p className="text-sm text-[oklch(0.5_0.02_255)] mb-4">Use this week's activity to open meaningful conversations with your children.</p>
          <div className="space-y-3">
            {conversationStarters.map((cs, i) => (
              <div key={i} className="verse-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[oklch(0.18_0.06_255)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[oklch(0.15_0.03_255)]">{cs.topic}</span>
                      <Badge className="bg-[oklch(0.72_0.12_75/0.15)] text-[oklch(0.5_0.08_75)] border-[oklch(0.72_0.12_75/0.3)] text-[10px]">{cs.verse}</Badge>
                    </div>
                    <p className="text-xs text-[oklch(0.4_0.02_255)] italic">{cs.prompt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
