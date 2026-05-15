/* FaithShield247 App — Sacred Modernism Design
 * Routes: Landing (public), Auth, Onboarding, Dashboard (protected), Teen Mode, Admin, Demo
 * Providers: Theme, Auth, Notifications, Demo
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { DemoProvider } from "./contexts/DemoContext";
import DemoBanner from "./components/DemoBanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ChildView from "./pages/ChildView";
import FilterDemo from "./pages/FilterDemo";
import ContentLibrary from "./pages/ContentLibrary";
import Settings from "./pages/Settings";
import Profiles from "./pages/Profiles";
import Reports from "./pages/Reports";
import TeenMode from "./pages/TeenMode";
import AdminPortal from "./pages/AdminPortal";
import ExtensionDemo from "./pages/ExtensionDemo";
import ActivityTimeline from "./pages/ActivityTimeline";
import SafetyReport from "./pages/SafetyReport";
import BusinessCanvas from "./pages/BusinessCanvas";
import About from "./pages/About";
import ForFamilies from "./pages/ForFamilies";
import ForSchools from "./pages/ForSchools";
import ForChurches from "./pages/ForChurches";
import Waitlist from "./pages/Waitlist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/about" component={About} />
      <Route path="/for-families" component={ForFamilies} />
      <Route path="/for-schools" component={ForSchools} />
      <Route path="/for-churches" component={ForChurches} />
      <Route path="/waitlist" component={Waitlist} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfUse} />

      {/* Protected dashboard routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/child-view">
        {() => <ProtectedRoute component={ChildView} />}
      </Route>
      <Route path="/filter-demo">
        {() => <ProtectedRoute component={FilterDemo} />}
      </Route>
      <Route path="/content-library">
        {() => <ProtectedRoute component={ContentLibrary} />}
      </Route>
      <Route path="/settings">
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path="/profiles">
        {() => <ProtectedRoute component={Profiles} />}
      </Route>
      <Route path="/reports">
        {() => <ProtectedRoute component={Reports} />}
      </Route>
      <Route path="/teen-mode">
        {() => <ProtectedRoute component={TeenMode} />}
      </Route>
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminPortal} />}
      </Route>
      <Route path="/extension-demo">
        {() => <ProtectedRoute component={ExtensionDemo} />}
      </Route>
      <Route path="/activity">
        {() => <ProtectedRoute component={ActivityTimeline} />}
      </Route>
      <Route path="/safety-report">
        {() => <ProtectedRoute component={SafetyReport} />}
      </Route>
      <Route path="/business-canvas">
        {() => <ProtectedRoute component={BusinessCanvas} />}
      </Route>

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <NotificationProvider>
            <DemoProvider>
              <TooltipProvider>
                <DemoBanner />
                <Toaster richColors closeButton position="top-right" offset={72} />
                <Router />
              </TooltipProvider>
            </DemoProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
