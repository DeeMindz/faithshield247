/* FaithShield247 Onboarding Tour — Sacred Modernism
 * Step-by-step tooltip overlay guiding new parents through dashboard features
 * Triggers on first login, persists completion in localStorage
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import {
  Shield, ChevronRight, ChevronLeft, X, Sparkles,
  LayoutDashboard, Users, BarChart3, Bell, Zap, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "faithshield247_onboarding_complete";

export interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
  target?: string; // CSS selector for the element to highlight
  position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  highlight?: boolean;
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to FaithShield247",
    description: "Thank you for choosing to protect your family's digital life. This quick tour will show you the key features of your parental dashboard. It only takes about 60 seconds.",
    icon: Shield,
    position: "center",
  },
  {
    id: "sidebar",
    title: "Navigation Sidebar",
    description: "The sidebar is your command center. Access your Dashboard, Child Profiles, AI Filter Demo, Content Library, Reports, and Settings — all from here. You'll also find Teen Mode and Child View for age-specific experiences.",
    icon: LayoutDashboard,
    position: "right",
    target: "[data-tour='sidebar']",
    highlight: true,
  },
  {
    id: "stats",
    title: "Protection Overview",
    description: "At a glance, see how many children are protected, total threats blocked, average screen time, and your family's overall protection score. These update in real-time as your children browse.",
    icon: Shield,
    position: "bottom-left",
    target: "[data-tour='stats']",
    highlight: true,
  },
  {
    id: "children",
    title: "Your Children",
    description: "Each child has their own profile with customizable screen-time limits, content filter settings, and activity tracking. Click any child to see their detailed activity and adjust their protection level.",
    icon: Users,
    position: "bottom-left",
    target: "[data-tour='children']",
    highlight: true,
  },
  {
    id: "alerts",
    title: "Real-Time Alerts",
    description: "When a child encounters blocked content, triggers a keyword alert, or approaches their screen-time limit, you'll see it here instantly. Critical alerts also trigger push notifications to your device.",
    icon: Bell,
    position: "bottom-left",
    target: "[data-tour='alerts']",
    highlight: true,
  },
  {
    id: "quickactions",
    title: "Quick Actions",
    description: "Jump straight to the AI Filter Demo to see how our content scanner works, explore the curated Content Library, preview what your child sees in Child View, or access Teen Mode for your teenagers.",
    icon: Zap,
    position: "top-left",
    target: "[data-tour='quickactions']",
    highlight: true,
  },
  {
    id: "notifications",
    title: "Notification Center",
    description: "Click the bell icon in the top bar to see all your alerts in one place. You can filter by type, pause notifications, or mark them as read. Customize which alerts you receive in Settings.",
    icon: Bell,
    position: "bottom-left",
    target: "[data-tour='notifications']",
    highlight: true,
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Your family is now protected by FaithShield247. Explore the dashboard, add your children's devices, and customize your protection settings. Remember — you can always access this tour again from Settings.",
    icon: Sparkles,
    position: "center",
  },
];

interface OnboardingTourProps {
  forceShow?: boolean;
  onComplete?: () => void;
}

export default function OnboardingTour({ forceShow = false, onComplete }: OnboardingTourProps) {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Check if tour should show
  useEffect(() => {
    if (forceShow) {
      setActive(true);
      setCurrentStep(0);
      return;
    }
    const completed = localStorage.getItem(STORAGE_KEY);
    if (!completed) {
      // Delay to let dashboard render
      const timer = setTimeout(() => setActive(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  // Update highlight position
  const updateHighlight = useCallback(() => {
    const step = tourSteps[currentStep];
    if (step.target && step.highlight) {
      const el = document.querySelector(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        setHighlightRect(rect);
        return;
      }
    }
    setHighlightRect(null);
  }, [currentStep]);

  useEffect(() => {
    if (!active) return;
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    window.addEventListener("scroll", updateHighlight);
    return () => {
      window.removeEventListener("resize", updateHighlight);
      window.removeEventListener("scroll", updateHighlight);
    };
  }, [active, currentStep, updateHighlight]);

  const completeTour = () => {
    setActive(false);
    localStorage.setItem(STORAGE_KEY, "true");
    onComplete?.();
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const skipTour = () => {
    completeTour();
  };

  if (!active) return null;

  const step = tourSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === tourSteps.length - 1;
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (step.position === "center" || !highlightRect) {
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
    }

    const pad = 16;
    const tooltipW = 380;

    switch (step.position) {
      case "right":
        return {
          position: "fixed",
          top: Math.max(pad, highlightRect.top),
          left: highlightRect.right + pad,
        };
      case "left":
        return {
          position: "fixed",
          top: Math.max(pad, highlightRect.top),
          right: window.innerWidth - highlightRect.left + pad,
        };
      case "bottom-left":
        return {
          position: "fixed",
          top: highlightRect.bottom + pad,
          left: Math.max(pad, Math.min(highlightRect.left, window.innerWidth - tooltipW - pad)),
        };
      case "bottom-right":
        return {
          position: "fixed",
          top: highlightRect.bottom + pad,
          right: Math.max(pad, window.innerWidth - highlightRect.right),
        };
      case "top-left":
        return {
          position: "fixed",
          bottom: window.innerHeight - highlightRect.top + pad,
          left: Math.max(pad, Math.min(highlightRect.left, window.innerWidth - tooltipW - pad)),
        };
      case "top-right":
        return {
          position: "fixed",
          bottom: window.innerHeight - highlightRect.top + pad,
          right: Math.max(pad, window.innerWidth - highlightRect.right),
        };
      default:
        return {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
    }
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999]" style={{ pointerEvents: "auto" }}>
      {/* Overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {highlightRect && (
              <rect
                x={highlightRect.left - 6}
                y={highlightRect.top - 6}
                width={highlightRect.width + 12}
                height={highlightRect.height + 12}
                rx="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.55)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: "auto" }}
          onClick={(e) => e.stopPropagation()}
        />
      </svg>

      {/* Highlight border */}
      {highlightRect && (
        <div
          className="absolute border-2 border-[oklch(0.72_0.12_75)] rounded-xl pointer-events-none"
          style={{
            left: highlightRect.left - 6,
            top: highlightRect.top - 6,
            width: highlightRect.width + 12,
            height: highlightRect.height + 12,
            boxShadow: "0 0 0 4px oklch(0.72 0.12 75 / 0.2), 0 0 20px oklch(0.72 0.12 75 / 0.15)",
          }}
        />
      )}

      {/* Tooltip card */}
      <div
        className="w-[380px] bg-white rounded-2xl shadow-2xl border border-[oklch(0.88_0.01_80)] overflow-hidden animate-fade-up"
        style={getTooltipStyle()}
      >
        {/* Progress bar */}
        <div className="h-1 bg-[oklch(0.94_0.01_80)]">
          <div
            className="h-1 bg-[oklch(0.72_0.12_75)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-5">
          {/* Step icon and title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.18_0.06_255/0.06)] flex items-center justify-center flex-shrink-0">
              <step.icon size={20} className="text-[oklch(0.18_0.06_255)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[oklch(0.15_0.03_255)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {step.title}
              </h3>
              <p className="text-[10px] text-[oklch(0.6_0.02_255)] mt-0.5">
                Step {currentStep + 1} of {tourSteps.length}
              </p>
            </div>
            <button
              onClick={skipTour}
              className="text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-[oklch(0.4_0.02_255)] leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {tourSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "w-6 bg-[oklch(0.72_0.12_75)]"
                    : idx < currentStep
                    ? "w-1.5 bg-[oklch(0.72_0.12_75/0.4)]"
                    : "w-1.5 bg-[oklch(0.9_0.01_80)]"
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                className="text-xs border-[oklch(0.9_0.01_80)] gap-1"
              >
                <ChevronLeft size={14} /> Back
              </Button>
            )}
            <div className="flex-1" />
            {!isLast ? (
              <>
                <button
                  onClick={skipTour}
                  className="text-xs text-[oklch(0.6_0.02_255)] hover:text-[oklch(0.3_0.02_255)] transition-colors px-2"
                >
                  Skip tour
                </button>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="bg-[oklch(0.18_0.06_255)] hover:bg-[oklch(0.14_0.06_255)] text-white text-xs gap-1"
                >
                  Next <ChevronRight size={14} />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={completeTour}
                className="bg-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.65_0.12_75)] text-[oklch(0.12_0.03_255)] text-xs gap-1 font-semibold"
              >
                <Sparkles size={14} /> Start Exploring
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper to reset tour (for Settings page) */
export function resetOnboardingTour() {
  localStorage.removeItem(STORAGE_KEY);
}

export function isOnboardingComplete() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}
