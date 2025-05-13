
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, ClockIcon, Users2Icon, Edit2Icon, Trash2Icon } from "lucide-react";
import type { Event } from './AdminDashboard';

interface EventListProps {
  events: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEditEvent, onDeleteEvent }) => {
  return (
    <div className="event-list">
      <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
      
      {events.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No events created yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-600 text-white p-4">
                <h3 className="text-xl font-semibold truncate">{event.name}</h3>
              </div>
              
              <div className="p-4">
                <div className="flex items-start space-x-2 mb-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-start space-x-2 mb-2">
                  <ClockIcon className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-start space-x-2 mb-2">
                  <MapPinIcon className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-start space-x-2 mb-2">
                  <Users2Icon className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <span>{event.rsvps.length} RSVPs</span>
                </div>
                
                <div className="text-gray-600 mb-4">
                  <div className="line-clamp-2">{event.description}</div>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onEditEvent(event)}
                  >
                    <Edit2Icon className="h-4 w-4" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onDeleteEvent(event.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
