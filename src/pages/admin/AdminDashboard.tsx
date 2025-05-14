
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import EventForm from './EventForm';
import RSVPDashboard from './RSVPDashboard';
import FeedbackCollection from './FeedbackCollection';
import SendEventUpdates from './SendEventUpdates';
import EventList from './EventList';
import AnalyticsDashboard from './AnalyticsDashboard';
import WelcomeBanner from './WelcomeBanner';
import UserEventSuggestions from './UserEventSuggestions';
import { MenuIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export type RSVP = {
  id: number;
  name: string;
  email: string;
  department: string;
  dietaryPreferences?: string;
  registrationDate: string;
};

export type Feedback = {
  id: number;
  userId: number;
  name: string;
  rating: number;
  comment: string;
  submittedAt: string;
};

export type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speakers: string;
  category: string;
  maxAttendees: number;
  imageUrl?: string;
  rsvps: RSVP[];
  feedbacks: Feedback[];
};

export type EventSuggestion = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  description: string;
  suggestedDate: string;
  suggestedLocation: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
};

export type EventUpdate = {
  id: number;
  eventId: number;
  eventName: string;
  message: string;
  sentAt: string;
  sentToCount: number;
};

const AdminDashboard = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Tech Conference 2025',
      date: '2025-06-10',
      time: '09:00 AM',
      location: 'Tech City Hall',
      description: 'Join us for our annual tech conference featuring speakers from leading tech companies. Topics will include AI, blockchain, and future tech trends.',
      speakers: 'Dr. John Doe (AI Research), Jane Smith (Blockchain Expert)',
      category: 'Conference',
      maxAttendees: 200,
      imageUrl: 'https://source.unsplash.com/random/800x600/?tech,conference',
      rsvps: [
        { id: 1, name: 'Michael Scott', email: 'michael@company.com', department: 'Engineering', registrationDate: '2025-05-01' },
        { id: 2, name: 'Pam Beesly', email: 'pam@company.com', department: 'Marketing', registrationDate: '2025-05-02' },
        { id: 3, name: 'Jim Halpert', email: 'jim@company.com', department: 'Sales', registrationDate: '2025-05-03' },
        { id: 4, name: 'Dwight Schrute', email: 'dwight@company.com', department: 'Sales', dietaryPreferences: 'Beets only', registrationDate: '2025-05-04' },
        { id: 5, name: 'Angela Martin', email: 'angela@company.com', department: 'Accounting', registrationDate: '2025-05-05' },
      ],
      feedbacks: [
        { id: 101, userId: 2, name: 'Pam Beesly', rating: 5, comment: 'Great event! Very informative.', submittedAt: '2025-06-11' },
        { id: 102, userId: 3, name: 'Jim Halpert', rating: 4, comment: 'The speakers were excellent.', submittedAt: '2025-06-11' },
      ],
    },
    {
      id: 2,
      name: 'Marketing Summit 2025',
      date: '2025-07-15',
      time: '10:00 AM',
      location: 'Marketing Center',
      description: 'A summit to discuss marketing strategies, digital trends, and consumer behavior insights for the upcoming year.',
      speakers: 'Alice Cooper (Digital Marketing), Bob Williams (Market Research)',
      category: 'Summit',
      maxAttendees: 150,
      imageUrl: 'https://source.unsplash.com/random/800x600/?marketing,summit',
      rsvps: [
        { id: 6, name: 'Kelly Kapoor', email: 'kelly@company.com', department: 'Marketing', registrationDate: '2025-06-15' },
        { id: 7, name: 'Ryan Howard', email: 'ryan@company.com', department: 'Marketing', registrationDate: '2025-06-16' },
        { id: 8, name: 'Andy Bernard', email: 'andy@company.com', department: 'Sales', registrationDate: '2025-06-17' },
      ],
      feedbacks: [
        { id: 103, userId: 6, name: 'Kelly Kapoor', rating: 3, comment: 'Could be more interactive.', submittedAt: '2025-07-16' },
        { id: 104, userId: 7, name: 'Ryan Howard', rating: 4, comment: 'Good content.', submittedAt: '2025-07-16' },
      ],
    },
    {
      id: 3,
      name: 'Sales Training Workshop',
      date: '2025-08-20',
      time: '02:00 PM',
      location: 'Sales Office',
      description: 'Sales training for the new recruits covering negotiation techniques, customer relationship management, and closing strategies.',
      speakers: 'Samantha Lee (Sales Director), George Brown (Customer Success)',
      category: 'Workshop',
      maxAttendees: 60,
      imageUrl: 'https://source.unsplash.com/random/800x600/?sales,training',
      rsvps: [
        { id: 9, name: 'Stanley Hudson', email: 'stanley@company.com', department: 'Sales', registrationDate: '2025-07-25' },
        { id: 10, name: 'Phyllis Vance', email: 'phyllis@company.com', department: 'Sales', registrationDate: '2025-07-26' },
        { id: 11, name: 'Oscar Martinez', email: 'oscar@company.com', department: 'Accounting', registrationDate: '2025-07-27' },
        { id: 12, name: 'Kevin Malone', email: 'kevin@company.com', department: 'Accounting', dietaryPreferences: 'Extra snacks', registrationDate: '2025-07-28' },
      ],
      feedbacks: [
        { id: 105, userId: 9, name: 'Stanley Hudson', rating: 4, comment: 'Useful workshop.', submittedAt: '2025-08-21' },
        { id: 106, userId: 10, name: 'Phyllis Vance', rating: 5, comment: 'Great speakers!', submittedAt: '2025-08-21' },
      ],
    },
  ]);

  const [eventUpdates, setEventUpdates] = useState<EventUpdate[]>([]);

  const [eventSuggestions, setEventSuggestions] = useState<EventSuggestion[]>([
    {
      id: 1,
      userId: 101,
      userName: "John Doe",
      title: "AI and Machine Learning Workshop",
      description: "A hands-on workshop for beginners to learn about AI and ML concepts with practical examples.",
      suggestedDate: "2025-08-15",
      suggestedLocation: "Tech Hub, Room 301",
      status: 'pending',
      submittedAt: "2025-05-10T09:30:00"
    },
    {
      id: 2,
      userId: 102,
      userName: "Jane Smith",
      title: "Remote Work Best Practices",
      description: "Discussion on effective remote work strategies and tools for distributed teams.",
      suggestedDate: "2025-07-20",
      suggestedLocation: "Virtual Meeting",
      status: 'approved',
      submittedAt: "2025-05-08T14:15:00"
    },
    {
      id: 3,
      userId: 103,
      userName: "Mike Johnson",
      title: "Sustainable Business Practices",
      description: "Learning how to implement eco-friendly initiatives in business operations.",
      suggestedDate: "2025-09-05",
      suggestedLocation: "Green Conference Center",
      status: 'rejected',
      submittedAt: "2025-05-05T11:45:00"
    }
  ]);
  
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'rsvps' | 'feedbacks'>>({ 
    name: '', 
    date: '', 
    time: '', 
    location: '', 
    description: '', 
    speakers: '',
    category: '',
    maxAttendees: 100,
    imageUrl: ''
  });
  
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [filterDept, setFilterDept] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewEvent({ ...newEvent, [name]: value });
  };

  const resetForm = () => {
    setNewEvent({ 
      name: '', 
      date: '', 
      time: '', 
      location: '', 
      description: '', 
      speakers: '',
      category: '',
      maxAttendees: 100,
      imageUrl: ''
    });
  };

  const handleAddOrUpdateEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description || !newEvent.speakers) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingEventId) {
      setEvents(events.map(ev => ev.id === editingEventId ? { ...ev, ...newEvent } : ev));
      setEditingEventId(null);
      
      toast({
        title: "Event Updated",
        description: `"${newEvent.name}" has been successfully updated.`,
      });
    } else {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      setEvents([...events, { ...newEvent, id: newId, rsvps: [], feedbacks: [] }]);
      
      toast({
        title: "Event Created",
        description: `"${newEvent.name}" has been successfully created.`,
      });
    }
    resetForm();
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(ev => ev.id !== id));
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully removed.",
      variant: "default",
    });
  };

  const handleEditEvent = (ev: Event) => {
    setEditingEventId(ev.id);
    setNewEvent({ 
      name: ev.name, 
      date: ev.date, 
      time: ev.time, 
      location: ev.location, 
      description: ev.description, 
      speakers: ev.speakers,
      category: ev.category,
      maxAttendees: ev.maxAttendees,
      imageUrl: ev.imageUrl || ''
    });
  };

  const handleCancelRSVP = (eventId: number, rsvpId: number) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, rsvps: event.rsvps.filter(r => r.id !== rsvpId) }
        : event
    ));
    
    toast({
      title: "RSVP Cancelled",
      description: "The registration has been cancelled successfully.",
      variant: "default",
    });
  };

  const handleSendUpdate = (eventId: number, message: string) => {
    const event = events.find(e => e.id === parseInt(String(eventId)));
    if (!event) return;
    
    const update: EventUpdate = {
      id: eventUpdates.length + 1,
      eventId: event.id,
      eventName: event.name,
      message,
      sentAt: new Date().toISOString(),
      sentToCount: event.rsvps.length,
    };
    
    setEventUpdates([...eventUpdates, update]);
    
    // This data would be used by the user dashboard to show notifications
    localStorage.setItem('eventUpdates', JSON.stringify([...eventUpdates, update]));
    
    toast({
      title: "Update Sent",
      description: `Update successfully sent to ${event.rsvps.length} attendees.`,
    });
  };

  const handleApproveSuggestion = (id: number) => {
    setEventSuggestions(suggestions => 
      suggestions.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, status: 'approved' as const } 
          : suggestion
      )
    );
    
    toast({
      title: "Suggestion Approved",
      description: "The event suggestion has been approved.",
    });
  };
  
  const handleRejectSuggestion = (id: number) => {
    setEventSuggestions(suggestions => 
      suggestions.map(suggestion => 
        suggestion.id === id 
          ? { ...suggestion, status: 'rejected' as const } 
          : suggestion
      )
    );
    
    toast({
      title: "Suggestion Rejected",
      description: "The event suggestion has been rejected.",
    });
  };

  return (
    <div className="admin-dashboard flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
      
      <div className="flex-1 flex flex-col">
        <div className="fixed top-0 left-0 z-20 md:hidden p-4">
          <button
            className="p-2 bg-indigo-600 text-white rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="main-content flex-1 p-6 pt-16 md:pt-6 md:ml-64">
          <div className="header-menu bg-white dark:bg-gray-800 shadow-sm p-4 mb-6 rounded-lg">
            <h1 className="text-2xl font-bold text-indigo-900 dark:text-gray-100">Event Admin Dashboard</h1>
          </div>
          
          {location.pathname === "/admin" && <WelcomeBanner />}
          
          <div className="mt-6">
            <Routes>
              <Route path="events" element={
                <div>
                  <EventForm
                    newEvent={newEvent}
                    handleInputChange={handleInputChange}
                    handleSelectChange={handleSelectChange}
                    handleAddOrUpdateEvent={handleAddOrUpdateEvent}
                    editingEventId={editingEventId}
                  />
                  <EventList
                    events={events}
                    onEditEvent={handleEditEvent}
                    onDeleteEvent={handleDeleteEvent}
                  />
                </div>
              } />
              <Route path="rsvps" element={
                <RSVPDashboard
                  events={events}
                  filterDept={filterDept}
                  setFilterDept={setFilterDept}
                  handleCancelRSVP={handleCancelRSVP}
                />
              } />
              <Route path="feedback" element={
                <FeedbackCollection
                  events={events}
                />
              } />
              <Route path="updates" element={
                <SendEventUpdates
                  events={events}
                  onSendUpdate={handleSendUpdate}
                />
              } />
              <Route path="suggestions" element={
                <UserEventSuggestions
                  suggestions={eventSuggestions}
                  onApproveSuggestion={handleApproveSuggestion}
                  onRejectSuggestion={handleRejectSuggestion}
                />
              } />
              <Route path="analytics" element={<AnalyticsDashboard events={events} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
