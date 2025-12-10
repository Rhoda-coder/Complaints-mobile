import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI, authSession } from "../services/api";
import type { AuthContextValue, AuthUser } from "../types/apiTypes";
import { router } from "expo-router"; 
import { Platform } from "react-native"; //change later
//remember useSegment
//useRootNavigationState

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function initAuth() {
      try {
        const storedUser = await authSession.getUser();
        const token = await authSession.getToken();

        if (storedUser && token) {
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Safe navigation
          setTimeout(() => {
            if (Platform.OS !== "web") // remove later
            router.replace("/login");
          }, 0);
        }
      } catch (err) {
        console.log("Auth initialization error:", err);

        // Also navigate safely on error
        setTimeout(() => {
          router.replace("/login");
        }, 0);
      } finally {
        setIsLoaded(true);
      }
    }

    initAuth();
  }, []);

  // Refresh Token Handler
  const handleRefreshToken = async () => {
    try {
      const res = await authAPI.refreshToken();
      const newAccess = res.access || res.tokens?.access;

      if (newAccess) {
        await authSession.setToken(newAccess);
      }
    } catch (err) {
      console.log("Token refresh failed:", err);
      setIsAuthenticated(false);

      // Safe navigation
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    }
  };

  const value = {
    user,
    isAuthenticated,
    setIsAuthenticated,
    handleRefreshToken,
  };

  // Show a splash/loading until auth is initialized
  if (!isLoaded) {
    return (
      <></>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return contextValue;
}
