
import React, { useEffect, useState } from 'react';
import { BellIcon, CheckIcon, CalendarIcon, MailIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserEvent } from './UserDashboard';

interface Notification {
  id: number;
  message: string;
  eventId: number;
  eventName: string;
  date: string;
  isRead: boolean;
  type?: 'update' | 'reminder' | 'change';
}

type EventUpdate = {
  id: number;
  eventId: number;
  eventName: string;
  message: string;
  sentAt: string;
  sentToCount: number;
};

interface NotificationsViewProps {
  notifications: Notification[];
  enrolledEvents: UserEvent[];
  markAsRead: (id: number) => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ 
  notifications, 
  enrolledEvents,
  markAsRead 
}) => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>(notifications);
  
  // Check for event updates from localStorage
  useEffect(() => {
    const storedUpdates = localStorage.getItem('eventUpdates');
    if (storedUpdates) {
      try {
        const updates: EventUpdate[] = JSON.parse(storedUpdates);
        const userEventIds = enrolledEvents.map(event => event.id);
        
        // Convert updates to notifications but only for events the user is enrolled in
        const updateNotifications = updates
          .filter(update => userEventIds.includes(update.eventId))
          .map(update => ({
            id: 1000 + update.id, // Avoid ID collisions
            message: update.message,
            eventId: update.eventId,
            eventName: update.eventName,
            date: update.sentAt,
            isRead: false,
            type: 'update' as const
          }));
        
        if (updateNotifications.length > 0) {
          setAllNotifications(prev => {
            // Ensure no duplicates
            const existingIds = new Set(prev.map(n => n.id));
            const newUpdates = updateNotifications.filter(n => !existingIds.has(n.id));
            return [...prev, ...newUpdates];
          });
        }
      } catch (e) {
        console.error('Failed to parse event updates:', e);
      }
    }
  }, [enrolledEvents]);

  // Filter notifications for events the user is enrolled in
  const userNotifications = allNotifications.filter(notification => 
    enrolledEvents.some(event => event.id === notification.eventId)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'update':
        return <MailIcon className="h-6 w-6 text-blue-500" />;
      case 'change':
        return <CalendarIcon className="h-6 w-6 text-yellow-500" />;
      default:
        return <CalendarIcon className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notifications</h1>
        <Badge variant="outline">{userNotifications.length} notifications</Badge>
      </div>

      {userNotifications.length === 0 ? (
        <Card className="dark:bg-gray-800">
          <CardContent className="pt-6 flex flex-col items-center text-center p-10">
            <BellIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">No notifications yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              You'll receive notifications about event updates and reminders here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {userNotifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`hover:shadow-md transition-shadow dark:bg-gray-800 ${
                notification.isRead ? 'opacity-75' : ''
              }`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <CardContent className="p-5 flex gap-4 items-start">
                <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      {notification.eventName}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {notification.isRead ? (
                        <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
                      ) : (
                        <Badge className="ml-2" variant="default">New</Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {formatDate(notification.date)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsView;
