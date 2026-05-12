/* FaithShield247 Demo Mode Context
 * Global toggle for Investor/Ministry demo mode
 * Pre-loads rich sample data, shows demo banner, provides guided walkthrough
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  route: string;
  highlight: string;
}

const DEMO_STEPS: DemoStep[] = [
  { id: 1, title: "Landing Page", description: "The public-facing marketing site that converts visitors into families", route: "/", highlight: "See how FaithShield247 positions itself in the market" },
  { id: 2, title: "Sign-Up Flow", description: "Frictionless onboarding with plan selection and family setup", route: "/signup", highlight: "3-step signup → 5-step onboarding wizard" },
  { id: 3, title: "Parental Dashboard", description: "The command center where parents monitor all children at a glance", route: "/dashboard", highlight: "Real-time stats, alerts, screen time charts" },
  { id: 4, title: "Activity Timeline", description: "Chronological feed of every action across the family", route: "/activity", highlight: "Filter by child, type, and time range" },
  { id: 5, title: "AI Content Filter", description: "Live demonstration of the real-time URL scanning engine", route: "/filter-demo", highlight: "Try scanning different URLs to see safety scores" },
  { id: 6, title: "Browser Extension", description: "Interactive prototype of the Chrome extension popup", route: "/extension-demo", highlight: "Click different sites to see the filter in action" },
  { id: 7, title: "Content Library", description: "Curated faith-based content ecosystem — 'The Ark'", route: "/content-library", highlight: "Videos, games, stories, music — all vetted" },
  { id: 8, title: "Teen Mode", description: "Distinct interface for 13-17 year olds with journal and accountability", route: "/teen-mode", highlight: "Devotional journal, accountability partners, content feed" },
  { id: 9, title: "Church Admin Portal", description: "B2B portal for churches and schools managing group subscriptions", route: "/admin", highlight: "Members, subscriptions, curriculum, analytics" },
  { id: 10, title: "Safety Report", description: "Downloadable PDF report for families and church leaders", route: "/safety-report", highlight: "Weekly/monthly reports with protection trends" },
];

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  demoSteps: DemoStep[];
  currentDemoStep: number;
  setCurrentDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  isGuidedTour: boolean;
  startGuidedTour: () => void;
  stopGuidedTour: () => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  const [isGuidedTour, setIsGuidedTour] = useState(false);

  const toggleDemoMode = useCallback(() => setIsDemoMode((v) => !v), []);
  const enableDemoMode = useCallback(() => setIsDemoMode(true), []);
  const disableDemoMode = useCallback(() => { setIsDemoMode(false); setIsGuidedTour(false); }, []);

  const nextDemoStep = useCallback(() => {
    setCurrentDemoStep((s) => Math.min(s + 1, DEMO_STEPS.length - 1));
  }, []);

  const prevDemoStep = useCallback(() => {
    setCurrentDemoStep((s) => Math.max(s - 1, 0));
  }, []);

  const startGuidedTour = useCallback(() => {
    setIsDemoMode(true);
    setIsGuidedTour(true);
    setCurrentDemoStep(0);
  }, []);

  const stopGuidedTour = useCallback(() => {
    setIsGuidedTour(false);
  }, []);

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        toggleDemoMode,
        enableDemoMode,
        disableDemoMode,
        demoSteps: DEMO_STEPS,
        currentDemoStep,
        setCurrentDemoStep,
        nextDemoStep,
        prevDemoStep,
        isGuidedTour,
        startGuidedTour,
        stopGuidedTour,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
