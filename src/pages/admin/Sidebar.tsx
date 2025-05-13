
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarIcon, BarChart3Icon, MailIcon, ClipboardCheckIcon, UsersRoundIcon, XIcon, LogOutIcon, LightbulbIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  logout?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, logout }) => {
  const navItems = [
    { name: 'Events', path: '/admin/events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'RSVPs', path: '/admin/rsvps', icon: <UsersRoundIcon className="h-5 w-5" /> },
    { name: 'Feedback', path: '/admin/feedback', icon: <ClipboardCheckIcon className="h-5 w-5" /> },
    { name: 'Updates', path: '/admin/updates', icon: <MailIcon className="h-5 w-5" /> },
    { name: 'Suggestions', path: '/admin/suggestions', icon: <LightbulbIcon className="h-5 w-5" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3Icon className="h-5 w-5" /> },
  ];

  return (
    <div 
      className={`sidebar fixed top-0 left-0 z-40 h-screen w-64 bg-indigo-800 dark:bg-gray-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-700 dark:border-gray-700">
        <h2 className="text-xl font-bold">RR Event Manager</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
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
                      ? 'bg-indigo-900 dark:bg-gray-800 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-700 dark:hover:bg-gray-800'
                  }`
                }
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
          
          {/* Add logout button if the logout prop exists */}
          {logout && (
            <li>
              <button
                onClick={logout}
                className="flex items-center space-x-3 p-3 w-full text-left rounded-md transition-colors text-indigo-100 hover:bg-indigo-700 dark:hover:bg-gray-800"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
