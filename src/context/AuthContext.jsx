import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getUser();

      if (sessionData?.user) {
        const profile = await fetchProfile(sessionData.user.id);
        const fullUser = {
          ...sessionData.user,
          full_name: profile?.full_name || null,
        };
        setUser(fullUser);
        setIsAuthenticated(true);
        localStorage.setItem("batikeye_user", JSON.stringify(fullUser));
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("batikeye_user");
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }

    return data;
  };

  const login = async (userData) => {
    const profile = await fetchProfile(userData.id);
    const fullUser = {
      ...userData,
      full_name: profile?.full_name || null,
    };
    setUser(fullUser);
    setIsAuthenticated(true);
    localStorage.setItem("batikeye_user", JSON.stringify(fullUser));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("batikeye_user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
