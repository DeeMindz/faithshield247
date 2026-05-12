/* FaithShield247 Teen Mode â€” Sacred Modernism (Age 13-17)
 * Distinct interface: darker tones, modern feel, age-appropriate content
 * Tabs: Feed, Journal, Accountability, Profile
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  BookOpen, Heart, Users, User, ArrowLeft, Flame, Star,
  MessageCircle, Play, Music, Bookmark, ChevronRight, Shield,
  Sparkles, Clock, Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SHIELD_IMG = "/logo.png";

const dailyVerse = {
  text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
  ref: "Jeremiah 29:11",
};

const devotionalPrompts = [
  "What is one thing you're grateful to God for today?",
  "How did you see God working in your life this week?",
  "What's a challenge you're facing that you can bring to prayer?",
  "Write about a Bible verse that spoke to you recently.",
  "How can you show Christ's love to someone tomorrow?",
];

const contentFeed = [
  {
    type: "video",
    title: "Finding Your Identity in Christ",
    source: "RightNow Media Youth",
    duration: "12 min",
    icon: Play,
    category: "Identity",
    saved: false,
  },
  {
    type: "article",
    title: "5 Ways to Handle Peer Pressure as a Christian Teen",
    source: "Focus on the Family",
    duration: "4 min read",
    icon: BookOpen,
    category: "Life Skills",
    saved: true,
  },
  {
    type: "music",
    title: "Daily Worship Playlist â€” March 2026",
    source: "FaithShield247 Curated",
    duration: "45 min",
    icon: Music,
    category: "Worship",
    saved: false,
  },
  {
    type: "devotional",
    title: "What Does the Bible Say About Anxiety?",
    source: "YouVersion",
    duration: "6 min read",
    icon: Heart,
    category: "Mental Health",
    saved: false,
  },
  {
    type: "video",
    title: "How to Read the Bible for Beginners",
    source: "The Bible Project",
    duration: "8 min",
    icon: Play,
    category: "Bible Study",
    saved: true,
  },
  {
    type: "article",
    title: "Navigating Social Media with Wisdom",
    source: "Axis.org",
    duration: "5 min read",
    icon: BookOpen,
    category: "Digital Life",
    saved: false,
  },
];

const streakDays = 12;

type Tab = "feed" | "journal" | "accountability" | "profile";

export default function TeenMode() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set([1, 4]));

  const toggleSave = (idx: number) => {
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); toast("Removed from saved"); }
      else { next.add(idx); toast.success("Saved for later"); }
      return next;
    });
  };

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "feed", label: "For You", icon: Sparkles },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "accountability", label: "Partner", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.03_255)] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-[oklch(0.12_0.03_255/0.95)] backdrop-blur-xl border-b border-white/8">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/dashboard">
            <button className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <img src={SHIELD_IMG} alt="FaithShield247" className="w-7 h-7 rounded-lg object-cover" />
          <div className="flex-1">
            <h1 className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              FaithShield247 <span className="text-[oklch(0.72_0.12_75)]">Teen</span>
            </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-[oklch(0.72_0.12_75/0.15)] rounded-full px-2.5 py-1">
            <Flame size={13} className="text-[oklch(0.72_0.12_75)]" />
            <span className="text-xs font-semibold text-[oklch(0.72_0.12_75)]">{streakDays}</span>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="sticky top-[53px] z-40 bg-[oklch(0.12_0.03_255/0.95)] backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-[oklch(0.72_0.12_75)] border-[oklch(0.72_0.12_75)]"
                  : "text-white/40 border-transparent hover:text-white/60"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content area */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Feed Tab */}
        {activeTab === "feed" && (
          <div className="space-y-5 animate-fade-up">
            {/* Daily Verse Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.2_0.06_255)] to-[oklch(0.16_0.04_255)] border border-white/8 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-[oklch(0.72_0.12_75)]" />
                <span className="text-xs font-semibold text-[oklch(0.72_0.12_75)] uppercase tracking-wider">Verse of the Day</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed italic mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                "{dailyVerse.text}"
              </p>
              <p className="text-white/40 text-xs font-medium">{dailyVerse.ref}</p>
            </div>

            {/* Devotional Streak */}
            <div className="flex items-center gap-3 rounded-xl bg-[oklch(0.72_0.12_75/0.1)] border border-[oklch(0.72_0.12_75/0.2)] p-4">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.12_75/0.2)] flex items-center justify-center">
                <Flame size={18} className="text-[oklch(0.72_0.12_75)]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{streakDays}-day streak!</p>
                <p className="text-xs text-white/50">Keep going â€” your journal entry today will make it {streakDays + 1}.</p>
              </div>
              <button
                onClick={() => setActiveTab("journal")}
                className="text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.82_0.12_75)] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Content Feed */}
            <div>
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Curated For You</h2>
              <div className="space-y-3">
                {contentFeed.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[oklch(0.16_0.03_255)] border border-white/6 hover:border-white/12 transition-all group cursor-pointer"
                    onClick={() => toast.info(`Opening "${item.title}" â€” content playback coming soon`)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.type === "video" ? "bg-red-500/15 text-red-400" :
                      item.type === "music" ? "bg-purple-500/15 text-purple-400" :
                      item.type === "devotional" ? "bg-emerald-500/15 text-emerald-400" :
                      "bg-blue-500/15 text-blue-400"
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white group-hover:text-[oklch(0.72_0.12_75)] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/40">{item.source}</span>
                        <span className="text-white/20">Â·</span>
                        <span className="text-xs text-white/40">{item.duration}</span>
                      </div>
                      <Badge className="mt-1.5 bg-white/5 text-white/50 border-white/10 text-[10px] px-1.5 py-0 h-4">
                        {item.category}
                      </Badge>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(idx); }}
                      className="text-white/30 hover:text-[oklch(0.72_0.12_75)] transition-colors mt-1"
                    >
                      <Bookmark size={16} className={savedItems.has(idx) ? "fill-[oklch(0.72_0.12_75)] text-[oklch(0.72_0.12_75)]" : ""} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === "journal" && <TeenJournal />}

        {/* Accountability Tab */}
        {activeTab === "accountability" && <TeenAccountability />}

        {/* Profile Tab */}
        {activeTab === "profile" && <TeenProfile />}
      </main>
    </div>
  );
}

