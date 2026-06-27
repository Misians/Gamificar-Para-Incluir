// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (access: string) => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));

  const isAuthenticated = !!token;

  const login = (access: string) => {
    localStorage.setItem('access_token', access);
    setToken(access);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};