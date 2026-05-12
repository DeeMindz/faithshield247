/* FaithShield247 Business Model Canvas — Sacred Modernism
 * Classic 9-block BMC grid with expandable detail panels
 * All data sourced from the FaithShield247 business model document
 */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Users, Heart, Megaphone, Handshake, DollarSign, Wrench, Cog,
  Building2, CreditCard, ChevronDown, ChevronUp, X, Lightbulb,
  ArrowRight, CheckCircle, AlertTriangle, Star, Target, Layers,
  BookOpen, Shield, Church, GraduationCap, Globe, Sparkles,
  Download, Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generateCanvasPDF } from "@/lib/generateCanvasPDF";

/* ─── BMC Section Data ─── */
interface BMCSection {
  id: string;
  title: string;
  icon: typeof Users;
  color: string;       // oklch accent
  bgLight: string;     // light bg for card
  gridArea: string;     // CSS grid area name
  summary: string[];
  details: {
    heading: string;
    items: string[];
  }[];
  insight?: string;
}

const sections: BMCSection[] = [
  {
    id: "partners",
    title: "Key Partnerships",
    icon: Handshake,
    color: "oklch(0.55 0.18 270)",
    bgLight: "oklch(0.96 0.03 270)",
    gridArea: "partners",
    summary: [
      "Churches & ministries",
      "Christian schools",
      "Safeguarding experts",
      "Christian media platforms",
      "Technology partners",
      "Impact funders",
    ],
    details: [
      {
        heading: "Churches & Ministries",
        items: ["Pilot partners for early adoption", "Distribution partners reaching families", "Endorsement partners building credibility"],
      },
      {
        heading: "Christian Schools",
        items: ["Institutional pilot programmes", "Curriculum & safeguarding partners", "Long-term licensing relationships"],
      },
      {
        heading: "Christian Media & Family Organisations",
        items: ["Promotional support & visibility", "Thought-leadership platforms", "Webinar collaboration"],
      },
      {
        heading: "Safeguarding Experts",
        items: ["Child protection credibility", "Risk assessment guidance", "Policy development support"],
      },
      {
        heading: "Technology Partners",
        items: ["Filtering tool providers", "Hosting & cloud infrastructure", "AI moderation tools", "App development support"],
      },
      {
        heading: "Christian Philanthropists / Impact Funders",
        items: ["Seed funding support", "Subsidised access schemes for low-income families", "Scale-up funding for growth"],
      },
    ],
    insight: "The most powerful early partnerships are: a respected church network, one or two Christian schools, a child-safeguarding advisor, and a visible Christian parenting platform. That mix gives reach and credibility.",
  },
  {
    id: "activities",
    title: "Key Activities",
    icon: Cog,
    color: "oklch(0.55 0.18 270)",
    bgLight: "oklch(0.96 0.03 270)",
    gridArea: "activities",
    summary: [
      "Build & improve the platform",
      "Develop content & resources",
      "Acquire customers",
      "Build partnerships",
      "Maintain safeguarding protocols",
    ],
    details: [
      {
        heading: "Product-Related",
        items: ["Build and improve the platform", "Maintain filtering and safety features", "Develop and update content", "Support onboarding and implementation", "Monitor performance and user feedback"],
      },
      {
        heading: "Commercial",
        items: ["Acquire customers", "Run demos and webinars", "Build church and school partnerships", "Convert pilots into paying users", "Improve retention"],
      },
      {
        heading: "Safeguarding & Governance",
        items: ["Maintain child protection protocols", "Review moderation systems", "Ensure privacy compliance", "Manage ethical oversight"],
      },
      {
        heading: "Content & Engagement",
        items: ["Create family resources", "Develop youth discipleship material", "Publish digital safety guidance", "Release updates and educational tools"],
      },
    ],
    insight: "At the beginning, the most important activities are: validating customer demand, building pilot partnerships, refining the offer, and proving people will pay.",
  },
  {
    id: "resources",
    title: "Key Resources",
    icon: Wrench,
    color: "oklch(0.55 0.18 270)",
    bgLight: "oklch(0.96 0.03 270)",
    gridArea: "resources",
    summary: [
      "Technology & platform",
      "Christian content library",
      "Brand trust & credibility",
      "Human expertise",
      "Data & user insight",
    ],
    details: [
      {
        heading: "Technology",
        items: ["App/platform infrastructure", "Dashboard system", "Filtering and monitoring capability", "Cloud hosting", "Analytics systems"],
      },
      {
        heading: "Content",
        items: ["Christian educational content", "Devotional resources", "Parent guidance materials", "School/church training resources"],
      },
      {
        heading: "Brand & Trust",
        items: ["Credibility in Christian communities", "Endorsements from leaders", "Advisory board", "Safeguarding integrity"],
      },
      {
        heading: "Human Expertise",
        items: ["Tech development", "Child safeguarding", "Theology and Christian education", "Customer support", "Sales and partnerships"],
      },
      {
        heading: "Data & Insight",
        items: ["User feedback", "Customer behaviour patterns", "Safeguarding intelligence", "Age-based use cases"],
      },
    ],
    insight: "The most important early resource is not code. It is trust. Without trust, no parent hands you their child's digital safety. No church recommends you. No school signs.",
  },
  {
    id: "value",
    title: "Value Propositions",
    icon: Heart,
    color: "oklch(0.55 0.15 145)",
    bgLight: "oklch(0.96 0.03 145)",
    gridArea: "value",
    summary: [
      "Shield children from harmful content",
      "Practical parental control",
      "Christian values integration",
      "Church family support tool",
      "School safeguarding solution",
      "Peace of mind & moral reassurance",
    ],
    details: [
      {
        heading: "For Parents",
        items: ["Shield children from pornography, harmful content, bullying, grooming, and toxic online culture", "Practical control without needing to be tech experts", "Combines digital protection with Christian values and family guidance", "Saves parents time and anxiety with a ready-made framework"],
      },
      {
        heading: "For Churches",
        items: ["Help ministries support families in a real and modern way", "Provide a family-facing safeguarding resource", "Strengthen youth discipleship in the digital age", "Position the church as practically relevant, not merely reactive"],
      },
      {
        heading: "For Schools",
        items: ["Support child safeguarding and safer digital learning", "Offer Christian digital citizenship content", "Align faith, safeguarding, and digital education", "Provide a structured solution instead of piecemeal tools"],
      },
      {
        heading: "Deeper Emotional Value",
        items: ["Peace of mind", "Moral reassurance", "Structure and guidance", "Trust in a world that feels out of control"],
      },
    ],
    insight: "The product is not only selling software. It is selling peace of mind, moral reassurance, structure, guidance, and trust in a world that feels increasingly out of control.",
  },
  {
    id: "relationships",
    title: "Customer Relationships",
    icon: Handshake,
    color: "oklch(0.55 0.15 145)",
    bgLight: "oklch(0.96 0.03 145)",
    gridArea: "relationships",
    summary: [
      "Subscription relationship",
      "Easy onboarding",
      "Weekly email support",
      "Account management (B2B)",
      "Training sessions",
      "Trust-based engagement",
    ],
    details: [
      {
        heading: "For Families",
        items: ["Subscription relationship", "Easy onboarding", "Weekly email support or tips", "Parent guides", "Help centre and customer support", "Regular updates and fresh content"],
      },
      {
        heading: "For Churches & Schools",
        items: ["Account management", "Implementation support", "Training sessions", "Renewal follow-up", "Custom onboarding and documentation"],
      },
      {
        heading: "Relationship Style",
        items: ["Trustworthy", "Practical", "Protective", "Faith-rooted", "Not preachy", "Not overly technical"],
      },
    ],
    insight: "You want people to feel: 'These people understand the digital world, and they also understand our values.'",
  },
  {
    id: "channels",
    title: "Channels",
    icon: Megaphone,
    color: "oklch(0.55 0.15 145)",
    bgLight: "oklch(0.96 0.03 145)",
    gridArea: "channels",
    summary: [
      "Official website & app stores",
      "Church networks",
      "Christian schools",
      "Webinars & conferences",
      "Social media & influencers",
      "Direct institutional sales",
    ],
    details: [
      {
        heading: "Direct Channels",
        items: ["Official website", "Mobile app stores", "Web dashboard", "Email marketing", "Webinars for parents, pastors, and schools", "Social media content for Christian families"],
      },
      {
        heading: "Partnership Channels",
        items: ["Church networks", "Christian schools", "Christian parenting groups", "Family conferences", "Christian media platforms", "Homeschooling associations", "Christian influencers and thought leaders"],
      },
      {
        heading: "Sales Channels",
        items: ["Direct-to-consumer subscription sales", "Direct institutional sales to churches and schools", "Network licensing through denominations", "Workshop-based lead generation"],
      },
    ],
    insight: "For an early-stage business, the strongest channels are: church partnerships, Christian parenting communities, webinars, direct founder-led outreach, and pilot partnerships with schools.",
  },
  {
    id: "segments",
    title: "Customer Segments",
    icon: Users,
    color: "oklch(0.58 0.22 27)",
    bgLight: "oklch(0.97 0.02 27)",
    gridArea: "segments",
    summary: [
      "Christian parents & families",
      "Churches & ministries",
      "Christian schools",
      "Homeschooling networks",
      "Faith-based NGOs",
      "Christian counsellors",
    ],
    details: [
      {
        heading: "Primary: Christian Parents & Families",
        items: ["Parents of children aged roughly 4–17", "Families concerned about pornography, cyberbullying, predatory content", "Parents who want digital protection plus faith-based guidance"],
      },
      {
        heading: "Primary: Churches & Ministries",
        items: ["Churches with children's and youth ministries", "Family ministries", "Pastors and ministry leaders who want to support parents", "Organisations running camps, discipleship, or youth programmes"],
      },
      {
        heading: "Primary: Christian Schools",
        items: ["Primary and secondary schools", "Faith-based academies", "Homeschooling networks", "Schools wanting digital filtering plus Christian digital citizenship"],
      },
      {
        heading: "Secondary Segments",
        items: ["Faith-based child development NGOs", "Christian counsellors and family coaches", "Denominational or church networks (umbrella bodies)"],
      },
    ],
  },
  {
    id: "costs",
    title: "Cost Structure",
    icon: CreditCard,
    color: "oklch(0.45 0.12 255)",
    bgLight: "oklch(0.96 0.02 255)",
    gridArea: "costs",
    summary: [
      "Software development",
      "Cloud hosting & security",
      "Content creation",
      "Staff & expertise",
      "Legal & compliance",
      "Marketing & outreach",
    ],
    details: [
      {
        heading: "Technology Costs",
        items: ["Software development", "App maintenance", "Hosting and cloud infrastructure", "Security and privacy systems", "Analytics and backend systems"],
      },
      {
        heading: "People Costs",
        items: ["Developers", "Product manager", "Content creators", "Safeguarding advisor", "Customer support", "Sales/partnership lead"],
      },
      {
        heading: "Content Costs",
        items: ["Devotional and curriculum development", "Video or media production", "Educational resources", "Age-specific materials"],
      },
      {
        heading: "Operations Costs",
        items: ["Legal and compliance", "Data protection work", "Insurance", "Administration", "Customer service tools"],
      },
      {
        heading: "Marketing & Growth",
        items: ["Website", "Paid promotion", "Events/webinars", "Partnership outreach", "Founder-led travel/pitching"],
      },
    ],
    insight: "The biggest danger is overspending on tech too early. You do not want to throw serious money into a complicated platform before you know who pays, what they pay for, what they use most, and what they ignore.",
  },
  {
    id: "revenue",
    title: "Revenue Streams",
    icon: DollarSign,
    color: "oklch(0.45 0.12 255)",
    bgLight: "oklch(0.96 0.02 255)",
    gridArea: "revenue",
    summary: [
      "Family subscriptions",
      "Church packages",
      "School licensing",
      "Workshops & training",
      "Consulting services",
      "Premium content",
    ],
    details: [
      {
        heading: "Family Subscriptions",
        items: ["Monthly subscription", "Annual subscription", "Tiered pricing based on children or feature depth"],
      },
      {
        heading: "Church Subscriptions",
        items: ["Monthly or annual licensing", "Access for families within the church", "Parent support resource packages", "Youth ministry content access"],
      },
      {
        heading: "School Licensing",
        items: ["Per pupil pricing", "Per institution pricing", "Annual contracts", "Safeguarding and curriculum bundles"],
      },
      {
        heading: "Workshops & Training",
        items: ["Parent digital safety workshops", "Church seminars", "School staff safeguarding training", "Youth digital-discipleship sessions"],
      },
      {
        heading: "Consulting & Premium",
        items: ["Family digital setup consulting", "Church policy support", "Parenting courses", "Christian digital discipleship curriculum", "'First phone' starter packs", "Devotional kits"],
      },
      {
        heading: "Sponsored / Donor-Funded Access",
        items: ["Churches or donors sponsor subscriptions for low-income families", "NGO partnerships", "Scholarships or subsidy models"],
      },
    ],
    insight: "The fastest early money is likely from: church packages, workshops, family subscriptions, and school pilots later.",
  },
];

