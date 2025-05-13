
import React, { useState } from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon, FilterIcon, SearchIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserEvent, EnrolledEvent } from './UserDashboard';

// Enhanced event images for a more attractive UI
const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1770",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1770",
  "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1770",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1769",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770",
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1770",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1770",
  "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1771",
  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1770",
];

interface EventsViewProps {
  events: UserEvent[];
  enrolledEvents: EnrolledEvent[];
  onEnroll: (event: UserEvent) => void;
}

const EventsView: React.FC<EventsViewProps> = ({ events, enrolledEvents, onEnroll }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const categories = Array.from(new Set(events.map(event => event.category)));

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isEnrolled = (eventId: number) => {
    return enrolledEvents.some(e => e.id === eventId);
  };

  const getSeatsRemaining = (event: UserEvent) => {
    return event.maxAttendees - event.attendees;
  };

  // Get random image for events without images
  const getEventImage = (event: UserEvent, index: number) => {
    if (event.imageUrl) return event.imageUrl;
    return eventImages[index % eventImages.length];
  };

  // Format date to be more readable
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Upcoming Events</h1>
        <span className="text-gray-500 dark:text-gray-400">{filteredEvents.length} events found</span>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                category && <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Events - Horizontal Scroll */}
      {categoryFilter === '' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Featured Events</h2>
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredEvents.slice(0, 5).map((event, index) => (
              <div key={`featured-${event.id}`} className="flex-none w-80">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:bg-gray-800">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={getEventImage(event, index)} 
                      alt={event.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-bold">{event.name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-sm text-center">
          <p className="text-gray-500 dark:text-gray-400">No events found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow card-hover dark:bg-gray-800">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={getEventImage(event, index)} 
                  alt={event.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge 
                  className="absolute top-3 right-3" 
                  variant={event.category === 'Conference' ? 'default' : 'outline'}
                >
                  {event.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatEventDate(event.date)}
                  </p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mt-1" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                    <MapPinIcon className="h-4 w-4 mt-1" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-300">
                    <UsersIcon className="h-4 w-4 mt-1" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                      {getSeatsRemaining(event) < 10 && (
                        <span className="text-red-600 dark:text-red-400 ml-1">
                          (Only {getSeatsRemaining(event)} seats left!)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                
                <Button
                  className="w-full"
                  variant={isEnrolled(event.id) ? "secondary" : "default"}
                  disabled={isEnrolled(event.id) || getSeatsRemaining(event) <= 0}
                  onClick={() => !isEnrolled(event.id) && onEnroll(event)}
                >
                  {isEnrolled(event.id) 
                    ? 'Already Enrolled' 
                    : getSeatsRemaining(event) <= 0 
                      ? 'Fully Booked' 
                      : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsView;
