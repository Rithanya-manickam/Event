
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from "@/hooks/use-toast";
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';
import EventsView from './EventsView';
import ParticipationTracker from './ParticipationTracker';
import EventSuggestion from './EventSuggestion';
import UserProfile from './UserProfile';
import UserWelcomeBanner from './UserWelcomeBanner';
import NotificationsView from './NotificationsView';

export type UserEvent = {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees: number;
  attendees: number;
  imageUrl?: string;
  category: string;
};

export type EnrolledEvent = UserEvent & {
  enrollmentId: number;
  enrollmentDate: string;
  status: 'upcoming' | 'attended' | 'missed';
  userFeedback?: {
    id: number;
    rating: number;
    comment: string;
    submitted: string;
  };
  certificateUrl?: string;
};

export type Notification = {
  id: number;
  eventId: number;
  eventName: string;
  message: string;
  date: string;
  isRead: boolean;
};

const UserDashboard = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample events data
  const [events] = useState<UserEvent[]>([
    {
      id: 1,
      name: 'Tech Conference 2025',
      date: '2025-06-10',
      time: '09:00 AM',
      location: 'Tech City Hall',
      description: 'Join us for our annual tech conference featuring speakers from leading tech companies. Topics will include AI, blockchain, and future tech trends.',
      maxAttendees: 200,
      attendees: 145,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1770',
      category: 'Conference'
    },
    {
      id: 2,
      name: 'Design Thinking Workshop',
      date: '2025-06-25',
      time: '10:00 AM',
      location: 'Innovation Center',
      description: 'A hands-on workshop to master design thinking methodologies and apply them to solve real-world problems.',
      maxAttendees: 50,
      attendees: 32,
      imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1770',
      category: 'Workshop'
    },
    {
      id: 3,
      name: 'Marketing Summit 2025',
      date: '2025-07-15',
      time: '09:30 AM',
      location: 'Marketing Center',
      description: 'Annual marketing summit covering digital marketing trends, consumer behavior analysis, and marketing automation.',
      maxAttendees: 150,
      attendees: 98,
      imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1770',
      category: 'Summit'
    },
    {
      id: 4,
      name: 'Leadership Seminar',
      date: '2025-08-05',
      time: '02:00 PM',
      location: 'Executive Training Center',
      description: 'Develop your leadership skills with industry experts in this interactive seminar.',
      maxAttendees: 75,
      attendees: 51,
      imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712',
      category: 'Seminar'
    },
    {
      id: 5,
      name: 'Sales Training Workshop',
      date: '2025-08-20',
      time: '10:00 AM',
      location: 'Sales Office',
      description: 'Comprehensive sales training focusing on modern sales techniques and customer relationship management.',
      maxAttendees: 60,
      attendees: 45,
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1769',
      category: 'Workshop'
    },
    {
      id: 6,
      name: 'Annual Company Retreat',
      date: '2025-09-10',
      time: '08:00 AM',
      location: 'Mountain Resort',
      description: 'Three-day team building and strategy retreat in a beautiful mountain setting.',
      maxAttendees: 100,
      attendees: 87,
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770',
      category: 'Retreat'
    },
    {
      id: 9,
      name: 'Web3 Development Conference',
      date: '2025-09-20',
      time: '09:00 AM',
      location: 'Digital Innovation Hub',
      description: 'Learn about the latest in blockchain, smart contracts, and decentralized applications from industry experts.',
      maxAttendees: 180,
      attendees: 135,
      imageUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1771',
      category: 'Conference'
    },
    {
      id: 10,
      name: 'Artificial Intelligence Symposium',
      date: '2025-10-05',
      time: '10:00 AM',
      location: 'Future Tech Center',
      description: 'Explore the cutting edge of AI research and applications with demonstrations and expert panels.',
      maxAttendees: 120,
      attendees: 95,
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1770',
      category: 'Symposium'
    }
  ]);

  // Sample enrolled events
  const [enrolledEvents, setEnrolledEvents] = useState<EnrolledEvent[]>([
    {
      ...events[0],
      enrollmentId: 101,
      enrollmentDate: '2025-05-15',
      status: 'upcoming'
    },
    {
      ...events[2],
      enrollmentId: 102,
      enrollmentDate: '2025-05-20',
      status: 'upcoming'
    },
    {
      id: 7,
      name: 'Data Science Bootcamp',
      date: '2025-04-15',
      time: '09:00 AM',
      location: 'Data Center',
      description: 'Intensive data science training with hands-on projects.',
      maxAttendees: 40,
      attendees: 40,
      category: 'Training',
      enrollmentId: 103,
      enrollmentDate: '2025-03-10',
      status: 'attended',
      userFeedback: {
        id: 201,
        rating: 4,
        comment: 'Great content, but could use more practical examples.',
        submitted: '2025-04-16'
      },
      certificateUrl: '/certificates/data-science-bootcamp.pdf'
    },
    {
      id: 8,
      name: 'Product Management Fundamentals',
      date: '2025-03-20',
      time: '02:00 PM',
      location: 'Innovation Hub',
      description: 'Introduction to product management methodologies.',
      maxAttendees: 60,
      attendees: 58,
      category: 'Course',
      enrollmentId: 104,
      enrollmentDate: '2025-02-28',
      status: 'attended',
      userFeedback: {
        id: 202,
        rating: 5,
        comment: 'Excellent course! Very informative and well-structured.',
        submitted: '2025-03-21'
      },
      certificateUrl: '/certificates/product-management.pdf'
    }
  ]);

  // Sample notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      eventId: 1,
      eventName: 'Tech Conference 2025',
      message: 'Reminder: Tech Conference 2025 is coming up in 2 weeks. Don\'t forget to prepare your questions!',
      date: '2025-05-27T14:30:00',
      isRead: false
    },
    {
      id: 2,
      eventId: 2,
      eventName: 'Design Thinking Workshop',
      message: 'The venue for Design Thinking Workshop has been changed to Innovation Center, 3rd Floor.',
      date: '2025-06-20T10:15:00',
      isRead: true
    },
    {
      id: 3,
      eventId: 3,
      eventName: 'Marketing Summit 2025',
      message: 'New speaker announced: Sarah Johnson, VP of Marketing at TechCorp, will give a keynote speech.',
      date: '2025-06-30T09:45:00',
      isRead: false
    }
  ]);

  // Function to handle enrollment
  const handleEnroll = (event: UserEvent) => {
    // Check if already enrolled
    if (enrolledEvents.some(e => e.id === event.id)) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this event.",
        variant: "default",
      });
      return;
    }
    
    // Create enrollment
    const newEnrollment: EnrolledEvent = {
      ...event,
      enrollmentId: Date.now(),
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'upcoming'
    };
    
    setEnrolledEvents([...enrolledEvents, newEnrollment]);
    
    toast({
      title: "Successfully Enrolled",
      description: `You have been enrolled in "${event.name}".`,
    });
  };

  // Function to handle unenrollment
  const handleUnenroll = (enrollmentId: number) => {
    setEnrolledEvents(enrolledEvents.filter(event => event.enrollmentId !== enrollmentId));
    
    toast({
      title: "Enrollment Canceled",
      description: "You have been removed from this event.",
    });
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = (enrollmentId: number, rating: number, comment: string) => {
    setEnrolledEvents(prev => 
      prev.map(event => 
        event.enrollmentId === enrollmentId 
          ? {
              ...event,
              userFeedback: {
                id: Date.now(),
                rating,
                comment,
                submitted: new Date().toISOString().split('T')[0]
              }
            }
          : event
      )
    );
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };

  // Function to mark notification as read
  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserHeader setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 md:ml-64">
          {location.pathname === "/user" && <UserWelcomeBanner />}
          
          <Routes>
            <Route path="/" element={<UserWelcomeBanner />} />
            <Route 
              path="/events" 
              element={
                <EventsView 
                  events={events} 
                  enrolledEvents={enrolledEvents} 
                  onEnroll={handleEnroll} 
                />
              } 
            />
            <Route 
              path="/participation" 
              element={
                <ParticipationTracker 
                  enrolledEvents={enrolledEvents}
                  onUnenroll={handleUnenroll}
                  onFeedbackSubmit={handleFeedbackSubmit}
                />
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <NotificationsView 
                  notifications={notifications}
                  enrolledEvents={enrolledEvents}
                  markAsRead={markNotificationAsRead}
                />
              } 
            />
            <Route path="/suggest" element={<EventSuggestion />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
