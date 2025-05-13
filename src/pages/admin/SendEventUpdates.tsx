
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { MailIcon, SendIcon, CheckCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Event } from './AdminDashboard';

interface SendEventUpdatesProps {
  events: Event[];
  onSendUpdate: (eventId: number, message: string) => void;
}

const SendEventUpdates: React.FC<SendEventUpdatesProps> = ({ events, onSendUpdate }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [updateMessage, setUpdateMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentStatus, setSentStatus] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleSendUpdate = () => {
    if (!selectedEventId) {
      toast({
        title: "Error",
        description: "Please select an event",
        variant: "destructive",
      });
      return;
    }
    
    if (!updateMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter an update message",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending update
    setTimeout(() => {
      const eventId = parseInt(selectedEventId, 10);
      onSendUpdate(eventId, updateMessage);
      
      setIsSending(false);
      setSentStatus(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSentStatus(false);
        setUpdateMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="send-event-updates">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <MailIcon className="h-6 w-6 text-indigo-600" />
        Send Event Updates
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Event
          </label>
          <Select 
            value={selectedEventId} 
            onValueChange={setSelectedEventId}
            disabled={isSending || sentStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.name} ({event.rsvps.length} attendees)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Update Message
          </label>
          <Textarea
            value={updateMessage}
            onChange={(e) => setUpdateMessage(e.target.value)}
            placeholder="Type your event update message here..."
            rows={6}
            disabled={isSending || sentStatus}
            className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          />
        </div>
        
        <Button
          onClick={handleSendUpdate}
          className={`w-full ${sentStatus ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          disabled={isSending || sentStatus}
        >
          {isSending ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Sending...
            </>
          ) : sentStatus ? (
            <>
              <CheckCircleIcon className="mr-2 h-5 w-5" />
              Sent Successfully
            </>
          ) : (
            <>
              <SendIcon className="mr-2 h-5 w-5" />
              Send Update
            </>
          )}
        </Button>
        
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Updates will be sent to all attendees who have RSVP'd to the selected event.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendEventUpdates;
