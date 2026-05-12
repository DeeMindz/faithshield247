/* FaithShield247 Child View â€” Safe Browser & Curated Content Ecosystem
 * This is what the child sees: a safe, joyful, faith-rooted digital world
 */
import { useState } from "react";
import { Link } from "wouter";
import { Shield, Star, BookOpen, Music, Gamepad2, Video, ArrowLeft, Search, Lock, Heart, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const KIDS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-kids-DBoo5yMAgcgBjyCFseKAe8.webp";
const SHIELD_IMG = "/logo.png";

const categories = [
  { id: "all", label: "All", icon: Star },
  { id: "bible", label: "Bible Stories", icon: BookOpen },
  { id: "videos", label: "Videos", icon: Video },
  { id: "games", label: "Games", icon: Gamepad2 },
  { id: "music", label: "Music", icon: Music },
];

const content = [
  {
    id: 1, category: "bible", title: "David & Goliath", type: "Story", age: "6+",
    desc: "The story of a young shepherd boy who trusted God and faced a giant with courage.",
    color: "from-blue-100 to-blue-50", icon: "ðŸ“–", duration: "8 min read",
  },
  {
    id: 2, category: "videos", title: "The Creation Story", type: "Video", age: "5+",
    desc: "A beautiful animated journey through the seven days of creation.",
    color: "from-purple-100 to-purple-50", icon: "ðŸŽ¬", duration: "12 min",
  },
  {
    id: 3, category: "games", title: "Bible Verse Quest", type: "Game", age: "7+",
    desc: "Learn and memorise Bible verses through fun puzzles and challenges.",
    color: "from-green-100 to-green-50", icon: "ðŸŽ®", duration: "Interactive",
  },
  {
    id: 4, category: "music", title: "Praise Songs for Kids", type: "Music", age: "All",
    desc: "A collection of joyful worship songs and hymns for children.",
    color: "from-yellow-100 to-yellow-50", icon: "ðŸŽµ", duration: "45 min",
  },
  {
    id: 5, category: "bible", title: "Noah's Ark", type: "Story", age: "5+",
    desc: "God's promise to Noah and the great flood â€” a story of faith and obedience.",
    color: "from-cyan-100 to-cyan-50", icon: "â›µ", duration: "10 min read",
  },
  {
    id: 6, category: "videos", title: "Fruits of the Spirit", type: "Video", age: "6+",
    desc: "Learn about love, joy, peace, patience and more through fun animation.",
    color: "from-orange-100 to-orange-50", icon: "ðŸŽ", duration: "9 min",
  },
  {
    id: 7, category: "games", title: "Good Samaritan Adventure", type: "Game", age: "8+",
    desc: "An interactive adventure game teaching kindness, empathy, and helping others.",
    color: "from-rose-100 to-rose-50", icon: "ðŸ¤", duration: "Interactive",
  },
  {
    id: 8, category: "bible", title: "The Lord's Prayer", type: "Devotional", age: "All",
    desc: "A guided devotional exploring the meaning of the prayer Jesus taught his disciples.",
    color: "from-indigo-100 to-indigo-50", icon: "ðŸ™", duration: "5 min",
  },
];

const todayVerse = {
  text: "I can do all things through Christ who strengthens me.",
  ref: "Philippians 4:13",
};

const achievements = [
  { icon: "â­", label: "5 Stories Read", earned: true },
  { icon: "ðŸ“–", label: "Memory Verse", earned: true },
  { icon: "ðŸŽ¯", label: "Quiz Champion", earned: false },
  { icon: "ðŸ™", label: "7-Day Devotion", earned: false },
];

export default function ChildView() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blockedSearch, setBlockedSearch] = useState(false);

  const filteredContent = content.filter((c) => {
    const matchCat = activeCategory === "all" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const dangerous = ["youtube", "tiktok", "instagram", "facebook", "google", "reddit", "twitter"];
    if (dangerous.some(d => searchQuery.toLowerCase().includes(d))) {
      setBlockedSearch(true);
      setTimeout(() => setBlockedSearch(false), 3000);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, oklch(0.96 0.02 255) 0%, oklch(0.97 0.01 80) 100%)", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Child-friendly top bar */}
      <header className="bg-[oklch(0.18_0.06_255)] px-4 py-3 flex items-center gap-3">
        <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-8 rounded-lg object-cover" />
        <span className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
          FaithShield247 Kids
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full">
            <Shield size={11} />
            <span>Protected</span>
          </div>
          <Link href="/dashboard">
            <Button size="sm" variant="outline" className="text-xs border-white/20 text-white bg-transparent hover:bg-white/10 gap-1">
              <ArrowLeft size={12} /> Parent View
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome + Verse */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[oklch(0.9_0.01_80)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[oklch(0.55_0.15_255)] flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Good morning, Emma! ðŸ‘‹
              </h2>
              <p className="text-sm text-[oklch(0.5_0.02_255)]">Today's verse:</p>
              <p className="text-sm text-[oklch(0.18_0.06_255)] italic mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                "{todayVerse.text}" â€” <span className="font-semibold not-italic">{todayVerse.ref}</span>
              </p>
            </div>
            <div className="hidden md:block">
              <img src={KIDS_IMG} alt="Kids" className="w-24 h-16 object-cover rounded-xl" />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[oklch(0.9_0.01_80)]">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-[oklch(0.72_0.12_75)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Achievements
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((a) => (
              <div key={a.label} className={`text-center p-3 rounded-xl border ${a.earned ? "bg-[oklch(0.97_0.05_75)] border-[oklch(0.85_0.08_75)]" : "bg-gray-50 border-gray-100 opacity-50"}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <p className="text-[10px] font-medium text-[oklch(0.3_0.02_255)]">{a.label}</p>
                {a.earned && <Badge className="mt-1 bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0 text-[9px] px-1">Earned!</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Safe Search */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[oklch(0.9_0.01_80)]">
          <div className="flex items-center gap-2 mb-3">
            <Search size={18} className="text-[oklch(0.18_0.06_255)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Safe Search
            </h3>
            <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200 text-xs gap-1">
              <Lock size={10} /> Filtered
            </Badge>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Bible stories, animals, science..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-[oklch(0.9_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.3)] bg-[oklch(0.97_0.01_80)]"
            />
            <Button type="submit" className="bg-[oklch(0.18_0.06_255)] text-white border-0 rounded-xl">
              <Search size={16} />
            </Button>
          </form>
          {blockedSearch && (
            <div className="mt-3 flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
              <Shield size={16} className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700">This site is blocked by FaithShield247</p>
                <p className="text-xs text-red-500 mt-0.5">Your parent has been notified. Try searching for something else!</p>
              </div>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {["Noah's Ark", "Animals", "Solar System", "Bible Heroes", "Dinosaurs"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="text-xs px-3 py-1.5 rounded-full bg-[oklch(0.97_0.01_80)] text-[oklch(0.4_0.02_255)] hover:bg-[oklch(0.94_0.012_80)] border border-[oklch(0.9_0.01_80)] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content Library */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart size={18} className="text-[oklch(0.72_0.12_75)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Content Library
            </h3>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-[oklch(0.18_0.06_255)] text-white shadow-sm"
                    : "bg-white text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.94_0.012_80)] border border-[oklch(0.9_0.01_80)]"
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Content grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 border border-white/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer`}
                onClick={() => toast.success(`Opening "${item.title}" â€” full content in production version`)}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="flex items-center gap-1 mb-1">
                  <Badge className="bg-white/70 text-[oklch(0.3_0.02_255)] border-0 text-[10px] px-1.5">{item.type}</Badge>
                  <Badge className="bg-white/70 text-[oklch(0.3_0.02_255)] border-0 text-[10px] px-1.5">{item.age}</Badge>
                </div>
                <h4 className="font-bold text-sm text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h4>
                <p className="text-xs text-[oklch(0.4_0.02_255)] leading-relaxed mb-2">{item.desc}</p>
                <p className="text-[10px] text-[oklch(0.5_0.02_255)]">{item.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

