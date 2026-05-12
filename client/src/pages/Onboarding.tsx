/* FaithShield247 Onboarding Wizard â€” Sacred Modernism
 * 5-step wizard: Welcome â†’ Add Children â†’ Configure Filters â†’ Add Devices â†’ Complete
 * Full-screen, warm and welcoming, faith-rooted tone
 */
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Shield, Users, Smartphone, CheckCircle, ArrowRight, ArrowLeft,
  Plus, Trash2, ChevronRight, Star, Loader2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useAuth, type ChildProfile } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SHIELD_IMG = "/logo.png";

const AVATAR_COLORS = [
  "oklch(0.55 0.15 255)",
  "oklch(0.55 0.15 145)",
  "oklch(0.6 0.15 75)",
  "oklch(0.55 0.15 300)",
  "oklch(0.55 0.15 30)",
];

const FILTER_LABELS: Record<string, { label: string; desc: string }> = {
  adultContent: { label: "Adult Content", desc: "Pornography and explicit material" },
  violence: { label: "Violence & Gore", desc: "Graphic violent content and imagery" },
  gambling: { label: "Gambling", desc: "Online gambling and betting sites" },
  socialMedia: { label: "Social Media", desc: "Facebook, Instagram, TikTok, etc." },
  gaming: { label: "Online Gaming", desc: "Multiplayer and unmoderated games" },
  drugs: { label: "Drug Culture", desc: "Drug promotion and related content" },
};

const DEVICE_OPTIONS = [
  { id: "iphone", label: "iPhone / iPad", icon: "ðŸ“±" },
  { id: "android", label: "Android Phone / Tablet", icon: "ðŸ“²" },
  { id: "laptop-mac", label: "Mac / MacBook", icon: "ðŸ’»" },
  { id: "laptop-win", label: "Windows PC / Laptop", icon: "ðŸ–¥ï¸" },
  { id: "chromebook", label: "Chromebook", icon: "ðŸ““" },
  { id: "tv", label: "Smart TV", icon: "ðŸ“º" },
  { id: "gaming", label: "Gaming Console", icon: "ðŸŽ®" },
  { id: "router", label: "Home Router (all devices)", icon: "ðŸ“¡" },
];

interface NewChild {
  name: string;
  age: string;
  screenTimeLimit: number;
  filters: Record<string, boolean>;
}

const defaultFilters = {
  adultContent: true,
  violence: true,
  gambling: true,
  socialMedia: false,
  gaming: false,
  drugs: true,
};

