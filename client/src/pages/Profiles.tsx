/* FaithShield247 Profiles Page — manage child profiles and protection settings */
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Clock, Plus, Edit2, Trash2, CheckCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const initialProfiles = [
  {
    id: 1, name: "Emma", age: 11, avatar: "E", color: "oklch(0.55 0.15 255)",
    screenTimeLimit: 3, currentTime: "2h 34m", status: "online",
    filters: { adultContent: true, violence: true, gambling: true, socialMedia: false, gaming: false, drugs: true },
    devices: ["iPad", "School Laptop"],
  },
  {
    id: 2, name: "Caleb", age: 8, avatar: "C", color: "oklch(0.55 0.15 145)",
    screenTimeLimit: 2, currentTime: "1h 12m", status: "offline",
    filters: { adultContent: true, violence: true, gambling: true, socialMedia: true, gaming: false, drugs: true },
    devices: ["Family Tablet"],
  },
  {
    id: 3, name: "Lily", age: 6, avatar: "L", color: "oklch(0.6 0.15 75)",
    screenTimeLimit: 1.5, currentTime: "0h 45m", status: "online",
    filters: { adultContent: true, violence: true, gambling: true, socialMedia: true, gaming: true, drugs: true },
    devices: ["Kids Tablet"],
  },
];

const filterLabels: Record<string, string> = {
  adultContent: "Adult Content",
  violence: "Violence & Gore",
  gambling: "Gambling",
  socialMedia: "Social Media",
  gaming: "Online Gaming",
  drugs: "Drug Culture",
};

export default function Profiles() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [selected, setSelected] = useState(initialProfiles[0]);
  const [editing, setEditing] = useState(false);

  const updateFilter = (key: string, value: boolean) => {
    setProfiles(prev => prev.map(p =>
      p.id === selected.id ? { ...p, filters: { ...p.filters, [key]: value } } : p
    ));
    setSelected(prev => ({ ...prev, filters: { ...prev.filters, [key]: value } }));
    toast.success(`${filterLabels[key]} ${value ? "blocked" : "allowed"} for ${selected.name}`);
  };

  const updateLimit = (val: number[]) => {
    setProfiles(prev => prev.map(p => p.id === selected.id ? { ...p, screenTimeLimit: val[0] } : p));
    setSelected(prev => ({ ...prev, screenTimeLimit: val[0] }));
  };

  return (
    <DashboardLayout title="Child Profiles" subtitle="Manage protection settings for each child">
      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile list */}
          <div className="space-y-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => { setSelected(profile); setEditing(false); }}
                className={`stat-card p-4 cursor-pointer transition-all ${selected.id === profile.id ? "ring-2 ring-[oklch(0.72_0.12_75)]" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: profile.color }}>
                    {profile.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[oklch(0.15_0.03_255)]">{profile.name}</span>
                      <span className="text-xs text-[oklch(0.5_0.02_255)]">Age {profile.age}</span>
                      <div className={`ml-auto w-2 h-2 rounded-full ${profile.status === "online" ? "bg-emerald-400" : "bg-gray-300"}`} />
                    </div>
                    <p className="text-xs text-[oklch(0.5_0.02_255)] mt-0.5">{profile.currentTime} of {profile.screenTimeLimit}h today</p>
                    <div className="w-full bg-[oklch(0.9_0.01_80)] rounded-full h-1 mt-1.5">
                      <div className="h-1 rounded-full bg-[oklch(0.55_0.15_255)]" style={{ width: `${Math.min((parseFloat(profile.currentTime) / profile.screenTimeLimit) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {profile.devices.map(d => (
                    <Badge key={d} variant="secondary" className="text-[10px] px-1.5 py-0">{d}</Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2 border-dashed text-[oklch(0.5_0.02_255)]" onClick={() => toast.info("Add child profile — coming in full version")}>
              <Plus size={16} /> Add Child Profile
            </Button>
          </div>

          {/* Profile detail */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header */}
            <div className="stat-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ background: selected.color }}>
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selected.name}
                  </h3>
                  <p className="text-sm text-[oklch(0.5_0.02_255)]">Age {selected.age} · {selected.devices.join(", ")}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs" onClick={() => setEditing(!editing)}>
                    <Edit2 size={13} /> {editing ? "Done" : "Edit"}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs text-red-500 hover:text-red-600" onClick={() => toast.error("Delete profile — confirmation required in full version")}>
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Screen Time */}
            <div className="stat-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-[oklch(0.18_0.06_255)]" />
                <h4 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Screen Time Limit
                </h4>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-bold text-[oklch(0.18_0.06_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selected.screenTimeLimit}h
                </span>
                <span className="text-sm text-[oklch(0.5_0.02_255)]">per day</span>
                <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  {selected.currentTime} used today
                </Badge>
              </div>
              <Slider
                value={[selected.screenTimeLimit]}
                onValueChange={updateLimit}
                min={0.5} max={6} step={0.5}
                className="mt-2"
                disabled={!editing}
              />
              <div className="flex justify-between text-xs text-[oklch(0.5_0.02_255)] mt-1">
                <span>30 min</span>
                <span>6 hours</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Bedtime Lock", "Homework Mode", "Weekend Mode"].map((mode) => (
                  <div key={mode} className="bg-[oklch(0.97_0.01_80)] rounded-lg p-3 text-center">
                    <p className="text-xs font-medium text-[oklch(0.15_0.03_255)]">{mode}</p>
                    <Switch className="mt-2" disabled={!editing} onCheckedChange={() => toast.success(`${mode} toggled for ${selected.name}`)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Content Filters */}
            <div className="stat-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-[oklch(0.18_0.06_255)]" />
                <h4 className="font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Content Filters
                </h4>
                <Badge className="ml-auto bg-[oklch(0.18_0.06_255/0.08)] text-[oklch(0.18_0.06_255)] border-0 text-xs">
                  {Object.values(selected.filters).filter(Boolean).length} active
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(selected.filters).map(([key, value]) => (
                  <div key={key} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    value ? "bg-red-50 border-red-100" : "bg-[oklch(0.97_0.01_80)] border-[oklch(0.9_0.01_80)]"
                  }`}>
                    <div className="flex items-center gap-2">
                      {value ? <X size={13} className="text-red-500" /> : <CheckCircle size={13} className="text-emerald-500" />}
                      <span className="text-xs font-medium text-[oklch(0.15_0.03_255)]">{filterLabels[key]}</span>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(v) => updateFilter(key, v)}
                      disabled={!editing}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
