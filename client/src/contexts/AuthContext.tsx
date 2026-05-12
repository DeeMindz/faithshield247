/* FaithShield247 AuthContext — Sacred Modernism
 * Provides: user state, login, signup, logout, onboarding progress, child profiles
 * Uses localStorage for persistence (simulates a real backend auth layer)
 */
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  color: string;
  screenTimeLimit: number;
  filters: {
    adultContent: boolean;
    violence: boolean;
    gambling: boolean;
    socialMedia: boolean;
    gaming: boolean;
    drugs: boolean;
  };
  devices: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  church?: string;
  plan: "basic" | "premium" | "church";
  onboardingComplete: boolean;
  children: ChildProfile[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addChild: (child: Omit<ChildProfile, "id">) => void;
  updateChild: (id: string, updates: Partial<ChildProfile>) => void;
  removeChild: (id: string) => void;
  completeOnboarding: () => void;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  church?: string;
  plan: "basic" | "premium" | "church";
}

const AVATAR_COLORS = [
  "oklch(0.55 0.15 255)",
  "oklch(0.55 0.15 145)",
  "oklch(0.6 0.15 75)",
  "oklch(0.55 0.15 300)",
  "oklch(0.55 0.15 30)",
];

const STORAGE_KEY = "faithshield247_auth";

const AuthContext = createContext<AuthContextType | null>(null);

// Demo accounts for testing
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "demo@faithshield247.com": {
    password: "demo1234",
    user: {
      id: "demo-001",
      firstName: "Sarah",
      lastName: "Thompson",
      email: "demo@faithshield247.com",
      church: "Grace Community Church",
      plan: "premium",
      onboardingComplete: true,
      createdAt: new Date().toISOString(),
      children: [
        {
          id: "child-001",
          name: "Emma",
          age: 11,
          avatar: "E",
          color: "oklch(0.55 0.15 255)",
          screenTimeLimit: 3,
          filters: { adultContent: true, violence: true, gambling: true, socialMedia: false, gaming: false, drugs: true },
          devices: ["iPad", "School Laptop"],
        },
        {
          id: "child-002",
          name: "Caleb",
          age: 8,
          avatar: "C",
          color: "oklch(0.55 0.15 145)",
          screenTimeLimit: 2,
          filters: { adultContent: true, violence: true, gambling: true, socialMedia: true, gaming: false, drugs: true },
          devices: ["Family Tablet"],
        },
        {
          id: "child-003",
          name: "Lily",
          age: 6,
          avatar: "L",
          color: "oklch(0.6 0.15 75)",
          screenTimeLimit: 1.5,
          filters: { adultContent: true, violence: true, gambling: true, socialMedia: true, gaming: true, drugs: true },
          devices: ["Kids Tablet"],
        },
      ],
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate network
    const account = DEMO_ACCOUNTS[email.toLowerCase()];
    if (account && account.password === password) {
      persist(account.user);
      setIsLoading(false);
      return { success: true };
    }
    // Check locally registered accounts
    try {
      const stored = localStorage.getItem(`faithshield247_user_${email.toLowerCase()}`);
      if (stored) {
        const { user: storedUser, password: storedPw } = JSON.parse(stored);
        if (storedPw === password) {
          persist(storedUser);
          setIsLoading(false);
          return { success: true };
        }
      }
    } catch {}
    setIsLoading(false);
    return { success: false, error: "Invalid email or password. Try demo@faithshield247.com / demo1234" };
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    // Check if email already exists
    if (DEMO_ACCOUNTS[data.email.toLowerCase()]) {
      setIsLoading(false);
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      church: data.church,
      plan: data.plan,
      onboardingComplete: false,
      children: [],
      createdAt: new Date().toISOString(),
    };
    // Persist to localStorage (simulates backend registration)
    localStorage.setItem(
      `faithshield247_user_${data.email.toLowerCase()}`,
      JSON.stringify({ user: newUser, password: data.password })
    );
    persist(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    persist(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    persist(updated);
    // Also update stored account if it's a registered user
    try {
      const key = `faithshield247_user_${user.email.toLowerCase()}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(key, JSON.stringify({ ...parsed, user: updated }));
      }
    } catch {}
  };

  const addChild = (childData: Omit<ChildProfile, "id">) => {
    if (!user) return;
    const idx = user.children.length;
    const newChild: ChildProfile = {
      ...childData,
      id: `child-${Date.now()}`,
      color: childData.color || AVATAR_COLORS[idx % AVATAR_COLORS.length],
    };
    updateUser({ children: [...user.children, newChild] });
  };

  const updateChild = (id: string, updates: Partial<ChildProfile>) => {
    if (!user) return;
    updateUser({
      children: user.children.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const removeChild = (id: string) => {
    if (!user) return;
    updateUser({ children: user.children.filter((c) => c.id !== id) });
  };

  const completeOnboarding = () => {
    updateUser({ onboardingComplete: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
        addChild,
        updateChild,
        removeChild,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