/* ─── Stage Roadmap ─── */
const stages = [
  {
    stage: "Stage 1",
    title: "Sell Trust First",
    icon: Handshake,
    color: "oklch(0.72 0.12 75)",
    items: ["Church packages", "Digital parenting workshops", "Family safety memberships", "Safeguarding consulting"],
  },
  {
    stage: "Stage 2",
    title: "Launch Light Tech",
    icon: Globe,
    color: "oklch(0.55 0.15 145)",
    items: ["Simple parent dashboard", "Curated Christian digital safety resources", "Light tech tools", "Browser extension or partner integrations"],
  },
  {
    stage: "Stage 3",
    title: "Build at Scale",
    icon: Layers,
    color: "oklch(0.55 0.18 270)",
    items: ["Full filtering platform", "Advanced reporting", "Institutional dashboards", "Recurring software revenue at scale"],
  },
];

/* ─── Detail Modal ─── */
function DetailPanel({ section, onClose }: { section: BMCSection; onClose: () => void }) {
  const Icon = section.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[oklch(0.92_0.01_80)] p-6 rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: section.bgLight }}
            >
              <Icon size={20} style={{ color: section.color }} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {section.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[oklch(0.95_0.01_80)] transition-colors"
            >
              <X size={16} className="text-[oklch(0.5_0.02_255)]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {section.details.map((group) => (
            <div key={group.heading}>
              <h4 className="text-sm font-semibold text-[oklch(0.25_0.03_255)] mb-2.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.color }} />
                {group.heading}
              </h4>
              <div className="space-y-1.5 pl-4">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={13} className="text-[oklch(0.55_0.15_145)] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.35_0.02_255)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Insight callout */}
          {section.insight && (
            <div className="mt-4 p-4 rounded-xl border-l-[3px] bg-[oklch(0.98_0.02_75/0.4)]" style={{ borderLeftColor: "oklch(0.72 0.12 75)" }}>
              <div className="flex items-start gap-2.5">
                <Lightbulb size={15} className="text-[oklch(0.65_0.12_75)] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[oklch(0.3_0.03_255)] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {section.insight}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── BMC Grid Card ─── */
function BMCCard({ section, onClick }: { section: BMCSection; onClick: () => void }) {
  const Icon = section.icon;
  return (
    <button
      onClick={onClick}
      className="text-left p-4 rounded-xl border border-[oklch(0.92_0.01_80)] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group h-full flex flex-col"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: section.bgLight }}
        >
          <Icon size={15} style={{ color: section.color }} />
        </div>
        <h3 className="text-xs font-bold text-[oklch(0.15_0.03_255)] uppercase tracking-wider leading-tight">
          {section.title}
        </h3>
      </div>
      <div className="space-y-1.5 flex-1">
        {section.summary.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: section.color }} />
            <span className="text-[11px] text-[oklch(0.4_0.02_255)] leading-snug">{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-[oklch(0.95_0.005_80)]">
        <span className="text-[10px] font-medium text-[oklch(0.5_0.02_255)] group-hover:text-[oklch(0.18_0.06_255)] transition-colors flex items-center gap-1">
          View details <ChevronDown size={10} />
        </span>
      </div>
    </button>
  );
}

/* ─── Main Page ─── */
export default function BusinessCanvas() {
  const [activeSection, setActiveSection] = useState<BMCSection | null>(null);
  const [view, setView] = useState<"canvas" | "snapshot">("canvas");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    // Small delay for UI feedback
    setTimeout(() => {
      generateCanvasPDF(
        sections.map(({ id, title, summary, details, insight }) => ({ id, title, summary, details, insight })),
        stages.map(({ stage, title, items }) => ({ stage, title, items }))
      );
      setIsGenerating(false);
    }, 300);
  };

  return (
    <DashboardLayout title="Business Model Canvas" subtitle="FaithShield247 — Strategic business model overview">
      <div className="p-6 max-w-[1400px]">
        {/* Header controls */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex rounded-lg border border-[oklch(0.9_0.01_80)] overflow-hidden">
            {(["canvas", "snapshot"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-2 text-xs font-medium capitalize transition-colors",
                  view === v
                    ? "bg-[oklch(0.18_0.06_255)] text-white"
                    : "bg-white text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.97_0.01_80)]"
                )}
              >
                {v === "canvas" ? "Full Canvas" : "Snapshot"}
              </button>
            ))}
          </div>
          <Badge className="bg-[oklch(0.72_0.12_75/0.15)] text-[oklch(0.5_0.08_75)] border-[oklch(0.72_0.12_75/0.3)] text-[10px]">
            Click any section for full details
          </Badge>
          <div className="ml-auto">
            <Button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.25_0.06_255)] text-white text-xs gap-2"
            >
              {isGenerating ? (
                <><Loader2 size={14} className="animate-spin" /> Generating...</>
              ) : (
                <><Download size={14} /> Download PDF</>
              )}
            </Button>
          </div>
        </div>

        {view === "canvas" ? (
          <>
            {/* ─── Classic BMC Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-3 mb-8">
              {/* Row 1: Partners | Activities + Value + Relationships + Channels | Segments */}
              <div className="lg:col-span-2 lg:row-span-2">
                <BMCCard section={sections[0]} onClick={() => setActiveSection(sections[0])} />
              </div>
              <div className="lg:col-span-2">
                <BMCCard section={sections[1]} onClick={() => setActiveSection(sections[1])} />
              </div>
              <div className="lg:col-span-2 lg:row-span-2">
                <BMCCard section={sections[3]} onClick={() => setActiveSection(sections[3])} />
              </div>
              <div className="lg:col-span-2">
                <BMCCard section={sections[4]} onClick={() => setActiveSection(sections[4])} />
              </div>
              <div className="lg:col-span-2 lg:row-span-2">
                <BMCCard section={sections[6]} onClick={() => setActiveSection(sections[6])} />
              </div>

              {/* Row 2: (Partners continues) | Resources | (Value continues) | Channels | (Segments continues) */}
              <div className="lg:col-span-2">
                <BMCCard section={sections[2]} onClick={() => setActiveSection(sections[2])} />
              </div>
              <div className="lg:col-span-2">
                <BMCCard section={sections[5]} onClick={() => setActiveSection(sections[5])} />
              </div>

              {/* Row 3: Costs | Revenue */}
              <div className="lg:col-span-5">
                <BMCCard section={sections[7]} onClick={() => setActiveSection(sections[7])} />
              </div>
              <div className="lg:col-span-5">
                <BMCCard section={sections[8]} onClick={() => setActiveSection(sections[8])} />
              </div>
            </div>

            {/* ─── Staged Roadmap ─── */}
            <div className="bg-white rounded-2xl border border-[oklch(0.92_0.01_80)] p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center">
                  <Target size={17} className="text-[oklch(0.18_0.06_255)]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Strategic Execution Roadmap
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">Sell trust first, build tech in stages</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stages.map((s, idx) => (
                  <div key={s.stage} className="relative">
                    <div className="p-5 rounded-xl border border-[oklch(0.92_0.01_80)] bg-[oklch(0.98_0.005_80)] h-full">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${s.color}20` }}
                        >
                          <s.icon size={15} style={{ color: s.color }} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>
                            {s.stage}
                          </span>
                          <p className="text-sm font-semibold text-[oklch(0.15_0.03_255)]">{s.title}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {s.items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <ArrowRight size={11} className="mt-0.5 flex-shrink-0" style={{ color: s.color }} />
                            <span className="text-xs text-[oklch(0.4_0.02_255)]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {idx < 2 && (
                      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border border-[oklch(0.9_0.01_80)] items-center justify-center">
                        <ChevronDown size={10} className="rotate-[-90deg] text-[oklch(0.5_0.02_255)]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom advice */}
              <div className="mt-5 p-4 rounded-xl bg-[oklch(0.98_0.02_75/0.4)] border-l-[3px]" style={{ borderLeftColor: "oklch(0.72 0.12 75)" }}>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle size={15} className="text-[oklch(0.65_0.12_75)] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[oklch(0.3_0.03_255)] leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    "Your strongest early model is probably not 'build app first.' It is more likely: sell trust first, build tech in stages. That is the sober route. Not glamorous, but solid."
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ─── Snapshot View ─── */
          <div className="bg-white rounded-2xl border border-[oklch(0.92_0.01_80)] overflow-hidden">
            {/* Snapshot header */}
            <div className="p-6 border-b border-[oklch(0.92_0.01_80)] bg-gradient-to-r from-[oklch(0.97_0.01_80)] to-white">
              <h2 className="text-xl font-bold text-[oklch(0.15_0.03_255)] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                FaithShield247 Business Model Snapshot
              </h2>
              <p className="text-sm text-[oklch(0.5_0.02_255)]">
                A Christian digital safeguarding and moral-formation platform
              </p>
            </div>

            <div className="divide-y divide-[oklch(0.95_0.005_80)]">
              {[
                { label: "Customer Segments", value: "Christian families, churches, Christian schools, homeschooling groups, faith-based NGOs", icon: Users },
                { label: "Value Proposition", value: "Protect children online while helping families, churches, and schools build Christian digital discipline and moral formation", icon: Heart },
                { label: "Channels", value: "Website, app, webinars, churches, schools, Christian media, parenting communities", icon: Megaphone },
                { label: "Customer Relationships", value: "Subscription support, onboarding, training, webinars, customer care, trust-based engagement", icon: Handshake },
                { label: "Revenue Streams", value: "Family subscriptions, church packages, school licenses, workshops, consulting, premium content, sponsorships", icon: DollarSign },
                { label: "Key Resources", value: "Technology, content, trust, safeguarding expertise, Christian partnerships, brand credibility", icon: Wrench },
                { label: "Key Activities", value: "Platform development, content creation, customer acquisition, safeguarding oversight, onboarding, partnerships", icon: Cog },
                { label: "Key Partnerships", value: "Churches, schools, Christian networks, safeguarding experts, media partners, funders, tech vendors", icon: Building2 },
                { label: "Cost Structure", value: "Development, hosting, staffing, content, compliance, marketing, support", icon: CreditCard },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 p-5">
                  <div className="w-9 h-9 rounded-lg bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <row.icon size={16} className="text-[oklch(0.18_0.06_255)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[oklch(0.15_0.03_255)] uppercase tracking-wider mb-1">{row.label}</p>
                    <p className="text-sm text-[oklch(0.4_0.02_255)] leading-relaxed">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t-2 border-[oklch(0.72_0.12_75)] bg-[oklch(0.97_0.01_80)] text-center">
              <p className="text-sm italic text-[oklch(0.4_0.02_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Train up a child in the way he should go; even when he is old he will not depart from it."
              </p>
              <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1">— Proverbs 22:6</p>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {activeSection && (
        <DetailPanel section={activeSection} onClose={() => setActiveSection(null)} />
      )}
    </DashboardLayout>
  );
}
