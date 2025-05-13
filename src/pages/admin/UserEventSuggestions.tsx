
import React from 'react';
import { LightbulbIcon, CheckIcon, XIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type EventSuggestion = {
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

interface UserEventSuggestionsProps {
  suggestions: EventSuggestion[];
  onApproveSuggestion: (id: number) => void;
  onRejectSuggestion: (id: number) => void;
}

const UserEventSuggestions: React.FC<UserEventSuggestionsProps> = ({ 
  suggestions,
  onApproveSuggestion,
  onRejectSuggestion
}) => {
  return (
    <div className="user-event-suggestions">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <LightbulbIcon className="h-6 w-6 text-yellow-500" />
        User Event Suggestions
      </h2>
      
      {suggestions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500 dark:text-gray-400">No event suggestions yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className={cn(
                "p-4 border-l-4",
                suggestion.status === 'pending' ? "border-yellow-500" : 
                suggestion.status === 'approved' ? "border-green-500" : "border-red-500"
              )}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{suggestion.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Suggested by {suggestion.userName} on {new Date(suggestion.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Badge 
                    className={cn(
                      suggestion.status === 'pending' ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                      suggestion.status === 'approved' ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                      "bg-red-100 text-red-800 hover:bg-red-100"
                    )}
                  >
                    {suggestion.status.charAt(0).toUpperCase() + suggestion.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">{suggestion.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Date:</strong> {suggestion.suggestedDate}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Location:</strong> {suggestion.suggestedLocation}
                    </span>
                  </div>
                </div>
                
                {suggestion.status === 'pending' && (
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button 
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                      size="sm"
                      onClick={() => onRejectSuggestion(suggestion.id)}
                    >
                      <XIcon className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                      size="sm"
                      onClick={() => onApproveSuggestion(suggestion.id)}
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
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

export default UserEventSuggestions;
