
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFormProps {
  newEvent: {
    name: string;
    date: string;
    time: string;
    location: string;
    description: string;
    speakers: string;
    category?: string;
    maxAttendees?: number;
    imageUrl?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddOrUpdateEvent: () => void;
  editingEventId: number | null;
  handleSelectChange?: (name: string, value: string) => void; // Add this prop
}

const EventForm: React.FC<EventFormProps> = ({ 
  newEvent, 
  handleInputChange, 
  handleAddOrUpdateEvent,
  editingEventId,
  handleSelectChange 
}) => {
  const categories = [
    "Conference",
    "Workshop",
    "Seminar",
    "Summit",
    "Training",
    "Retreat",
    "Symposium",
    "Course",
    "Meetup"
  ];

  return (
    <div className="event-form bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
        <CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        {editingEventId ? 'Edit Event' : 'Create New Event'}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
            Event Name *
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            placeholder="Enter event name"
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="location">
            Location *
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            value={newEvent.location}
            onChange={handleInputChange}
            placeholder="Enter event location"
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="date">
            Date *
          </label>
          <Input
            type="date"
            id="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="time">
            Time *
          </label>
          <Input
            type="time"
            id="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
            Category
          </label>
          <Select 
            value={newEvent.category || ''} 
            onValueChange={(value) => handleSelectChange && handleSelectChange('category', value)}
          >
            <SelectTrigger className="dark:bg-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="maxAttendees">
            Max Attendees
          </label>
          <Input
            type="number"
            id="maxAttendees"
            name="maxAttendees"
            value={newEvent.maxAttendees || ''}
            onChange={handleInputChange}
            placeholder="Max number of attendees"
            className="dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="speakers">
            Speakers *
          </label>
          <Input
            type="text"
            id="speakers"
            name="speakers"
            value={newEvent.speakers}
            onChange={handleInputChange}
            placeholder="Enter speaker names (comma separated)"
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="imageUrl">
            Image URL
          </label>
          <Input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={newEvent.imageUrl || ''}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="description">
            Description *
          </label>
          <Textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            rows={4}
            className="dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
      </div>
      
      <Button 
        onClick={handleAddOrUpdateEvent} 
        className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
      >
        {editingEventId ? 'Update Event' : 'Add Event'}
      </Button>
    </div>
  );
};

export default EventForm;
