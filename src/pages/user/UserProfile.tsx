
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, SaveIcon, CameraIcon, AlertCircleIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define notification preference types
type NotificationPreferencesType = {
  email: boolean;
  inApp: boolean;
  eventReminders: boolean;
  feedbackRequests: boolean;
  newsletter: boolean;
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    designation: 'Senior Developer',
    dietaryPreferences: 'No preferences',
    bio: 'Full-stack developer with a passion for creating user-friendly applications.',
    profileImage: 'https://source.unsplash.com/random/200x200/?portrait',
    notificationPreferences: {
      email: true,
      inApp: true,
      eventReminders: true,
      feedbackRequests: true,
      newsletter: false,
    } as NotificationPreferencesType
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotificationPreference = (prefName: keyof NotificationPreferencesType) => {
    setProfile(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [prefName]: !prev.notificationPreferences[prefName]
      }
    }));
  };

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile changes have been saved successfully.",
      });
    }, 800);
  };

  const departments = [
    "Engineering", 
    "Marketing", 
    "Sales", 
    "Human Resources", 
    "Finance", 
    "Product", 
    "Design", 
    "Customer Support", 
    "Research & Development",
    "Operations"
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Profile</h1>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback className="text-2xl">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <div className="flex flex-col items-center space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <CameraIcon className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              )}
              
              <div className="text-center">
                <h2 className="text-xl font-semibold dark:text-white">{profile.fullName}</h2>
                <p className="text-gray-500 dark:text-gray-400">{profile.designation}</p>
                <p className="text-gray-500 dark:text-gray-400">{profile.department}</p>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold dark:text-white">Personal Information</h3>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSaveProfile}
                    className="flex items-center"
                  >
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    {isEditing ? (
                      <Select 
                        value={profile.department} 
                        onValueChange={(value) => handleSelectChange("department", value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="department"
                        value={profile.department}
                        disabled={true}
                      />
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={profile.designation}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                    <Input
                      id="dietaryPreferences"
                      name="dietaryPreferences"
                      value={profile.dietaryPreferences}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="E.g., Vegetarian, Allergies, etc."
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircleIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(profile.notificationPreferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getNotificationDescription(key as keyof NotificationPreferencesType)}
                  </p>
                </div>
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    id={`notify-${key}`}
                    checked={value}
                    onChange={() => toggleNotificationPreference(key as keyof NotificationPreferencesType)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input 
              id="current-password" 
              type="password" 
              placeholder="Enter your current password" 
              disabled={!isEditing}
            />
          </div>
          
          {isEditing && (
            <>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="Confirm new password"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.
              </p>
              <Button variant="outline" className="w-full">
                Update Password
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

function getNotificationDescription(key: keyof NotificationPreferencesType): string {
  const descriptions: Record<keyof NotificationPreferencesType, string> = {
    email: "Receive notifications via email",
    inApp: "Receive notifications within the application",
    eventReminders: "Get reminders before your enrolled events",
    feedbackRequests: "Receive requests for event feedback",
    newsletter: "Subscribe to our monthly event newsletter",
  };
  
  return descriptions[key] || "";
}

export default UserProfile;
