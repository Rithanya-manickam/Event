
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  userRole: Role;
  isAuthenticated: boolean;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<Role>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole') as Role;

    if (storedToken && storedRole) {
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, role: Role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', String(role));
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUserRole(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value = {
    userRole,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user';
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requiredRole }) => {
  const location = useLocation();
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('userRole');
  
  if (!storedToken || !storedRole) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (storedRole !== requiredRole) {
    // Redirect to appropriate dashboard if role doesn't match
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area.",
      variant: "destructive",
    });
    return <Navigate to={`/${storedRole}`} state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
