/* FaithShield247 Settings — Sacred Modernism
 * Notification preferences wired to NotificationContext, auth-aware account info
 */
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, Shield, Smartphone, Users, CreditCard, Globe, Mail, Lock, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNotifications } from "@/contexts/NotificationContext";
import { useAuth } from "@/contexts/AuthContext";
import { resetOnboardingTour } from "@/components/OnboardingTour";
import { useState } from "react";

const protectionSettings = [
  { label: "Strict mode (block all unverified sites)", key: "strict", default: false },
  { label: "Image scanning enabled", key: "images", default: true },
  { label: "Chat monitoring enabled", key: "chat", default: true },
  { label: "Safe Search enforcement", key: "safesearch", default: true },
];

const deviceSettings = [
  { label: "Emma's iPad", key: "ipad", default: true },
  { label: "Caleb's Tablet", key: "tablet", default: true },
  { label: "School Laptop", key: "laptop", default: true },
  { label: "Family Smart TV", key: "tv", default: false },
];

const planInfo = {
  name: "Premium Family",
  price: "$14.99/month",
  nextBilling: "April 25, 2026",
  features: ["Unlimited devices", "Full content library", "Anti-grooming alerts", "Priority support"],
};

export default function Settings() {
  const { preferences, updatePreferences, isPaused, togglePause } = useNotifications();
  const { user } = useAuth();
  const [tourTriggered, setTourTriggered] = useState(false);

  return (
    <DashboardLayout title="Settings" subtitle="Configure your FaithShield247 protection">
      <div className="p-6 space-y-6 max-w-3xl">

        {/* Plan */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={18} className="text-[oklch(0.18_0.06_255)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Current Plan
            </h3>
            <Badge className="ml-auto bg-[oklch(0.72_0.12_75)] text-[oklch(0.15_0.03_255)] border-0">Active</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-lg font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>{planInfo.name}</p>
              <p className="text-sm text-[oklch(0.5_0.02_255)]">{planInfo.price} · Next billing: {planInfo.nextBilling}</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto text-xs border-[oklch(0.9_0.01_80)]" onClick={() => toast.info("Billing management in full version")}>
              Manage Plan
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {planInfo.features.map((f) => (
              <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
            ))}
          </div>
        </div>

        {/* Account */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users size={18} className="text-[oklch(0.18_0.06_255)]" />
            <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Account
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: Mail, label: "Email", value: user?.email || "parent@family.com" },
              { icon: Lock, label: "Password", value: "••••••••••" },
              { icon: Globe, label: "Language", value: "English" },
              { icon: Shield, label: "2FA", value: "Enabled" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-[oklch(0.97_0.01_80)] border border-[oklch(0.9_0.01_80)]">
                <item.icon size={15} className="text-[oklch(0.5_0.02_255)]" />
                <div className="flex-1">
                  <p className="text-xs text-[oklch(0.5_0.02_255)]">{item.label}</p>
                  <p className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{item.value}</p>
                </div>
                <button className="text-xs text-[oklch(0.18_0.06_255)] hover:underline" onClick={() => toast.info(`Edit ${item.label} — in full version`)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences — wired to NotificationContext */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-1">
            <Bell size={18} className="text-[oklch(0.18_0.06_255)]" />
            <div className="flex-1">
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Notification Preferences
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)]">Control which alerts you receive in real-time</p>
            </div>
          </div>

          {/* Global controls */}
          <div className="flex items-center gap-3 mt-4 mb-5 p-3 rounded-lg bg-[oklch(0.97_0.01_80)] border border-[oklch(0.9_0.01_80)]">
            <button
              onClick={togglePause}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isPaused
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              }`}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
              {isPaused ? "Resume Alerts" : "Pause All Alerts"}
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {preferences.soundEnabled ? <Volume2 size={14} className="text-[oklch(0.5_0.02_255)]" /> : <VolumeX size={14} className="text-[oklch(0.5_0.02_255)]" />}
              <Switch
                checked={preferences.soundEnabled}
                onCheckedChange={(v) => {
                  updatePreferences({ soundEnabled: v });
                  toast.success(`Sound ${v ? "enabled" : "disabled"}`);
                }}
              />
              <span className="text-xs text-[oklch(0.5_0.02_255)]">Sound</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)]">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)]">Push notifications</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">Show toast alerts for new notifications</p>
              </div>
              <Switch
                checked={preferences.pushEnabled}
                onCheckedChange={(v) => {
                  updatePreferences({ pushEnabled: v });
                  toast.success(`Push notifications ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)]">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)]">Blocked site alerts</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">When a child attempts to access a blocked website</p>
              </div>
              <Switch
                checked={preferences.blockedSites}
                onCheckedChange={(v) => {
                  updatePreferences({ blockedSites: v });
                  toast.success(`Blocked site alerts ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)]">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)] font-medium">Keyword / grooming alerts</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">AI-detected concerning language in messages or searches</p>
              </div>
              <Switch
                checked={preferences.keywordAlerts}
                onCheckedChange={(v) => {
                  updatePreferences({ keywordAlerts: v });
                  toast.success(`Keyword alerts ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)]">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)]">Screen time warnings</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">When a child approaches or exceeds their daily limit</p>
              </div>
              <Switch
                checked={preferences.screenTime}
                onCheckedChange={(v) => {
                  updatePreferences({ screenTime: v });
                  toast.success(`Screen time alerts ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)]">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)]">Devotional reminders</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">Reminders when children haven't completed daily devotionals</p>
              </div>
              <Switch
                checked={preferences.devotionalReminders}
                onCheckedChange={(v) => {
                  updatePreferences({ devotionalReminders: v });
                  toast.success(`Devotional reminders ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <span className="text-sm text-[oklch(0.3_0.02_255)]">Partner check-in alerts</span>
                <p className="text-xs text-[oklch(0.6_0.02_255)]">When accountability partners send messages</p>
              </div>
              <Switch
                checked={preferences.partnerCheckIns}
                onCheckedChange={(v) => {
                  updatePreferences({ partnerCheckIns: v });
                  toast.success(`Partner alerts ${v ? "enabled" : "disabled"}`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Protection Level */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={18} className="text-[oklch(0.18_0.06_255)]" />
            <div>
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Protection Level
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)]">Adjust the sensitivity of the AI filter</p>
            </div>
          </div>
          <div className="space-y-3">
            {protectionSettings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)] last:border-0">
                <span className="text-sm text-[oklch(0.3_0.02_255)]">{setting.label}</span>
                <Switch
                  defaultChecked={setting.default}
                  onCheckedChange={(v) => toast.success(`${setting.label} ${v ? "enabled" : "disabled"}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone size={18} className="text-[oklch(0.18_0.06_255)]" />
            <div>
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Devices
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)]">Manage connected devices</p>
            </div>
          </div>
          <div className="space-y-3">
            {deviceSettings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between py-2 border-b border-[oklch(0.94_0.012_80)] last:border-0">
                <span className="text-sm text-[oklch(0.3_0.02_255)]">{setting.label}</span>
                <Switch
                  defaultChecked={setting.default}
                  onCheckedChange={(v) => toast.success(`${setting.label} ${v ? "enabled" : "disabled"}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Help & Tour */}
        <div className="stat-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={18} className="text-[oklch(0.18_0.06_255)]" />
            <div>
              <h3 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Help & Onboarding
              </h3>
              <p className="text-xs text-[oklch(0.5_0.02_255)]">Replay the dashboard tour or get help</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="text-sm border-[oklch(0.9_0.01_80)] gap-2"
              onClick={() => {
                resetOnboardingTour();
                toast.success("Tour reset! Navigate to the Dashboard to start the tour.");
              }}
            >
              Replay Dashboard Tour
            </Button>
          </div>
        </div>

        <div className="text-center pb-4">
          <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 text-sm" onClick={() => toast.error("Account deletion requires confirmation — in full version")}>
            Delete Account
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
