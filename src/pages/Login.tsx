
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserIcon, 
  LockIcon, 
  LogInIcon, 
  ShieldIcon, 
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
  const [role, setRole] = useState('user');
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
      const userData = dummyUsers[role as keyof typeof dummyUsers];
      
      if (email === userData.email && password === userData.password) {
        // Generate token and login
        const payload = { email, role };
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const body = btoa(JSON.stringify(payload));
        const signature = 'dummy-signature';
        const token = `${header}.${body}.${signature}`;
        
        login(token, role as 'admin' | 'user');
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${role === 'admin' ? 'Administrator' : 'User'}!`,
        });
        
        // Navigate after login is complete
        navigate(role === 'admin' ? '/admin' : '/user');
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-selector">Account Type</Label>
                <div className="grid grid-cols-2 gap-3" id="role-selector">
                  <Button
                    type="button"
                    variant={role === 'user' ? 'default' : 'outline'}
                    className={`flex items-center gap-2 ${role === 'user' ? '' : 'text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setRole('user')}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>User</span>
                  </Button>
                  
                  <Button
                    type="button"
                    variant={role === 'admin' ? 'default' : 'outline'}
                    className={`flex items-center gap-2 ${role === 'admin' ? '' : 'text-gray-700 dark:text-gray-300'}`}
                    onClick={() => setRole('admin')}
                  >
                    <ShieldIcon className="h-5 w-5" />
                    <span>Admin</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <UserRoundIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={role === 'user' ? 'user@example.com' : 'admin@example.com'}
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
                    placeholder={role === 'user' ? 'user123' : 'admin123'}
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
