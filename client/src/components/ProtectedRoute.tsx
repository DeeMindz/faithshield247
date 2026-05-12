/* FaithShield247 ProtectedRoute â€” redirects to login if not authenticated */
import { Redirect } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

export default function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.97_0.01_80)]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl overflow-hidden shield-pulse">
            <img
              src="/logo.png"
              alt="FaithShield247"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-[oklch(0.5_0.02_255)]">Loading FaithShield247...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // If authenticated but onboarding not complete, redirect to onboarding
  if (user && !user.onboardingComplete) {
    return <Redirect to="/onboarding" />;
  }

  return <Component />;
}

