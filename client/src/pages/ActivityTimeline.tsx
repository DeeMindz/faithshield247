/* FaithShield247 Family Activity Timeline — Sacred Modernism
 * Chronological feed of all children's actions across the family
 * Filters: child, action type, date range. Color-coded entries.
 */
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Shield, Clock, BookOpen, AlertTriangle, CheckCircle, Globe,
  Search, Filter, ChevronDown, RefreshCw, Eye, Play, MessageCircle,
  Smartphone, Wifi, X, Download, Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ─── Types ─── */
type ActionType = "blocked" | "approved" | "devotional" | "screen-time" | "keyword" | "content" | "device" | "social";

interface TimelineEvent {
  id: number;
  child: string;
  childColor: string;
  childAvatar: string;
  type: ActionType;
  title: string;
  detail: string;
  timestamp: Date;
  severity?: "low" | "medium" | "high";
  url?: string;
}

/* ─── Config ─── */
const typeConfig: Record<ActionType, { icon: typeof Shield; color: string; bg: string; label: string }> = {
  blocked:     { icon: Shield,         color: "text-red-600",     bg: "bg-red-50",     label: "Blocked" },
  approved:    { icon: CheckCircle,    color: "text-emerald-600", bg: "bg-emerald-50", label: "Approved" },
  devotional:  { icon: BookOpen,       color: "text-purple-600",  bg: "bg-purple-50",  label: "Devotional" },
  "screen-time": { icon: Clock,        color: "text-amber-600",   bg: "bg-amber-50",   label: "Screen Time" },
  keyword:     { icon: AlertTriangle,  color: "text-red-600",     bg: "bg-red-50",     label: "Keyword Alert" },
  content:     { icon: Play,           color: "text-blue-600",    bg: "bg-blue-50",    label: "Content" },
  device:      { icon: Smartphone,     color: "text-gray-600",    bg: "bg-gray-50",    label: "Device" },
  social:      { icon: MessageCircle,  color: "text-pink-600",    bg: "bg-pink-50",    label: "Social" },
};

const childrenData = [
  { name: "Emma", color: "oklch(0.55_0.15_255)", avatar: "E" },
  { name: "Caleb", color: "oklch(0.55_0.15_145)", avatar: "C" },
  { name: "Lily", color: "oklch(0.6_0.15_75)", avatar: "L" },
];

