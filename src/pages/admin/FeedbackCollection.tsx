
import React from 'react';
import { ClipboardCheckIcon, StarIcon, StarHalfIcon } from "lucide-react";
import type { Event } from './AdminDashboard';
import { cn } from '@/lib/utils';

interface FeedbackCollectionProps {
  events: Event[];
}

const FeedbackCollection: React.FC<FeedbackCollectionProps> = ({ events }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`star-${i}`} className="h-5 w-5 text-yellow-500 fill-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half-star" className="h-5 w-5 text-yellow-500 fill-yellow-500" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon 
          key={`empty-${i}`} 
          className="h-5 w-5 text-gray-300" 
        />
      );
    }
    
    return stars;
  };
  
  const calculateAverageRating = (feedbacks: { rating: number; comment: string }[]) => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
    return sum / feedbacks.length;
  };

  return (
    <div className="feedback-collection">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <ClipboardCheckIcon className="h-6 w-6 text-indigo-600" />
        Event Feedback
      </h2>
      
      {events.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No events to display feedback for.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={cn(
                "p-4 flex justify-between items-center",
                event.feedbacks.length > 0 ? "bg-indigo-600 text-white" : "bg-gray-100"
              )}>
                <h3 className="text-xl font-semibold">{event.name}</h3>
                {event.feedbacks.length > 0 && (
                  <div className="flex items-center bg-white text-indigo-600 px-3 py-1 rounded-full">
                    <span className="font-bold mr-1">{calculateAverageRating(event.feedbacks).toFixed(1)}</span>
                    <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-medium text-lg mb-2">
                  Feedback ({event.feedbacks.length})
                </h4>
                
                {event.feedbacks.length === 0 ? (
                  <p className="text-gray-500">No feedback for this event yet.</p>
                ) : (
                  <div className="space-y-4">
                    {event.feedbacks.map((feedback, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex mb-2">
                          {renderStars(feedback.rating)}
                        </div>
                        <p className="text-gray-700">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackCollection;
