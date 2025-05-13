
import React from 'react';
import { MenuIcon, BellIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface UserHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  notificationCount?: number;
}

const UserHeader: React.FC<UserHeaderProps> = ({ setSidebarOpen, notificationCount = 0 }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 h-16 flex items-center px-4 lg:px-6 sticky top-0 z-30 w-full">
      <button
        className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="flex-1 flex justify-center md:justify-start ml-24 md:ml-20">
        <h1 className="text-xl font-semibold text-gradient">RR Event Management Portal</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" className="p-2 rounded-full" asChild>
            <Link to="/user/notifications">
              <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
