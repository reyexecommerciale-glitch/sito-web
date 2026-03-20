import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Configurare Supabase per abilitare l’area admin.' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      return;
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase signout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
