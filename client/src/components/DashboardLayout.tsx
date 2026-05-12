/* FaithShield247 DashboardLayout — Sacred Modernism
 * Deep navy sidebar with gold accents, warm off-white content area
 * Auth-aware: shows real user name, child count, and logout
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useDemo } from "@/contexts/DemoContext";
import { toast } from "sonner";
import NotificationCenter from "@/components/NotificationCenter";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Activity, label: "Activity Timeline", href: "/activity" },
  { icon: Users, label: "Profiles", href: "/profiles" },
  { icon: Shield, label: "Filter Demo", href: "/filter-demo" },
  { icon: BookOpen, label: "Content Library", href: "/content-library" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: FileText, label: "Safety Report", href: "/safety-report" },
  { icon: Layers, label: "Business Canvas", href: "/business-canvas" },
  { icon: Settings, label: "Settings", href: "/settings" },
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/119887285/aBfvADsrbdM32MGZADKNdR/faithshield247-logo-A4Lo5NmYbnLa97AHWfiJdy.webp"
              alt="FaithShield247"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              FaithShield247
            </h1>
            <p className="text-white/40 text-xs">Family Protection</p>
          </div>
          <button
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

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 py-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                    isActive
                      ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                      : "text-white/65 hover:text-white hover:bg-white/8"
                  )}
                >
                  <item.icon size={17} className={cn(isActive ? "" : "group-hover:scale-105 transition-transform")} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                  {item.label === "Reports" && !isActive && (
                    <Badge className="ml-auto bg-red-500/80 text-white text-[10px] px-1.5 py-0 h-4 border-0">3</Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Gold divider */}
        <div className="gold-divider mx-4 my-2" />

        {/* Admin Portal & Extension Demo */}
        <div className="px-3 pb-0.5">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 py-2">
            Advanced
          </p>
          <Link href="/admin">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              location === "/admin"
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/8"
            )}>
              <Church size={17} />
              <span>Admin Portal</span>
            </div>
          </Link>
          <Link href="/extension-demo">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mt-0.5",
              location === "/extension-demo"
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/8"
            )}>
              <Globe size={17} />
              <span>Browser Extension</span>
            </div>
          </Link>
        </div>

        {/* Teen Mode link */}
        <div className="px-3 pb-1">
          <Link href="/teen-mode">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              location === "/teen-mode"
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/8"
            )}>
              <Sparkles size={17} />
              <span>Teen Mode</span>
            </div>
          </Link>
        </div>

        {/* Child View link */}
        <div className="px-3 pb-2">
          <Link href="/child-view">
            <div className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              location === "/child-view"
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/8"
            )}>
              <BookOpen size={17} />
              <span>Child View</span>
            </div>
          </Link>
        </div>

        {/* Demo Mode toggle */}
        <div className="px-3 pb-2">
          <button
            onClick={() => isDemoMode ? disableDemoMode() : enableDemoMode()}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full",
              isDemoMode
                ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)]"
                : "text-white/65 hover:text-white hover:bg-white/8"
            )}
          >
            <Presentation size={17} />
            <span>Demo Mode</span>
            {isDemoMode && (
              <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-[oklch(0.15_0.03_255/0.2)] px-1.5 py-0.5 rounded">On</span>
            )}
          </button>
        </div>

        {/* Bottom user section */}
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
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1">
            {title && (
              <div>
                <h2 className="text-lg font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {title}
                </h2>
                {subtitle && <p className="text-sm text-[oklch(0.5_0.02_255)]">{subtitle}</p>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div data-tour="notifications">
              <NotificationCenter />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-[oklch(0.9_0.01_80)] gap-1.5"
              onClick={handleLogout}
            >
              <LogOut size={13} /> Sign Out
            </Button>
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
