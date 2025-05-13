
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClipboardCheckIcon, 
  MessageSquarePlusIcon, 
  UserIcon,
  LogOutIcon,
  XIcon,
  HomeIcon,
  BellIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface UserSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  logout: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ sidebarOpen, setSidebarOpen, logout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/user', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Events', path: '/user/events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'My Participation', path: '/user/participation', icon: <ClipboardCheckIcon className="h-5 w-5" /> },
    { name: 'Notifications', path: '/user/notifications', icon: <BellIcon className="h-5 w-5" /> },
    { name: 'Suggest Event', path: '/user/suggest', icon: <MessageSquarePlusIcon className="h-5 w-5" /> },
    { name: 'My Profile', path: '/user/profile', icon: <UserIcon className="h-5 w-5" /> },
  ];

  return (
    <div 
      className={`sidebar fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar-background dark:bg-sidebar-accent text-sidebar-foreground transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-primary dark:text-sidebar-primary-foreground">RR Events</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="md:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`
                }
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Button 
          variant="outline" 
          className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default UserSidebar;
