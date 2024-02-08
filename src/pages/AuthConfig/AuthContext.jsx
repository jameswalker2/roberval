// AuthContext.jsx
import { supabase } from "@/Config/SupabaseConfig.jsx";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let logoutTimerRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const sessions = supabase.auth.getSession();
      setUser(sessions?.user ?? null);
    };
    fetchUser();

    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
      clearTimeout(logoutTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const resetLogoutTimer = () => {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = setTimeout(async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        } else {
          navigate("/");
        }
      }, 600000);
    };

    resetLogoutTimer();

    const handleUserActivity = () => {
      resetLogoutTimer();
    };

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keypress", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keypress", handleUserActivity);
    };
  }, [user, navigate]);

  const login = async (email, password) => {
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    setUser(user);
  };

  const logout = async () => {
    const { error } = await supabase.auth.singOut();
    if (error) {
      throw error;
    }
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
