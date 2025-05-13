
import React from 'react';
import { BarChart3Icon, TrendingUpIcon, Users2Icon, CalendarIcon, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Event } from './AdminDashboard';

interface AnalyticsDashboardProps {
  events: Event[];
}

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ events }) => {
  // Calculate total RSVPs by department
  const rsvpsByDepartment: { [key: string]: number } = {};
  events.forEach(event => {
    event.rsvps.forEach(rsvp => {
      rsvpsByDepartment[rsvp.department] = (rsvpsByDepartment[rsvp.department] || 0) + 1;
    });
  });
  
  const departmentData = Object.entries(rsvpsByDepartment).map(([name, value]) => ({ name, value }));
  
  // Calculate average ratings per event
  const eventRatingData = events.map(event => {
    const ratings = event.feedbacks.map(f => f.rating);
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length 
      : 0;
    
    return {
      name: event.name,
      rating: parseFloat(avgRating.toFixed(1)),
      rsvps: event.rsvps.length
    };
  });
  
  // Calculate some stats
  const totalRSVPs = events.reduce((sum, event) => sum + event.rsvps.length, 0);
  const totalFeedbacks = events.reduce((sum, event) => sum + event.feedbacks.length, 0);
  
  const allRatings = events.flatMap(event => event.feedbacks.map(f => f.rating));
  const averageRating = allRatings.length > 0 
    ? (allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length).toFixed(1)
    : '0.0';
  
  return (
    <div className="analytics-dashboard">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <BarChart3Icon className="h-6 w-6 text-indigo-600" />
        Analytics Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <CalendarIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Total Events</h3>
            <p className="text-3xl font-bold text-gray-800">{events.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users2Icon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Total RSVPs</h3>
            <p className="text-3xl font-bold text-gray-800">{totalRSVPs}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <TrendingUpIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Avg. Rating</h3>
            <p className="text-3xl font-bold text-gray-800">{averageRating}/5</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Event Ratings & RSVPs</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={eventRatingData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="rating" name="Avg. Rating" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="rsvps" name="RSVPs" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">RSVPs by Department</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