/* â”€â”€â”€ Teen Journal Component â”€â”€â”€ */
function TeenJournal() {
  const [entries, setEntries] = useState<{ date: string; prompt: string; text: string; verse: string }[]>([
    {
      date: "Mar 24, 2026",
      prompt: "How did you see God working in your life this week?",
      text: "I had a really tough test this week and I prayed about it the night before. I felt so much peace during the exam. I think God was reminding me that He's with me even in the small things.",
      verse: "Philippians 4:6-7",
    },
    {
      date: "Mar 23, 2026",
      prompt: "What is one thing you're grateful to God for today?",
      text: "I'm grateful for my youth group. We had an amazing discussion about identity in Christ and it really helped me think about who I am beyond what social media says.",
      verse: "Psalm 139:14",
    },
  ]);
  const [newEntry, setNewEntry] = useState("");
  const [todayPrompt] = useState(devotionalPrompts[Math.floor(Math.random() * devotionalPrompts.length)]);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const handleSave = () => {
    if (!newEntry.trim()) return;
    setEntries((prev) => [
      {
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        prompt: todayPrompt,
        text: newEntry,
        verse: "Personal reflection",
      },
      ...prev,
    ]);
    setNewEntry("");
    setShowNewEntry(false);
    toast.success("Journal entry saved! Your streak continues.");
  };

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Today's prompt */}
      <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.2_0.06_255)] to-[oklch(0.16_0.04_255)] border border-white/8 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-[oklch(0.72_0.12_75)]" />
          <span className="text-xs font-semibold text-[oklch(0.72_0.12_75)] uppercase tracking-wider">Today's Reflection</span>
        </div>
        <p className="text-white/90 text-base font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {todayPrompt}
        </p>

        {!showNewEntry ? (
          <Button
            onClick={() => setShowNewEntry(true)}
            className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.12_0.03_255)] border-0 text-sm font-semibold gap-2"
          >
            <BookOpen size={14} /> Write Today's Entry
          </Button>
        ) : (
          <div className="space-y-3">
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Pour out your heart here... What's on your mind today?"
              autoFocus
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)] resize-none"
            />
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={!newEntry.trim()}
                className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.12_0.03_255)] border-0 text-sm font-semibold disabled:opacity-40"
              >
                Save Entry
              </Button>
              <Button
                variant="outline"
                onClick={() => { setShowNewEntry(false); setNewEntry(""); }}
                className="border-white/20 text-white/60 hover:text-white hover:bg-white/5 bg-transparent text-sm"
              >
                Cancel
              </Button>
              <span className="ml-auto text-xs text-white/30">{newEntry.length} characters</span>
            </div>
          </div>
        )}
      </div>

      {/* Past entries */}
      <div>
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Past Entries</h2>
        <div className="space-y-3">
          {entries.map((entry, idx) => (
            <div key={idx} className="rounded-xl bg-[oklch(0.16_0.03_255)] border border-white/6 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={12} className="text-white/40" />
                <span className="text-xs text-white/40">{entry.date}</span>
                <span className="text-white/20">Â·</span>
                <span className="text-xs text-[oklch(0.72_0.12_75)]">{entry.verse}</span>
              </div>
              <p className="text-xs text-white/50 italic mb-2">"{entry.prompt}"</p>
              <p className="text-sm text-white/80 leading-relaxed">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* â”€â”€â”€ Teen Accountability Component â”€â”€â”€ */
function TeenAccountability() {
  const [partnerInvite, setPartnerInvite] = useState("");
  const [hasPartner] = useState(true);

  const partner = {
    name: "Pastor Mike",
    role: "Youth Pastor",
    avatar: "PM",
    lastCheckIn: "2 days ago",
    streak: 8,
  };

  const weeklyReport = [
    { day: "Mon", screenTime: "1h 45m", blocked: 2, devotional: true },
    { day: "Tue", screenTime: "2h 10m", blocked: 0, devotional: true },
    { day: "Wed", screenTime: "1h 30m", blocked: 1, devotional: true },
    { day: "Thu", screenTime: "2h 55m", blocked: 3, devotional: false },
    { day: "Fri", screenTime: "3h 20m", blocked: 5, devotional: true },
    { day: "Sat", screenTime: "4h 00m", blocked: 2, devotional: true },
    { day: "Sun", screenTime: "1h 15m", blocked: 0, devotional: true },
  ];

  const checkIns = [
    { date: "Mar 23", message: "Great week! I noticed you've been consistent with your journal. Keep it up!", from: "Pastor Mike" },
    { date: "Mar 16", message: "Saw some extra screen time on Friday â€” everything okay? Let's chat at youth group.", from: "Pastor Mike" },
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      {hasPartner ? (
        <>
          {/* Partner Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.2_0.06_255)] to-[oklch(0.16_0.04_255)] border border-white/8 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={14} className="text-[oklch(0.72_0.12_75)]" />
              <span className="text-xs font-semibold text-[oklch(0.72_0.12_75)] uppercase tracking-wider">Accountability Partner</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[oklch(0.72_0.12_75/0.2)] flex items-center justify-center text-[oklch(0.72_0.12_75)] font-bold text-lg">
                {partner.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white">{partner.name}</h3>
                <p className="text-xs text-white/50">{partner.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs text-white/40">Last check-in: {partner.lastCheckIn}</span>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-white/8 hover:bg-white/12 text-white border-0 text-xs gap-1.5"
                onClick={() => toast.info("Messaging feature â€” coming soon")}
              >
                <MessageCircle size={13} /> Message
              </Button>
            </div>
          </div>

          {/* Weekly Summary shared with partner */}
          <div>
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">This Week's Summary</h2>
            <p className="text-xs text-white/40 mb-3">This summary is shared with your accountability partner.</p>
            <div className="rounded-xl bg-[oklch(0.16_0.03_255)] border border-white/6 overflow-hidden">
              <div className="grid grid-cols-4 gap-0 text-center text-xs font-medium text-white/40 border-b border-white/6 py-2 px-3">
                <span>Day</span>
                <span>Screen Time</span>
                <span>Blocked</span>
                <span>Devotional</span>
              </div>
              {weeklyReport.map((day) => (
                <div key={day.day} className="grid grid-cols-4 gap-0 text-center text-xs py-2.5 px-3 border-b border-white/4 last:border-0">
                  <span className="text-white/70 font-medium">{day.day}</span>
                  <span className="text-white/50">{day.screenTime}</span>
                  <span className={day.blocked > 2 ? "text-amber-400" : "text-white/50"}>{day.blocked}</span>
                  <span>{day.devotional ? "âœ“" : "â€”"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Check-in Messages */}
          <div>
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Partner Check-Ins</h2>
            <div className="space-y-3">
              {checkIns.map((ci, idx) => (
                <div key={idx} className="rounded-xl bg-[oklch(0.16_0.03_255)] border border-white/6 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[oklch(0.72_0.12_75/0.2)] flex items-center justify-center text-[oklch(0.72_0.12_75)] text-[10px] font-bold">
                      PM
                    </div>
                    <span className="text-xs font-medium text-white/70">{ci.from}</span>
                    <span className="text-white/20">Â·</span>
                    <span className="text-xs text-white/40">{ci.date}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{ci.message}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* No partner yet */
        <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.2_0.06_255)] to-[oklch(0.16_0.04_255)] border border-white/8 p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[oklch(0.72_0.12_75/0.15)] flex items-center justify-center">
            <Users size={28} className="text-[oklch(0.72_0.12_75)]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Add an Accountability Partner
          </h3>
          <p className="text-sm text-white/50 mb-5 max-w-sm mx-auto">
            Invite a trusted adult â€” a parent, youth pastor, or mentor â€” to receive weekly summaries of your digital activity and check in with you.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={partnerInvite}
              onChange={(e) => setPartnerInvite(e.target.value)}
              placeholder="partner@email.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)]"
            />
            <Button
              onClick={() => { toast.success("Invitation sent!"); setPartnerInvite(""); }}
              className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.12_0.03_255)] border-0 text-sm font-semibold"
            >
              Invite
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* â”€â”€â”€ Teen Profile Component â”€â”€â”€ */
function TeenProfile() {
  return (
    <div className="space-y-5 animate-fade-up">
      <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.2_0.06_255)] to-[oklch(0.16_0.04_255)] border border-white/8 p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[oklch(0.72_0.12_75/0.2)] flex items-center justify-center text-[oklch(0.72_0.12_75)] text-2xl font-bold">
          T
        </div>
        <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Teen User
        </h3>
        <p className="text-sm text-white/50">Age 15 Â· Premium Family Plan</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-[oklch(0.72_0.12_75)]">12</div>
            <div className="text-xs text-white/40">Day Streak</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold text-[oklch(0.72_0.12_75)]">28</div>
            <div className="text-xs text-white/40">Journal Entries</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="text-lg font-bold text-[oklch(0.72_0.12_75)]">94%</div>
            <div className="text-xs text-white/40">Safe Browsing</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Quick Settings</h2>
        <div className="space-y-2">
          {[
            { label: "Notification Preferences", desc: "Manage alerts and reminders" },
            { label: "Saved Content", desc: "View your bookmarked items" },
            { label: "Prayer Requests", desc: "Your private prayer list" },
            { label: "Help & Support", desc: "Get help or report an issue" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => toast.info(`${item.label} â€” feature coming soon`)}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-[oklch(0.16_0.03_255)] border border-white/6 hover:border-white/12 transition-all text-left"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </button>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <Link href="/dashboard">
          <Button variant="outline" className="border-white/20 text-white/60 hover:text-white hover:bg-white/5 bg-transparent text-sm gap-2">
            <ArrowLeft size={14} /> Back to Parent Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