const steps = [
  { id: 1, label: "Welcome", icon: Star },
  { id: 2, label: "Children", icon: Users },
  { id: 3, label: "Protection", icon: Shield },
  { id: 4, label: "Devices", icon: Smartphone },
  { id: 5, label: "Complete", icon: CheckCircle },
];

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { user, addChild, completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [children, setChildren] = useState<NewChild[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [finishing, setFinishing] = useState(false);

  // New child form state
  const [newChild, setNewChild] = useState<NewChild>({
    name: "",
    age: "",
    screenTimeLimit: 2,
    filters: { ...defaultFilters },
  });
  const [addingChild, setAddingChild] = useState(false);
  const [childError, setChildError] = useState("");

  // Selected child index for filter config step
  const [selectedChildIdx, setSelectedChildIdx] = useState(0);

  const canProceed = () => {
    if (currentStep === 2) return children.length > 0;
    return true;
  };

  const addChildToList = () => {
    if (!newChild.name.trim()) { setChildError("Please enter the child's name."); return; }
    const age = parseInt(newChild.age);
    if (!newChild.age || isNaN(age) || age < 1 || age > 17) { setChildError("Please enter a valid age (1â€“17)."); return; }
    setChildren((prev) => [...prev, { ...newChild }]);
    setNewChild({ name: "", age: "", screenTimeLimit: 2, filters: { ...defaultFilters } });
    setAddingChild(false);
    setChildError("");
  };

  const removeChild = (idx: number) => {
    setChildren((prev) => prev.filter((_, i) => i !== idx));
    if (selectedChildIdx >= idx && selectedChildIdx > 0) setSelectedChildIdx(selectedChildIdx - 1);
  };

  const updateChildFilter = (childIdx: number, key: string, value: boolean) => {
    setChildren((prev) => prev.map((c, i) => i === childIdx ? { ...c, filters: { ...c.filters, [key]: value } } : c));
  };

  const updateChildLimit = (childIdx: number, val: number[]) => {
    setChildren((prev) => prev.map((c, i) => i === childIdx ? { ...c, screenTimeLimit: val[0] } : c));
  };

  const toggleDevice = (id: string) => {
    setSelectedDevices((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);
  };

  const finish = async () => {
    setFinishing(true);
    // Save all children to auth context
    children.forEach((child, idx) => {
      const profile: Omit<ChildProfile, "id"> = {
        name: child.name,
        age: parseInt(child.age),
        avatar: child.name.charAt(0).toUpperCase(),
        color: AVATAR_COLORS[idx % AVATAR_COLORS.length],
        screenTimeLimit: child.screenTimeLimit,
        filters: child.filters as ChildProfile["filters"],
        devices: selectedDevices.map((d) => DEVICE_OPTIONS.find((o) => o.id === d)?.label || d),
      };
      addChild(profile);
    });
    await new Promise((r) => setTimeout(r, 1200));
    completeOnboarding();
    setFinishing(false);
    toast.success("FaithShield247 is active! Your family is now protected.");
    navigate("/dashboard");
  };

  const next = () => {
    if (currentStep < 5) setCurrentStep((s) => s + 1);
  };
  const back = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.01_80)] flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <header className="bg-[oklch(0.18_0.06_255)] px-6 py-4 flex items-center gap-3">
        <img src={SHIELD_IMG} alt="FaithShield247" className="w-8 h-8 rounded-lg object-cover" />
        <span className="text-white font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>FaithShield247</span>
        <div className="ml-auto text-white/50 text-sm">
          {user?.firstName && `Welcome, ${user.firstName}`}
        </div>
      </header>

      {/* Step progress bar */}
      <div className="bg-white border-b border-[oklch(0.9_0.01_80)] px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const isComplete = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isComplete ? "bg-emerald-500 text-white" :
                      isCurrent ? "bg-[oklch(0.18_0.06_255)] text-white" :
                      "bg-[oklch(0.9_0.01_80)] text-[oklch(0.6_0.02_255)]"
                    }`}>
                      {isComplete ? <CheckCircle size={16} /> : <step.icon size={16} />}
                    </div>
                    <span className={`text-[10px] mt-1 font-medium hidden sm:block ${
                      isCurrent ? "text-[oklch(0.18_0.06_255)]" : isComplete ? "text-emerald-600" : "text-[oklch(0.6_0.02_255)]"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${isComplete ? "bg-emerald-400" : "bg-[oklch(0.9_0.01_80)]"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">

          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center animate-fade-up">
              <img src={SHIELD_IMG} alt="FaithShield247" className="w-20 h-20 mx-auto mb-6 rounded-2xl object-cover shield-pulse" />
              <h1 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welcome to FaithShield247,<br />
                <em className="text-[oklch(0.18_0.06_255)]">{user?.firstName || "friend"}.</em>
              </h1>
              <p className="text-[oklch(0.5_0.02_255)] text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                In the next few minutes, we'll set up protection for your family. You'll add your children's profiles, configure their content filters, and connect your devices.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
                {[
                  { icon: "ðŸ‘¶", label: "Add children", desc: "Create a profile for each child" },
                  { icon: "ðŸ›¡ï¸", label: "Set filters", desc: "Customise protection per child" },
                  { icon: "ðŸ“±", label: "Connect devices", desc: "Protect all your family's devices" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-[oklch(0.9_0.01_80)] text-center shadow-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-xs font-semibold text-[oklch(0.15_0.03_255)]">{item.label}</p>
                    <p className="text-[10px] text-[oklch(0.5_0.02_255)] mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="verse-card rounded-xl p-4 max-w-lg mx-auto mb-8">
                <p className="text-sm italic text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Train up a child in the way he should go; even when he is old he will not depart from it."
                </p>
                <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1 font-medium">Proverbs 22:6</p>
              </div>
              <Button onClick={next} size="lg" className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 gap-2 px-8">
                Let's Get Started <ArrowRight size={18} />
              </Button>
            </div>
          )}

          {/* Step 2: Add Children */}
          {currentStep === 2 && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Add your children
                </h2>
                <p className="text-[oklch(0.5_0.02_255)]">Create a profile for each child you want to protect.</p>
              </div>

              {/* Children list */}
              {children.length > 0 && (
                <div className="space-y-3 mb-4">
                  {children.map((child, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-[oklch(0.9_0.01_80)] flex items-center gap-4 shadow-sm">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                      >
                        {child.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[oklch(0.15_0.03_255)]">{child.name}</p>
                        <p className="text-xs text-[oklch(0.5_0.02_255)]">Age {child.age} Â· {child.screenTimeLimit}h/day limit</p>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">Added</Badge>
                      <button onClick={() => removeChild(idx)} className="text-[oklch(0.6_0.02_255)] hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add child form */}
              {addingChild ? (
                <div className="bg-white rounded-xl p-5 border-2 border-[oklch(0.18_0.06_255/0.3)] shadow-sm mb-4">
                  <h4 className="font-semibold text-sm text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    New Child Profile
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Child's Name</label>
                      <input
                        type="text"
                        value={newChild.name}
                        onChange={(e) => setNewChild((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Emma"
                        className="w-full px-3 py-2.5 rounded-lg border border-[oklch(0.88_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] bg-[oklch(0.99_0.005_80)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-1.5">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="17"
                        value={newChild.age}
                        onChange={(e) => setNewChild((p) => ({ ...p, age: e.target.value }))}
                        placeholder="8"
                        className="w-full px-3 py-2.5 rounded-lg border border-[oklch(0.88_0.01_80)] text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.72_0.12_75/0.4)] focus:border-[oklch(0.72_0.12_75)] bg-[oklch(0.99_0.005_80)]"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-[oklch(0.3_0.02_255)] mb-2">
                      Daily Screen Time Limit: <span className="text-[oklch(0.18_0.06_255)] font-bold">{newChild.screenTimeLimit}h</span>
                    </label>
                    <Slider
                      value={[newChild.screenTimeLimit]}
                      onValueChange={(v) => setNewChild((p) => ({ ...p, screenTimeLimit: v[0] }))}
                      min={0.5} max={6} step={0.5}
                    />
                    <div className="flex justify-between text-[10px] text-[oklch(0.5_0.02_255)] mt-1">
                      <span>30 min</span><span>6 hours</span>
                    </div>
                  </div>
                  {childError && (
                    <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                      <X size={12} /> {childError}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={addChildToList} className="bg-[oklch(0.18_0.06_255)] text-white border-0 gap-1.5 text-sm">
                      <CheckCircle size={14} /> Add Child
                    </Button>
                    <Button variant="outline" onClick={() => { setAddingChild(false); setChildError(""); }} className="text-sm border-[oklch(0.9_0.01_80)]">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setAddingChild(true)}
                  className="w-full border-dashed border-2 border-[oklch(0.85_0.01_80)] text-[oklch(0.5_0.02_255)] hover:border-[oklch(0.18_0.06_255/0.4)] hover:text-[oklch(0.18_0.06_255)] gap-2 py-4 h-auto mb-4"
                >
                  <Plus size={16} /> Add {children.length > 0 ? "Another" : "a"} Child
                </Button>
              )}

              {children.length === 0 && !addingChild && (
                <p className="text-center text-xs text-[oklch(0.6_0.02_255)] mt-2">
                  You need to add at least one child to continue.
                </p>
              )}
            </div>
          )}

          {/* Step 3: Configure Filters */}
          {currentStep === 3 && children.length > 0 && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Configure protection
                </h2>
                <p className="text-[oklch(0.5_0.02_255)]">Customise content filters for each child.</p>
              </div>

              {/* Child selector */}
              {children.length > 1 && (
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  {children.map((child, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedChildIdx(idx)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
                        selectedChildIdx === idx
                          ? "border-[oklch(0.18_0.06_255)] bg-[oklch(0.18_0.06_255/0.06)] text-[oklch(0.18_0.06_255)]"
                          : "border-[oklch(0.9_0.01_80)] bg-white text-[oklch(0.5_0.02_255)]"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}>
                        {child.name.charAt(0)}
                      </div>
                      {child.name}
                    </button>
                  ))}
                </div>
              )}

              {children[selectedChildIdx] && (
                <div className="bg-white rounded-xl p-5 border border-[oklch(0.9_0.01_80)] shadow-sm">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[oklch(0.94_0.012_80)]">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: AVATAR_COLORS[selectedChildIdx % AVATAR_COLORS.length] }}>
                      {children[selectedChildIdx].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[oklch(0.15_0.03_255)]">{children[selectedChildIdx].name}</p>
                      <p className="text-xs text-[oklch(0.5_0.02_255)]">Age {children[selectedChildIdx].age}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge className="bg-[oklch(0.18_0.06_255/0.08)] text-[oklch(0.18_0.06_255)] border-0 text-xs">
                        {Object.values(children[selectedChildIdx].filters).filter(Boolean).length} filters active
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(children[selectedChildIdx].filters).map(([key, value]) => (
                      <div key={key} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        value ? "bg-red-50 border-red-100" : "bg-[oklch(0.97_0.01_80)] border-[oklch(0.9_0.01_80)]"
                      }`}>
                        <div>
                          <p className="text-sm font-medium text-[oklch(0.15_0.03_255)]">{FILTER_LABELS[key].label}</p>
                          <p className="text-xs text-[oklch(0.5_0.02_255)]">{FILTER_LABELS[key].desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${value ? "text-red-600" : "text-emerald-600"}`}>
                            {value ? "Blocked" : "Allowed"}
                          </span>
                          <Switch
                            checked={value}
                            onCheckedChange={(v) => updateChildFilter(selectedChildIdx, key, v)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[oklch(0.94_0.012_80)]">
                    <label className="block text-sm font-medium text-[oklch(0.3_0.02_255)] mb-2">
                      Daily Screen Time Limit: <span className="text-[oklch(0.18_0.06_255)] font-bold">{children[selectedChildIdx].screenTimeLimit}h</span>
                    </label>
                    <Slider
                      value={[children[selectedChildIdx].screenTimeLimit]}
                      onValueChange={(v) => updateChildLimit(selectedChildIdx, v)}
                      min={0.5} max={6} step={0.5}
                    />
                    <div className="flex justify-between text-[10px] text-[oklch(0.5_0.02_255)] mt-1">
                      <span>30 min</span><span>6 hours</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Devices */}
          {currentStep === 4 && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[oklch(0.15_0.03_255)] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Connect your devices
                </h2>
                <p className="text-[oklch(0.5_0.02_255)]">Select all devices your children use. We'll send setup instructions.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {DEVICE_OPTIONS.map((device) => {
                  const selected = selectedDevices.includes(device.id);
                  return (
                    <div
                      key={device.id}
                      onClick={() => toggleDevice(device.id)}
                      className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        selected
                          ? "border-[oklch(0.18_0.06_255)] bg-[oklch(0.18_0.06_255/0.04)]"
                          : "border-[oklch(0.9_0.01_80)] hover:border-[oklch(0.7_0.02_255)]"
                      }`}
                    >
                      <span className="text-2xl">{device.icon}</span>
                      <span className="text-sm font-medium text-[oklch(0.15_0.03_255)] flex-1">{device.label}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selected ? "border-[oklch(0.18_0.06_255)] bg-[oklch(0.18_0.06_255)]" : "border-[oklch(0.7_0.02_255)]"
                      }`}>
                        {selected && <CheckCircle size={12} className="text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
              {selectedDevices.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700">
                  <p className="font-medium mb-1">âœ“ {selectedDevices.length} device type{selectedDevices.length > 1 ? "s" : ""} selected</p>
                  <p className="text-xs text-emerald-600">After completing setup, we'll email you step-by-step installation instructions for each device.</p>
                </div>
              )}
              {selectedDevices.length === 0 && (
                <p className="text-center text-xs text-[oklch(0.6_0.02_255)]">
                  You can skip this step and add devices later from Settings.
                </p>
              )}
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center animate-fade-up">
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl overflow-hidden shield-pulse">
                <img src={SHIELD_IMG} alt="FaithShield247" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-4xl font-bold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                You're all set!
              </h2>
              <p className="text-[oklch(0.5_0.02_255)] text-lg mb-8 max-w-md mx-auto leading-relaxed">
                FaithShield247 is ready to protect your family. Here's a summary of what's been configured.
              </p>

              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 border border-[oklch(0.9_0.01_80)] shadow-sm text-left mb-8 max-w-md mx-auto">
                <h4 className="font-semibold text-[oklch(0.15_0.03_255)] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Setup Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.3_0.02_255)]">
                      <strong>{children.length}</strong> child profile{children.length !== 1 ? "s" : ""} created:{" "}
                      {children.map((c) => c.name).join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.3_0.02_255)]">
                      Content filters configured per child
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.3_0.02_255)]">
                      {selectedDevices.length > 0
                        ? `${selectedDevices.length} device type${selectedDevices.length > 1 ? "s" : ""} selected for protection`
                        : "Devices can be added from Settings"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-[oklch(0.3_0.02_255)]">
                      AI protection engine is active
                    </span>
                  </div>
                </div>
              </div>

              <div className="verse-card rounded-xl p-4 max-w-md mx-auto mb-8">
                <p className="text-sm italic text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Above all else, guard your heart, for everything you do flows from it."
                </p>
                <p className="text-xs text-[oklch(0.5_0.02_255)] mt-1 font-medium">Proverbs 4:23</p>
              </div>

              <Button
                onClick={finish}
                disabled={finishing}
                size="lg"
                className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 gap-2 px-10"
              >
                {finishing ? (
                  <><Loader2 size={18} className="animate-spin" /> Activating protection...</>
                ) : (
                  <>Go to My Dashboard <ChevronRight size={18} /></>
                )}
              </Button>
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep < 5 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[oklch(0.9_0.01_80)]">
              <Button
                variant="outline"
                onClick={back}
                disabled={currentStep === 1}
                className="gap-2 border-[oklch(0.9_0.01_80)] text-[oklch(0.5_0.02_255)]"
              >
                <ArrowLeft size={16} /> Back
              </Button>
              <span className="text-xs text-[oklch(0.6_0.02_255)]">Step {currentStep} of 5</span>
              <Button
                onClick={next}
                disabled={!canProceed()}
                className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.24_0.055_255)] text-white border-0 gap-2"
              >
                {currentStep === 4 ? "Review & Finish" : "Continue"} <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

