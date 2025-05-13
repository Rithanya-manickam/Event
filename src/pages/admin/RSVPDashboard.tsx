
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { UsersRoundIcon, XIcon } from "lucide-react";
import type { Event } from './AdminDashboard';

interface RSVPDashboardProps {
  events: Event[];
  filterDept: string;
  setFilterDept: (dept: string) => void;
  handleCancelRSVP: (eventId: number, rsvpId: number) => void;
}

const RSVPDashboard: React.FC<RSVPDashboardProps> = ({ 
  events,
  filterDept,
  setFilterDept,
  handleCancelRSVP
}) => {
  // Get all unique departments
  const departments = Array.from(new Set(
    events.flatMap(event => event.rsvps.map(rsvp => rsvp.department))
  )).filter(Boolean); // Filter out any empty strings
  
  return (
    <div className="rsvp-dashboard">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0 flex items-center gap-2">
          <UsersRoundIcon className="h-6 w-6 text-indigo-600" />
          RSVP Management
        </h2>
        
        <div className="w-full md:w-64">
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept || "unknown"}>{dept || "Unknown"}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-800 dark:text-gray-100">
          <p className="text-gray-500 dark:text-gray-400">No events to display.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => {
            const filteredRSVPs = filterDept === "all" || filterDept === ""
              ? event.rsvps
              : event.rsvps.filter(rsvp => rsvp.department === filterDept);
              
            if (filteredRSVPs.length === 0) return null;
            
            return (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
                <div className="bg-indigo-600 text-white p-4">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-sm opacity-90">{event.date} at {event.time}</p>
                </div>
                
                <div className="p-4">
                  <h4 className="font-medium text-lg mb-2 dark:text-white">RSVPs ({filteredRSVPs.length})</h4>
                  
                  {filteredRSVPs.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No RSVPs for this event yet.</p>
                  ) : (
                    <div className="border rounded-md overflow-hidden dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredRSVPs.map((rsvp) => (
                            <tr key={rsvp.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{rsvp.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{rsvp.department || "Unknown"}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() => handleCancelRSVP(event.id, rsvp.id)}
                                >
                                  <XIcon className="h-4 w-4" />
                                  Cancel
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RSVPDashboard;
