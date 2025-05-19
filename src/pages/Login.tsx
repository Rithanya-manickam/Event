import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserIcon, 
  LockIcon, 
  LogInIcon, 
  UserRoundIcon 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Demo users for login
const dummyUsers = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  user: {
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
  },
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let loggedInRole: 'admin' | 'user' | null = null;
      let userData;

      // Check admin credentials
      if (email === dummyUsers.admin.email && password === dummyUsers.admin.password) {
        loggedInRole = 'admin';
        userData = dummyUsers.admin;
      } 
      // Check user credentials if not admin
      else if (email === dummyUsers.user.email && password === dummyUsers.user.password) {
        loggedInRole = 'user';
        userData = dummyUsers.user;
      }

      if (loggedInRole && userData) {
        // Generate token and login
        const payload = { email, role: loggedInRole };
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const body = btoa(JSON.stringify(payload));
        const signature = 'dummy-signature'; // In a real app, this would be a secure signature
        const token = `${header}.${body}.${signature}`;
        
        login(token, loggedInRole);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${loggedInRole === 'admin' ? 'Administrator' : 'User'}!`,
        });
        
        navigate(loggedInRole === 'admin' ? '/admin' : '/user');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <LogInIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome to RR Events</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to access your account</p>
        </div>
        
        <Card className="shadow-lg dark:border-gray-800">
          <CardHeader className="space-y-1 pt-6">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6"> {/* Increased spacing from space-y-4 */}
              {/* Role selection removed */}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <UserRoundIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com" // Generic placeholder
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password" // Generic placeholder
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Demo Credentials: <br />
            User: user@example.com / user123 <br />
            Admin: admin@example.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
