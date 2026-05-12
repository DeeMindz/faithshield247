/* FaithShield247 Demo Banner — shown when demo mode is active
 * Persistent top bar with guided tour navigation and step indicators
 */
import { useDemo } from "@/contexts/DemoContext";
import { useLocation } from "wouter";
import {
  Presentation, X, ChevronLeft, ChevronRight, Play, Pause, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoBanner() {
  const {
    isDemoMode, disableDemoMode, demoSteps, currentDemoStep,
    setCurrentDemoStep, nextDemoStep, prevDemoStep,
    isGuidedTour, startGuidedTour, stopGuidedTour
  } = useDemo();
  const [location, navigate] = useLocation();

  if (!isDemoMode) return null;

  const step = demoSteps[currentDemoStep];
  const isFirst = currentDemoStep === 0;
  const isLast = currentDemoStep === demoSteps.length - 1;

  const goToStep = (idx: number) => {
    setCurrentDemoStep(idx);
    navigate(demoSteps[idx].route);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] bg-gradient-to-r from-[oklch(0.18_0.06_255)] via-[oklch(0.22_0.06_255)] to-[oklch(0.18_0.06_255)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3">
        {/* Demo badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[oklch(0.72_0.12_75)] text-[oklch(0.12_0.03_255)]">
          <Presentation size={13} />
          <span className="text-[11px] font-bold uppercase tracking-wider">Demo Mode</span>
        </div>

        {isGuidedTour ? (
          <>
            {/* Guided tour controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToStep(Math.max(0, currentDemoStep - 1))}
                disabled={isFirst}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1">
                {demoSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToStep(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentDemoStep
                        ? "w-5 bg-[oklch(0.72_0.12_75)]"
                        : idx < currentDemoStep
                        ? "w-1.5 bg-white/40"
                        : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(Math.min(demoSteps.length - 1, currentDemoStep + 1))}
                disabled={isLast}
                className="p-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Current step info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/50">Step {currentDemoStep + 1}/{demoSteps.length}</span>
                <span className="text-xs font-semibold truncate">{step.title}</span>
                <span className="text-[10px] text-white/60 hidden sm:inline">— {step.highlight}</span>
              </div>
            </div>

            {/* Navigate to step */}
            <Button
              size="sm"
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] h-7 gap-1 border-0"
              onClick={() => navigate(step.route)}
            >
              <MapPin size={11} /> Go to Page
            </Button>

            <button
              onClick={stopGuidedTour}
              className="text-[11px] text-white/60 hover:text-white transition-colors px-2"
            >
              Exit Tour
            </button>
          </>
        ) : (
          <>
            {/* Non-guided mode */}
            <span className="text-xs text-white/70 flex-1">
              Investor/Ministry demo mode active — all data is simulated
            </span>
            <Button
              size="sm"
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] h-7 gap-1 border-0"
              onClick={startGuidedTour}
            >
              <Play size={11} /> Start Guided Tour
            </Button>
          </>
        )}

        {/* Close */}
        <button
          onClick={disableDemoMode}
          className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
