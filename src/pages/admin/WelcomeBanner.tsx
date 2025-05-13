
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarIcon, UsersRoundIcon, BarChart3Icon } from "lucide-react";

const WelcomeBanner: React.FC = () => {
  return (
    <div className="welcome-banner mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Event Management Dashboard</h2>
        <p className="text-lg mb-6">
          Manage your events, track RSVPs, collect feedback, and send updates to attendees.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="secondary" className="flex items-center gap-2">
            <Link to="/admin/events">
              <CalendarIcon className="h-5 w-5" />
              <span>Manage Events</span>
            </Link>
          </Button>
          
          <Button asChild variant="secondary" className="flex items-center gap-2">
            <Link to="/admin/rsvps">
              <UsersRoundIcon className="h-5 w-5" />
              <span>View RSVPs</span>
            </Link>
          </Button>
          
          <Button asChild variant="secondary" className="flex items-center gap-2">
            <Link to="/admin/analytics">
              <BarChart3Icon className="h-5 w-5" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="stat-card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-indigo-600">3</p>
          <p className="text-gray-600 mt-1">Active events in the system</p>
        </div>
        
        <div className="stat-card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total RSVPs</h3>
          <p className="text-3xl font-bold text-indigo-600">6</p>
          <p className="text-gray-600 mt-1">Across all events</p>
        </div>
        
        <div className="stat-card bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg. Rating</h3>
          <p className="text-3xl font-bold text-indigo-600">4.2</p>
          <p className="text-gray-600 mt-1">From event feedback</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
