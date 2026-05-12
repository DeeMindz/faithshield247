import { useState } from "react";
import { Link, useLocation } from "wouter";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Shield,
  BookOpen,
  BarChart3,
  Settings,
  ChevronRight,
  Sparkles,
  LogOut,
  Menu,
  X,
  Wifi,
  WifiOff,
  Church,
  Globe,
  Activity,
  FileText,
  Presentation,
  Layers,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoContext";
import { toast } from "sonner";
import NotificationCenter from "@/components/NotificationCenter";

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    label: "Navigation",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: Activity, label: "Activity Timeline", href: "/activity" },
      { icon: Users, label: "Profiles", href: "/profiles" },
      { icon: BookOpen, label: "Content Library", href: "/content-library" },
      { icon: BarChart3, label: "Reports", href: "/reports", badge: "3" },
      { icon: FileText, label: "Safety Report", href: "/safety-report" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
  {
    label: "Tools & Features",
    items: [
      { icon: Shield, label: "Filter Demo", href: "/filter-demo" },
      { icon: Eye, label: "Child View", href: "/child-view" },
      { icon: Sparkles, label: "Teen Mode", href: "/teen-mode" },
      { icon: Church, label: "Admin Portal", href: "/admin" },
      { icon: Globe, label: "Browser Extension", href: "/extension-demo" },
      { icon: Layers, label: "Business Canvas", href: "/business-canvas" },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [protectionActive] = useState(true);
  const { user, logout } = useAuth();
  const { isDemoMode, enableDemoMode, disableDemoMode } = useDemo();

  const handleLogout = () => {
    logout();
    toast.success("You've been signed out.");
    navigate("/login");
  };

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "P";

  const childCount = user?.children?.length ?? 0;

  return (
    <div className={cn("flex h-screen bg-[oklch(0.97_0.01_80)] overflow-hidden", isDemoMode && "pt-[44px]")}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        data-tour="sidebar"
        className={cn(
          "faithshield247-sidebar fixed lg:relative inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="/logo.png"
              alt="FaithShield247"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base tracking-tight">
              FaithShield247
            </h1>
            <p className="text-white/40 text-xs">Family Protection</p>
          </div>
          <button
            aria-label="Close menu"
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Protection Status */}
        <div className="mx-4 mt-4 mb-2 rounded-lg px-3 py-2.5 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            {protectionActive ? (
              <Wifi size={14} className="text-emerald-400" />
            ) : (
              <WifiOff size={14} className="text-red-400" />
            )}
            <span className="text-xs font-medium text-white/80">
              Protection {protectionActive ? "Active" : "Inactive"}
            </span>
            <div className={cn(
              "ml-auto w-2 h-2 rounded-full",
              protectionActive ? "bg-emerald-400 animate-pulse" : "bg-red-400"
            )} />
          </div>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto space-y-4">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 py-2">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                          isActive
                            ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                            : "text-white/65 hover:text-white hover:bg-white/10"
                        )}
                      >
                        <item.icon
                          size={17}
                          className={cn(!isActive && "group-hover:scale-105 transition-transform")}
                        />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="ml-auto" />}
                        {item.badge && !isActive && (
                          <Badge className="ml-auto bg-red-500/80 text-white text-[10px] px-1.5 py-0 h-4 border-0">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="gold-divider mx-4 my-2" />

        {/* Demo Mode toggle */}
        <div className="px-3 pb-2">
          <button
            onClick={() => isDemoMode ? disableDemoMode() : enableDemoMode()}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full",
              isDemoMode
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/10"
            )}
          >
            <Presentation size={17} />
            <span>Demo Mode</span>
            {isDemoMode && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-[oklch(0.15_0.03_255/0.2)] px-1.5 py-0.5 rounded">
                On
              </span>
            )}
          </button>
        </div>

        {/* User section */}
        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[oklch(0.72_0.12_75)] flex items-center justify-center text-[oklch(0.15_0.03_255)] font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {user ? `${user.firstName} ${user.lastName}` : "Parent Account"}
              </p>
              <p className="text-white/40 text-xs truncate">
                {childCount} {childCount === 1 ? "child" : "children"} protected
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
              className="text-white/40 hover:text-white transition-colors"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-[oklch(0.9_0.01_80)] px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            aria-label="Open navigation menu"
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1">
            {title && (
              <div>
                <h2 className="text-lg font-semibold text-[oklch(0.15_0.03_255)]">
                  {title}
                </h2>
                {subtitle && <p className="text-sm text-[oklch(0.5_0.02_255)]">{subtitle}</p>}
              </div>
            )}
          </div>

          <div data-tour="notifications">
            <NotificationCenter />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

