// app/_context/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Added state to manage the mobile/tablet sliding SideNav
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  // Function to fetch the latest user data from DB
  const refreshUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 2. Added function to toggle the sidebar drawer
  const toggleSideNav = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        refreshUser, 
        loading,
        // Exported values for responsive navigation
        isSideNavOpen,   
        toggleSideNav,   
        setIsSideNavOpen 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);