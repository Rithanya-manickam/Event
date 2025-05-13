
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClipboardCheckIcon, MessageSquarePlusIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UserWelcomeBanner = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="opacity-90 mb-4">
          Here's what's happening with your events this week.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button asChild variant="secondary" className="bg-white text-indigo-700 hover:bg-gray-100">
            <Link to="/user/events">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Browse Events
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link to="/user/participation">
              <ClipboardCheckIcon className="mr-2 h-4 w-4" />
              My RSVPs
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <CalendarIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium ml-3 text-gray-800">Upcoming Events</h3>
            </div>
            <p className="text-gray-600 mb-4">You have 2 upcoming events this month.</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/user/events">View Events</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ClipboardCheckIcon className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-medium ml-3 text-gray-800">My RSVPs</h3>
            </div>
            <p className="text-gray-600 mb-4">Track your event registrations and participation history.</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/user/participation">View RSVPs</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <MessageSquarePlusIcon className="h-5 w-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium ml-3 text-gray-800">Suggest Ideas</h3>
            </div>
            <p className="text-gray-600 mb-4">Have a great idea for an event? Let us know!</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/user/suggest">Suggest Event</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Your Next Event</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 rounded-lg overflow-hidden">
            <img 
              src="https://source.unsplash.com/random/800x600/?tech,conference" 
              alt="Tech Conference" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="md:w-2/3 space-y-3">
            <h3 className="text-lg font-semibold text-indigo-700">Tech Conference 2025</h3>
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>June 10, 2025 at 09:00 AM</span>
            </div>
            <p className="text-gray-600">Join us for our annual tech conference featuring speakers from leading tech companies. Topics will include AI, blockchain, and future tech trends.</p>
            <div className="pt-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Link to="/user/participation">View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcomeBanner;
