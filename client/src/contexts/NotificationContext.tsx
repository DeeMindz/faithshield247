/* FaithShield247 Notification System — Sacred Modernism
 * Manages real-time alerts: blocked sites, keyword triggers, screen-time warnings
 * Simulates push notifications with toast + in-app notification center
 */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";

export type NotificationType = "blocked_site" | "keyword_alert" | "screen_time" | "system" | "devotional" | "partner";

export type NotificationSeverity = "critical" | "warning" | "info";

export interface AppNotification {
  id: string;
  type: NotificationType;
  severity: NotificationSeverity;
  title: string;
  message: string;
  child?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationPreferences {
  blockedSites: boolean;
  keywordAlerts: boolean;
  screenTime: boolean;
  devotionalReminders: boolean;
  partnerCheckIns: boolean;
  pushEnabled: boolean;
  soundEnabled: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
  addNotification: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  isPaused: boolean;
  togglePause: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

// Simulated real-time alert pool
const alertPool: Omit<AppNotification, "id" | "timestamp" | "read">[] = [
  {
    type: "blocked_site",
    severity: "warning",
    title: "Blocked Site Attempt",
    message: "Emma attempted to access TikTok.com — blocked by content filter.",
    child: "Emma",
    actionUrl: "/reports",
  },
  {
    type: "keyword_alert",
    severity: "critical",
    title: "Keyword Alert Triggered",
    message: "Concerning language detected in Caleb's chat: possible bullying-related content.",
    child: "Caleb",
    actionUrl: "/reports",
  },
  {
    type: "screen_time",
    severity: "warning",
    title: "Screen Time Warning",
    message: "Emma has used 80% of her daily screen time limit (2h 24m of 3h).",
    child: "Emma",
    actionUrl: "/profiles",
  },
  {
    type: "blocked_site",
    severity: "warning",
    title: "Blocked Content",
    message: "Caleb attempted to access a site flagged for violent content — blocked.",
    child: "Caleb",
    actionUrl: "/filter-demo",
  },
  {
    type: "keyword_alert",
    severity: "critical",
    title: "Predatory Language Detected",
    message: "AI flagged a message in Emma's inbox with potential grooming patterns. Immediate review recommended.",
    child: "Emma",
    actionUrl: "/reports",
  },
  {
    type: "screen_time",
    severity: "info",
    title: "Screen Time Limit Reached",
    message: "Lily has reached her daily screen time limit of 1.5 hours. Device will enter wind-down mode.",
    child: "Lily",
    actionUrl: "/profiles",
  },
  {
    type: "devotional",
    severity: "info",
    title: "Devotional Reminder",
    message: "Emma hasn't completed her daily devotional yet. A gentle reminder has been sent to her device.",
    child: "Emma",
  },
  {
    type: "blocked_site",
    severity: "warning",
    title: "Social Media Blocked",
    message: "Emma attempted to access Instagram.com — blocked during school hours.",
    child: "Emma",
    actionUrl: "/reports",
  },
  {
    type: "system",
    severity: "info",
    title: "Weekly Report Ready",
    message: "Your family's weekly activity report is ready. Review insights and conversation starters.",
    actionUrl: "/reports",
  },
  {
    type: "partner",
    severity: "info",
    title: "Accountability Check-In",
    message: "Pastor Mike sent a check-in message to Emma's Teen Mode.",
    child: "Emma",
    actionUrl: "/teen-mode",
  },
];

// Initial seed notifications
const seedNotifications: AppNotification[] = [
  {
    id: "seed-1",
    type: "blocked_site",
    severity: "warning",
    title: "Blocked Site Attempt",
    message: "Emma attempted to access Reddit.com — blocked by content filter.",
    child: "Emma",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    actionUrl: "/reports",
  },
  {
    id: "seed-2",
    type: "keyword_alert",
    severity: "critical",
    title: "Keyword Alert",
    message: "Concerning search terms detected on Caleb's device. Review recommended.",
    child: "Caleb",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    actionUrl: "/reports",
  },
  {
    id: "seed-3",
    type: "screen_time",
    severity: "warning",
    title: "Screen Time Warning",
    message: "Caleb has used 90% of his daily screen time limit.",
    child: "Caleb",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    actionUrl: "/profiles",
  },
  {
    id: "seed-4",
    type: "system",
    severity: "info",
    title: "Protection Updated",
    message: "FaithShield247 filter database updated with 1,247 new entries.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: true,
  },
];

let notifCounter = 0;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    blockedSites: true,
    keywordAlerts: true,
    screenTime: true,
    devotionalReminders: true,
    partnerCheckIns: true,
    pushEnabled: true,
    soundEnabled: true,
  });
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addNotification = useCallback(
    (n: Omit<AppNotification, "id" | "timestamp" | "read">) => {
      const newNotif: AppNotification = {
        ...n,
        id: `notif-${Date.now()}-${notifCounter++}`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev.slice(0, 49)]); // Keep max 50

      // Show toast for push notification simulation
      if (preferences.pushEnabled) {
        const toastFn = n.severity === "critical" ? toast.error : n.severity === "warning" ? toast.warning : toast.info;
        toastFn(n.title, {
          description: n.message,
          duration: n.severity === "critical" ? 8000 : 5000,
        });
      }
    },
    [preferences.pushEnabled]
  );

  // Simulated real-time alerts every 15-30 seconds
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 15000; // 15-30s
      intervalRef.current = setTimeout(() => {
        const alert = alertPool[Math.floor(Math.random() * alertPool.length)];

        // Check preferences
        if (alert.type === "blocked_site" && !preferences.blockedSites) return scheduleNext();
        if (alert.type === "keyword_alert" && !preferences.keywordAlerts) return scheduleNext();
        if (alert.type === "screen_time" && !preferences.screenTime) return scheduleNext();
        if (alert.type === "devotional" && !preferences.devotionalReminders) return scheduleNext();
        if (alert.type === "partner" && !preferences.partnerCheckIns) return scheduleNext();

        addNotification(alert);
        scheduleNext();
      }, delay) as unknown as ReturnType<typeof setInterval>;
    };

    scheduleNext();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current as unknown as number);
    };
  }, [isPaused, preferences, addNotification]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  const updatePreferences = (prefs: Partial<NotificationPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        preferences,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAll,
        updatePreferences,
        addNotification,
        isPaused,
        togglePause: () => setIsPaused((p) => !p),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