/* ─── Generate realistic timeline events ─── */
function generateEvents(): TimelineEvent[] {
  const now = new Date();
  const events: TimelineEvent[] = [
    { id: 1, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "blocked", title: "Blocked: TikTok.com", detail: "Attempted to access blocked social media platform", timestamp: new Date(now.getTime() - 5 * 60000), severity: "medium", url: "tiktok.com" },
    { id: 2, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "devotional", title: "Completed Daily Devotional", detail: "Finished 'The Armor of God' lesson — Day 4 of 7", timestamp: new Date(now.getTime() - 12 * 60000) },
    { id: 3, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "content", title: "Watched: Bible Stories for Kids", detail: "Viewed 'David and Goliath' on The Ark content library (18 min)", timestamp: new Date(now.getTime() - 25 * 60000) },
    { id: 4, child: "Lily", childColor: childrenData[2].color, childAvatar: "L", type: "approved", title: "Visited: KhanAcademy.org", detail: "Accessed math learning module — Pre-K counting exercises", timestamp: new Date(now.getTime() - 38 * 60000), url: "khanacademy.org" },
    { id: 5, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "keyword", title: "Keyword Alert Triggered", detail: "Concerning language detected in a search query: 'how to hide browsing history'", timestamp: new Date(now.getTime() - 52 * 60000), severity: "high" },
    { id: 6, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "screen-time", title: "Screen Time: 75% Used", detail: "1h 30m of 2h daily limit consumed. 30 minutes remaining.", timestamp: new Date(now.getTime() - 65 * 60000) },
    { id: 7, child: "Lily", childColor: childrenData[2].color, childAvatar: "L", type: "content", title: "Played: Noah's Ark Puzzle Game", detail: "Completed level 3 of faith-based puzzle game (12 min)", timestamp: new Date(now.getTime() - 80 * 60000) },
    { id: 8, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "blocked", title: "Blocked: Reddit.com", detail: "Attempted to access blocked social forum", timestamp: new Date(now.getTime() - 95 * 60000), severity: "medium", url: "reddit.com" },
    { id: 9, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "approved", title: "Visited: BibleGateway.com", detail: "Read John 3:16 passage — 8 minutes on page", timestamp: new Date(now.getTime() - 110 * 60000), url: "biblegateway.com" },
    { id: 10, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "social", title: "Chat Activity Detected", detail: "Messaging on approved platform — no concerning content detected", timestamp: new Date(now.getTime() - 130 * 60000) },
    { id: 11, child: "Lily", childColor: childrenData[2].color, childAvatar: "L", type: "device", title: "Device Connected", detail: "Lily's iPad connected to FaithShield247 protection", timestamp: new Date(now.getTime() - 150 * 60000) },
    { id: 12, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "devotional", title: "Started Journal Entry", detail: "Wrote in devotional journal: 'What I'm thankful for today'", timestamp: new Date(now.getTime() - 170 * 60000) },
    { id: 13, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "screen-time", title: "Screen Time Limit Reached", detail: "Daily 3-hour screen time limit reached. Device locked.", timestamp: new Date(now.getTime() - 200 * 60000), severity: "low" },
    { id: 14, child: "Lily", childColor: childrenData[2].color, childAvatar: "L", type: "approved", title: "Visited: FocusOnTheFamily.com", detail: "Browsed kids activity page — coloring sheets downloaded", timestamp: new Date(now.getTime() - 240 * 60000), url: "focusonthefamily.com" },
    { id: 15, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "blocked", title: "Blocked: Instagram.com", detail: "Attempted to access blocked social media during restricted hours", timestamp: new Date(now.getTime() - 280 * 60000), severity: "medium", url: "instagram.com" },
    { id: 16, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "content", title: "Listened: Worship Music Playlist", detail: "Played 'Kids Praise' playlist on The Ark — 35 minutes", timestamp: new Date(now.getTime() - 320 * 60000) },
    { id: 17, child: "Lily", childColor: childrenData[2].color, childAvatar: "L", type: "screen-time", title: "Screen Time: 50% Used", detail: "45m of 1.5h daily limit consumed. 45 minutes remaining.", timestamp: new Date(now.getTime() - 360 * 60000) },
    { id: 18, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "approved", title: "Visited: YouVersion.com", detail: "Completed Bible reading plan — 'Psalms for Kids' Day 12", timestamp: new Date(now.getTime() - 400 * 60000), url: "youversion.com" },
    { id: 19, child: "Emma", childColor: childrenData[0].color, childAvatar: "E", type: "device", title: "Device Disconnected", detail: "Emma's laptop disconnected from Wi-Fi — protection paused", timestamp: new Date(now.getTime() - 450 * 60000), severity: "low" },
    { id: 20, child: "Caleb", childColor: childrenData[1].color, childAvatar: "C", type: "content", title: "Watched: VeggieTales Episode", detail: "Streamed 'Larry-Boy and the Bad Apple' on The Ark (22 min)", timestamp: new Date(now.getTime() - 500 * 60000) },
  ];
  return events;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

export default function ActivityTimeline() {
  const [events] = useState<TimelineEvent[]>(generateEvents);
  const [childFilter, setChildFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<ActionType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [newEventCount, setNewEventCount] = useState(0);
  const liveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate live updates
  useEffect(() => {
    if (isLive) {
      liveRef.current = setInterval(() => {
        setNewEventCount((c) => c + 1);
      }, 20000);
    }
    return () => { if (liveRef.current) clearInterval(liveRef.current); };
  }, [isLive]);

  const filtered = events.filter((e) => {
    if (childFilter !== "all" && e.child !== childFilter) return false;
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!e.title.toLowerCase().includes(q) && !e.detail.toLowerCase().includes(q) && !e.child.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Group by relative date
  const grouped: Record<string, TimelineEvent[]> = {};
  filtered.forEach((e) => {
    const now = new Date();
    const diff = now.getTime() - e.timestamp.getTime();
    const hours = diff / 3600000;
    let label: string;
    if (hours < 1) label = "Last Hour";
    else if (hours < 3) label = "Last 3 Hours";
    else if (hours < 6) label = "Last 6 Hours";
    else label = "Earlier Today";
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(e);
  });

  const typeOptions: (ActionType | "all")[] = ["all", "blocked", "approved", "devotional", "screen-time", "keyword", "content", "device", "social"];

  return (
    <DashboardLayout title="Activity Timeline" subtitle="Real-time chronological feed of your family's digital activity">
      <div className="p-6 max-w-4xl">
        {/* Live indicator + controls */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              isLive
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
            {isLive ? "Live" : "Paused"}
          </button>

          {newEventCount > 0 && (
            <button
              onClick={() => { setNewEventCount(0); toast.info("Timeline refreshed"); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <RefreshCw size={12} />
              {newEventCount} new {newEventCount === 1 ? "event" : "events"}
            </button>
          )}

          <div className="flex-1" />

          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[oklch(0.9_0.01_80)] gap-1.5"
            onClick={() => toast.success("Timeline exported as CSV")}
          >
            <Download size={12} /> Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[oklch(0.6_0.02_255)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activity..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[oklch(0.9_0.01_80)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]"
            />
          </div>

          {/* Child filter */}
          <div className="flex gap-1">
            <button
              onClick={() => setChildFilter("all")}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                childFilter === "all"
                  ? "bg-[oklch(0.18_0.06_255)] text-white"
                  : "bg-white border border-[oklch(0.9_0.01_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
              }`}
            >
              All Kids
            </button>
            {childrenData.map((c) => (
              <button
                key={c.name}
                onClick={() => setChildFilter(c.name)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  childFilter === c.name
                    ? "bg-[oklch(0.18_0.06_255)] text-white"
                    : "bg-white border border-[oklch(0.9_0.01_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
                }`}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter pills */}
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {typeOptions.map((t) => {
            const cfg = t === "all" ? null : typeConfig[t];
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors capitalize ${
                  typeFilter === t
                    ? "bg-[oklch(0.18_0.06_255)] text-white"
                    : "bg-white border border-[oklch(0.92_0.01_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
                }`}
              >
                {t === "all" ? "All Types" : cfg?.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([label, groupEvents]) => (
            <div key={label}>
              {/* Time group header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.97_0.01_80)] border border-[oklch(0.92_0.01_80)]">
                  <Calendar size={11} className="text-[oklch(0.5_0.02_255)]" />
                  <span className="text-xs font-semibold text-[oklch(0.4_0.02_255)]">{label}</span>
                </div>
                <div className="flex-1 h-px bg-[oklch(0.92_0.01_80)]" />
                <span className="text-[10px] text-[oklch(0.6_0.02_255)]">{groupEvents.length} events</span>
              </div>

              {/* Events */}
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-px bg-[oklch(0.92_0.01_80)]" />

                <div className="space-y-3">
                  {groupEvents.map((event) => {
                    const cfg = typeConfig[event.type];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={event.id}
                        className="relative group"
                      >
                        {/* Dot on timeline */}
                        <div className={`absolute -left-8 top-4 w-[11px] h-[11px] rounded-full border-2 border-white ${
                          event.type === "blocked" || event.type === "keyword" ? "bg-red-500" :
                          event.type === "approved" ? "bg-emerald-500" :
                          event.type === "devotional" ? "bg-purple-500" :
                          event.type === "screen-time" ? "bg-amber-500" :
                          event.type === "content" ? "bg-blue-500" :
                          "bg-gray-400"
                        }`} style={{ boxShadow: "0 0 0 3px oklch(0.97 0.01 80)" }} />

                        {/* Event card */}
                        <div className="bg-white rounded-xl border border-[oklch(0.92_0.01_80)] p-4 hover:border-[oklch(0.85_0.01_80)] hover:shadow-sm transition-all">
                          <div className="flex items-start gap-3">
                            {/* Child avatar */}
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                              style={{ background: event.childColor }}
                            >
                              {event.childAvatar}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                <span className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{event.child}</span>
                                <Badge className={`${cfg.bg} ${cfg.color} border-0 text-[10px] gap-1`}>
                                  <Icon size={10} />
                                  {cfg.label}
                                </Badge>
                                {event.severity === "high" && (
                                  <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">High Priority</Badge>
                                )}
                              </div>
                              <p className="text-sm text-[oklch(0.25_0.02_255)] font-medium">{event.title}</p>
                              <p className="text-xs text-[oklch(0.5_0.02_255)] mt-0.5 leading-relaxed">{event.detail}</p>
                              {event.url && (
                                <div className="flex items-center gap-1 mt-1.5">
                                  <Globe size={10} className="text-[oklch(0.6_0.02_255)]" />
                                  <span className="text-[10px] text-[oklch(0.6_0.02_255)] font-mono">{event.url}</span>
                                </div>
                              )}
                            </div>

                            {/* Time */}
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs text-[oklch(0.5_0.02_255)]">{formatTimeAgo(event.timestamp)}</p>
                              <p className="text-[10px] text-[oklch(0.65_0.02_255)]">{formatTime(event.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary footer */}
        <div className="mt-8 p-4 rounded-xl bg-[oklch(0.97_0.01_80)] border border-[oklch(0.92_0.01_80)] text-center">
          <p className="text-xs text-[oklch(0.5_0.02_255)]">
            Showing {filtered.length} events · {events.filter((e) => e.type === "blocked").length} blocked · {events.filter((e) => e.type === "devotional").length} devotionals · {events.filter((e) => e.type === "approved").length} approved sites
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
