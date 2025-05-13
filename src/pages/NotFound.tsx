
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="text-center animate-fade-in">
        <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Go Back
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="border-indigo-500 text-indigo-500 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-500/10"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
