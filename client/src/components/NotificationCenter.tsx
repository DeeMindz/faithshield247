/* FaithShield247 Notification Center — Sacred Modernism
 * Dropdown panel showing real-time alerts, grouped by severity
 */
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Bell, Shield, AlertTriangle, Clock, X, Check, CheckCheck,
  Trash2, Settings, Pause, Play, BookOpen, Users, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNotifications, type AppNotification, type NotificationType } from "@/contexts/NotificationContext";

const typeConfig: Record<NotificationType, { icon: typeof Shield; color: string; bg: string }> = {
  blocked_site: { icon: Shield, color: "text-amber-500", bg: "bg-amber-500/10" },
  keyword_alert: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
  screen_time: { icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  system: { icon: Info, color: "text-[oklch(0.5_0.02_255)]", bg: "bg-[oklch(0.18_0.06_255/0.06)]" },
  devotional: { icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  partner: { icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const panelRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
    isPaused,
    togglePause,
  } = useNotifications();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const handleNotificationClick = (n: AppNotification) => {
    markAsRead(n.id);
    if (n.actionUrl) {
      navigate(n.actionUrl);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold px-1 animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[520px] bg-white rounded-xl border border-[oklch(0.9_0.01_80)] shadow-xl overflow-hidden z-50 animate-fade-up">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[oklch(0.94_0.01_80)] bg-[oklch(0.99_0.005_80)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Notifications
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={togglePause}
                  title={isPaused ? "Resume alerts" : "Pause alerts"}
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isPaused ? "text-amber-500 bg-amber-50 hover:bg-amber-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {isPaused ? <Play size={13} /> : <Pause size={13} />}
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    title="Mark all as read"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <CheckCheck size={13} />
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    title="Clear all"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              {(["all", "unread"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md transition-colors capitalize",
                    filter === f
                      ? "bg-[oklch(0.18_0.06_255)] text-white"
                      : "text-[oklch(0.5_0.02_255)] hover:bg-[oklch(0.94_0.01_80)]"
                  )}
                >
                  {f} {f === "unread" && unreadCount > 0 ? `(${unreadCount})` : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Notification list */}
          <div className="overflow-y-auto max-h-[400px]">
            {isPaused && (
              <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                <Pause size={12} className="text-amber-500" />
                <span className="text-xs text-amber-700">Alerts paused — you won't receive new notifications</span>
              </div>
            )}

            {displayed.length === 0 ? (
              <div className="py-12 text-center">
                <Bell size={28} className="text-[oklch(0.85_0.01_80)] mx-auto mb-3" />
                <p className="text-sm text-[oklch(0.5_0.02_255)]">
                  {filter === "unread" ? "No unread notifications" : "No notifications yet"}
                </p>
              </div>
            ) : (
              displayed.map((n) => {
                const config = typeConfig[n.type];
                const Icon = config.icon;
                return (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={cn(
                      "px-4 py-3 border-b border-[oklch(0.96_0.005_80)] hover:bg-[oklch(0.97_0.01_80)] transition-colors cursor-pointer group",
                      !n.read && "bg-[oklch(0.98_0.008_75)]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", config.bg)}>
                        <Icon size={15} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <h4 className={cn("text-sm font-medium leading-snug", n.read ? "text-[oklch(0.4_0.02_255)]" : "text-[oklch(0.15_0.03_255)]")}>
                              {n.title}
                            </h4>
                            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.12_75)] flex-shrink-0" />}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); clearNotification(n.id); }}
                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all p-0.5"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <p className={cn("text-xs leading-relaxed mt-0.5", n.read ? "text-[oklch(0.6_0.02_255)]" : "text-[oklch(0.45_0.02_255)]")}>
                          {n.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-[oklch(0.6_0.02_255)]">{timeAgo(n.timestamp)}</span>
                          {n.child && (
                            <>
                              <span className="text-[oklch(0.85_0.01_80)]">·</span>
                              <span className="text-[10px] font-medium text-[oklch(0.5_0.02_255)]">{n.child}</span>
                            </>
                          )}
                          {n.severity === "critical" && (
                            <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                              Critical
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-[oklch(0.94_0.01_80)] bg-[oklch(0.99_0.005_80)] flex items-center justify-between">
            <button
              onClick={() => { navigate("/settings"); setOpen(false); }}
              className="text-xs text-[oklch(0.5_0.02_255)] hover:text-[oklch(0.18_0.06_255)] transition-colors flex items-center gap-1.5"
            >
              <Settings size={12} /> Notification Settings
            </button>
            <span className="text-[10px] text-[oklch(0.7_0.01_80)]">{notifications.length} total</span>
          </div>
        </div>
      )}
    </div>
  );
}
