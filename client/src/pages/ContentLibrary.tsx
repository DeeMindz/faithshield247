/* FaithShield247 Content Library — Curated faith-based content for families */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Video, Music, Gamepad2, Star, Filter, Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const categories = ["All", "Bible Stories", "Videos", "Games", "Music", "Devotionals", "Educational"];
const ageGroups = ["All Ages", "Under 6", "6-9", "10-13", "Teen"];

const library = [
  { id: 1, title: "The Sermon on the Mount", cat: "Bible Stories", age: "10-13", rating: 5, type: "📖", desc: "An in-depth exploration of Jesus' most famous teaching.", duration: "15 min", featured: true },
  { id: 2, title: "Creation Week Animated", cat: "Videos", age: "Under 6", rating: 5, type: "🎬", desc: "Beautiful animation of the seven days of creation.", duration: "12 min", featured: true },
  { id: 3, title: "Psalm 23 Memory Challenge", cat: "Games", age: "6-9", rating: 4, type: "🎮", desc: "Fun interactive game to memorise the beloved Psalm.", duration: "Interactive", featured: false },
  { id: 4, title: "Hymns of the Faith", cat: "Music", age: "All Ages", rating: 5, type: "🎵", desc: "Classic hymns arranged for children's voices.", duration: "52 min", featured: false },
  { id: 5, title: "Morning Devotional — Proverbs", cat: "Devotionals", age: "Teen", rating: 5, type: "🙏", desc: "Daily wisdom from Proverbs for teenagers navigating life.", duration: "5 min/day", featured: true },
  { id: 6, title: "The Parable of the Prodigal Son", cat: "Bible Stories", age: "6-9", rating: 5, type: "📖", desc: "A story of grace, forgiveness, and the Father's love.", duration: "10 min", featured: false },
  { id: 7, title: "Science & Creation", cat: "Educational", age: "10-13", rating: 4, type: "🔬", desc: "Exploring how science and faith complement each other.", duration: "20 min", featured: false },
  { id: 8, title: "Fruits of the Spirit Song", cat: "Music", age: "Under 6", rating: 5, type: "🎵", desc: "Catchy songs helping young children learn the Fruits of the Spirit.", duration: "8 min", featured: false },
  { id: 9, title: "The Armour of God", cat: "Bible Stories", age: "6-9", rating: 4, type: "📖", desc: "Ephesians 6 brought to life with illustrations and activities.", duration: "12 min", featured: false },
  { id: 10, title: "Teen Faith & Technology", cat: "Devotionals", age: "Teen", rating: 4, type: "🙏", desc: "Navigating social media, screens, and digital life with faith.", duration: "7 min/day", featured: true },
  { id: 11, title: "Bible Heroes Quiz", cat: "Games", age: "10-13", rating: 4, type: "🎮", desc: "Test your knowledge of the great heroes of the Bible.", duration: "Interactive", featured: false },
  { id: 12, title: "Worship for Kids Vol. 2", cat: "Videos", age: "6-9", rating: 5, type: "🎬", desc: "Uplifting worship videos designed for young hearts.", duration: "35 min", featured: false },
];

export default function ContentLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeAge, setActiveAge] = useState("All Ages");
  const [search, setSearch] = useState("");

  const filtered = library.filter((item) => {
    const matchCat = activeCategory === "All" || item.cat === activeCategory;
    const matchAge = activeAge === "All Ages" || item.age === activeAge || item.age === "All Ages";
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchAge && matchSearch;
  });

  const featured = library.filter((i) => i.featured);

  return (
    <DashboardLayout title="Content Library" subtitle="Curated faith-based content for every age">
      <div className="p-6 space-y-6">

        {/* Featured */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-[oklch(0.72_0.12_75)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Featured This Week
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <div key={item.id} className="stat-card p-4 cursor-pointer" onClick={() => toast.success(`Opening "${item.title}"`)}>
                <div className="text-3xl mb-3">{item.type}</div>
                <Badge className="mb-2 bg-[oklch(0.72_0.12_75/0.15)] text-[oklch(0.5_0.08_75)] border-[oklch(0.72_0.12_75/0.3)] text-[10px]">
                  {item.cat}
                </Badge>
                <h4 className="font-semibold text-sm text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h4>
                <p className="text-xs text-[oklch(0.5_0.02_255)]">{item.age} · {item.duration}</p>
                <div className="flex mt-2">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={10} className="text-[oklch(0.72_0.12_75)] fill-[oklch(0.72_0.12_75)]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="stat-card p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-48">
              <Search size={15} className="text-[oklch(0.5_0.02_255)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search content..."
                className="flex-1 text-sm bg-transparent focus:outline-none text-[oklch(0.15_0.03_255)] placeholder:text-[oklch(0.6_0.02_255)]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-[oklch(0.5_0.02_255)]" />
              <div className="flex gap-1.5 flex-wrap">
                {ageGroups.map((age) => (
                  <button
                    key={age}
                    onClick={() => setActiveAge(age)}
                    className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                      activeAge === age ? "bg-[oklch(0.18_0.06_255)] text-white" : "bg-[oklch(0.94_0.012_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.9_0.01_80)]"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === cat ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]" : "bg-[oklch(0.94_0.012_80)] text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.9_0.01_80)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="stat-card p-4 cursor-pointer" onClick={() => toast.success(`Opening "${item.title}"`)}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{item.type}</span>
                <div className="flex">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={10} className="text-[oklch(0.72_0.12_75)] fill-[oklch(0.72_0.12_75)]" />
                  ))}
                </div>
              </div>
              <Badge className="mb-2 bg-[oklch(0.18_0.06_255/0.07)] text-[oklch(0.18_0.06_255)] border-0 text-[10px]">{item.cat}</Badge>
              <h4 className="font-semibold text-sm text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.title}
              </h4>
              <p className="text-xs text-[oklch(0.5_0.02_255)] leading-relaxed mb-2">{item.desc}</p>
              <p className="text-[10px] text-[oklch(0.6_0.02_255)]">{item.age} · {item.duration}</p>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[oklch(0.5_0.02_255)]">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No content found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" className="gap-2 border-[oklch(0.9_0.01_80)]" onClick={() => toast.info("Full library has 500+ titles in the production version")}>
            <Plus size={15} /> Load More Content
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
