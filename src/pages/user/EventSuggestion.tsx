
import React, { useState } from 'react';
import { 
  CalendarIcon, 
  MapPinIcon, 
  Clock3Icon, 
  UsersIcon, 
  SendIcon, 
  CheckCircleIcon,
  LightbulbIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const EventSuggestion = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    proposedDate: '',
    proposedTime: '',
    suggestedVenue: '',
    expectedAttendees: '',
    description: '',
    goals: '',
    speakers: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (minimal validation for demo)
    if (!formData.eventName || !formData.eventType || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the event name, type and description.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitted event suggestion:', formData);
      
      toast({
        title: "Suggestion Submitted",
        description: "Thank you! Your event suggestion has been received.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSuggestion = () => {
    setFormData({
      eventName: '',
      eventType: '',
      proposedDate: '',
      proposedTime: '',
      suggestedVenue: '',
      expectedAttendees: '',
      description: '',
      goals: '',
      speakers: '',
    });
    setIsSubmitted(false);
  };

  const eventTypes = [
    "Conference", 
    "Workshop", 
    "Training", 
    "Seminar", 
    "Networking", 
    "Team Building",
    "Product Launch",
    "Hackathon", 
    "Retreat", 
    "Other"
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Suggest an Event</h1>
      
      {isSubmitted ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your event suggestion has been successfully submitted. Our team will review it and get back to you soon.
          </p>
          <Button onClick={handleNewSuggestion}>Suggest Another Event</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Suggestion Form</CardTitle>
                <CardDescription>
                  Share your ideas for future events. The more details you provide, the better!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="eventName">Event Name*</Label>
                      <Input
                        id="eventName"
                        name="eventName"
                        placeholder="Enter a name for your proposed event"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventType">Event Type*</Label>
                        <Select 
                          value={formData.eventType} 
                          onValueChange={(value) => handleSelectChange("eventType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map(type => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                        <Input
                          id="expectedAttendees"
                          name="expectedAttendees"
                          placeholder="Estimated number of participants"
                          value={formData.expectedAttendees}
                          onChange={handleInputChange}
                          type="number"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="proposedDate">Proposed Date</Label>
                        <div className="relative">
                          <Input
                            id="proposedDate"
                            name="proposedDate"
                            type="date"
                            value={formData.proposedDate}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="proposedTime">Proposed Time</Label>
                        <div className="relative">
                          <Input
                            id="proposedTime"
                            name="proposedTime"
                            type="time"
                            value={formData.proposedTime}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="suggestedVenue">Suggested Venue</Label>
                      <Input
                        id="suggestedVenue"
                        name="suggestedVenue"
                        placeholder="Where should this event take place?"
                        value={formData.suggestedVenue}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Event Description*</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the event and why it would be valuable"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="goals">Goals & Outcomes</Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        placeholder="What are the key objectives and expected outcomes?"
                        value={formData.goals}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="speakers">Suggested Speakers</Label>
                      <Input
                        id="speakers"
                        name="speakers"
                        placeholder="Any speakers or presenters you'd recommend"
                        value={formData.speakers}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <SendIcon className="mr-2 h-4 w-4" />
                        Submit Suggestion
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LightbulbIcon className="mr-2 h-5 w-5 text-yellow-500" />
                  Why Suggest Events?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Your input helps us create events that truly matter to employees. Here's why your suggestions are valuable:
                </p>
                
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-indigo-500 flex-shrink-0">•</div>
                    <span>Tailor events to your professional interests</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-indigo-500 flex-shrink-0">•</div>
                    <span>Foster skill development in areas you care about</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-indigo-500 flex-shrink-0">•</div>
                    <span>Create networking opportunities with like-minded colleagues</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 text-indigo-500 flex-shrink-0">•</div>
                    <span>Contribute to a positive company culture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Approved Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <h3 className="font-medium text-gray-800">AI Ethics Workshop</h3>
                  <p className="text-sm text-gray-600">Suggested by Mark Taylor</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>Scheduled for Nov 2025</span>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <h3 className="font-medium text-gray-800">Wellness Retreat</h3>
                  <p className="text-sm text-gray-600">Suggested by Lisa Johnson</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>Scheduled for Oct 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSuggestion;
