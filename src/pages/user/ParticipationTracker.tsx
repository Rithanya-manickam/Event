
import React, { useState } from 'react';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  CalendarDaysIcon,
  StarIcon,
  CheckIcon,
  XIcon,
  FileTextIcon,
  DownloadIcon,
  AwardIcon,
  TrophyIcon,
  Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { EnrolledEvent } from './UserDashboard';

interface ParticipationTrackerProps {
  enrolledEvents: EnrolledEvent[];
  onUnenroll: (enrollmentId: number) => void;
  onFeedbackSubmit: (enrollmentId: number, rating: number, comment: string) => void;
}

const ParticipationTracker: React.FC<ParticipationTrackerProps> = ({ 
  enrolledEvents, 
  onUnenroll,
  onFeedbackSubmit
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedRating, setSelectedRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  
  const upcomingEvents = enrolledEvents.filter(event => event.status === 'upcoming');
  const pastEvents = enrolledEvents.filter(event => event.status !== 'upcoming');
  const attendedEvents = pastEvents.filter(event => event.status === 'attended');

  const certificatesCount = attendedEvents.filter(event => event.certificateUrl).length;

  const handleFeedbackSubmit = () => {
    if (currentEventId) {
      onFeedbackSubmit(currentEventId, selectedRating, feedbackComment);
      setCurrentEventId(null);
      setSelectedRating(5);
      setFeedbackComment("");
    }
  };

  const handlePrintParticipationCertificate = (event: EnrolledEvent) => {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      // Add certificate HTML content
      printWindow.document.write(`
        <html>
          <head>
            <title>Participation Certificate - ${event.name}</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 40px;
                border: 20px solid #4338ca;
                position: relative;
              }
              .certificate {
                text-align: center;
                color: #1f2937;
              }
              .header {
                font-size: 32px;
                color: #4338ca;
                margin-bottom: 30px;
                font-weight: bold;
              }
              .title {
                font-size: 46px;
                font-weight: bold;
                text-transform: uppercase;
                margin: 20px 0;
                color: #1e293b;
              }
              .name {
                font-size: 36px;
                font-weight: bold;
                margin: 30px 0;
                color: #1e293b;
              }
              .description {
                font-size: 20px;
                margin: 30px 0;
              }
              .event-details {
                margin: 40px 0;
                font-size: 18px;
              }
              .date {
                font-size: 18px;
                margin-top: 50px;
              }
              .signature {
                margin-top: 80px;
                display: flex;
                justify-content: space-between;
              }
              .signature div {
                width: 40%;
              }
              .signature-line {
                border-top: 1px solid #1f2937;
                margin-top: 10px;
                padding-top: 10px;
              }
              .logo {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 100px;
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                  color-adjust: exact;
                }
              }
            </style>
          </head>
          <body onload="window.print()">
            <div class="certificate">
              <div class="header">CERTIFICATE OF PARTICIPATION</div>
              <img src="/logo.png" alt="RR Event Management" class="logo">
              <div class="title">This certifies that</div>
              <div class="name">John Doe</div>
              <div class="description">
                has successfully participated in
              </div>
              <div class="title" style="font-size: 30px;">${event.name}</div>
              <div class="event-details">
                Held on ${event.date} at ${event.location}
              </div>
              <div class="date">Issued on: ${new Date().toLocaleDateString()}</div>
              
              <div class="signature">
                <div>
                  <div class="signature-line">Event Organizer</div>
                </div>
                <div>
                  <div class="signature-line">Company Director</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const downloadAttendanceReport = () => {
    // In a real application, this would generate a CSV or PDF file
    // For this demo, we'll create a text representation
    
    const reportContent = `
Attendance Report - Generated on ${new Date().toLocaleDateString()}

Total Events Enrolled: ${enrolledEvents.length}
Upcoming Events: ${upcomingEvents.length}
Past Events: ${pastEvents.length}
Attended Events: ${pastEvents.filter(e => e.status === 'attended').length}
Missed Events: ${pastEvents.filter(e => e.status === 'missed').length}
Certificates Earned: ${certificatesCount}

Event Details:
${enrolledEvents.map(event => `
- ${event.name}
  Date: ${event.date} at ${event.time}
  Status: ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
  Location: ${event.location}
  ${event.userFeedback ? `Feedback: ${event.userFeedback.rating}/5 stars` : ''}
`).join('')}
`;

    // Create a download link
    const element = document.createElement('a');
    const file = new Blob([reportContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `attendance_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Participation</h1>
        <Button variant="outline" onClick={downloadAttendanceReport} className="flex items-center">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Your Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800">
              <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                <div className="bg-indigo-100 dark:bg-indigo-700 p-4 rounded-full mb-4">
                  <AwardIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Total Participation</h3>
                <p className="text-3xl font-bold mt-2 text-indigo-600 dark:text-indigo-300">{enrolledEvents.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Events enrolled</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800">
              <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                <div className="bg-emerald-100 dark:bg-emerald-700 p-4 rounded-full mb-4">
                  <TrophyIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Certificates Earned</h3>
                <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-300">{certificatesCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Professional achievements</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800">
              <CardContent className="pt-6 flex flex-col items-center text-center p-6">
                <div className="bg-amber-100 dark:bg-amber-700 p-4 rounded-full mb-4">
                  <StarIcon className="h-8 w-8 text-amber-600 dark:text-amber-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Feedback Provided</h3>
                <p className="text-3xl font-bold mt-2 text-amber-600 dark:text-amber-300">
                  {attendedEvents.filter(event => event.userFeedback).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Your contributions</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="dark:bg-gray-700">
            <CardContent className="pt-6 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Enrolled</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{enrolledEvents.length}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                  <CalendarDaysIcon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-700">
            <CardContent className="pt-6 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Upcoming Events</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{upcomingEvents.length}</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-full">
                  <CalendarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-700">
            <CardContent className="pt-6 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Attended</p>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {pastEvents.filter(event => event.status === 'attended').length}
                  </h3>
                </div>
                <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">No upcoming events</h3>
                <p>You haven't enrolled in any upcoming events.</p>
              </div>
            ) : (
              upcomingEvents.map(event => (
                <div key={event.enrollmentId} className="bg-white border dark:bg-gray-700 dark:border-gray-600 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1">
                      <Badge className="mb-2" variant="outline">{event.category}</Badge>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.name}</h3>
                    </div>
                    
                    <div className="space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg dark:bg-gray-800 dark:text-gray-100">
                        <DialogHeader>
                          <DialogTitle className="text-gray-800 dark:text-gray-100">{event.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-1 text-gray-600 dark:text-gray-300">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                          
                          <div className="bg-indigo-50 dark:bg-indigo-900/40 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Enrollment Details</h4>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Enrollment ID:</span> #{event.enrollmentId}</p>
                            <p className="text-gray-700 dark:text-gray-300"><span className="font-medium">Enrolled on:</span> {event.enrollmentDate}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="destructive"
                      onClick={() => onUnenroll(event.enrollmentId)}
                    >
                      Cancel Enrollment
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileTextIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">No past events</h3>
                <p>Your participation history will appear here.</p>
              </div>
            ) : (
              pastEvents.map(event => (
                <div key={event.enrollmentId} className="bg-white border dark:bg-gray-700 dark:border-gray-600 rounded-lg p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge 
                          variant={event.status === 'attended' ? 'default' : 'destructive'}
                          className="mb-2"
                        >
                          {event.status === 'attended' ? (
                            <><CheckIcon className="h-3 w-3 mr-1" /> Attended</>
                          ) : (
                            <><XIcon className="h-3 w-3 mr-1" /> Missed</>
                          )}
                        </Badge>
                        <Badge variant="outline" className="mb-2">{event.category}</Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{event.name}</h3>
                      
                      <div className="space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {event.status === 'attended' && !event.userFeedback && (
                        <Dialog onOpenChange={(open) => {
                          if (open) {
                            setCurrentEventId(event.enrollmentId);
                            setSelectedRating(5);
                            setFeedbackComment('');
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <StarIcon className="mr-2 h-4 w-4" />
                              Provide Feedback
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md dark:bg-gray-800">
                            <DialogHeader>
                              <DialogTitle className="text-gray-800 dark:text-gray-100">Rate Your Experience</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-2">
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">How would you rate {event.name}?</h4>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                      key={rating}
                                      type="button"
                                      onClick={() => setSelectedRating(rating)}
                                      className={`rounded-md p-1 ${
                                        rating <= selectedRating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                    >
                                      <StarIcon className="h-6 w-6 fill-current" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Your comments (optional)</h4>
                                <Textarea
                                  placeholder="Share your thoughts about this event..."
                                  value={feedbackComment}
                                  onChange={(e) => setFeedbackComment(e.target.value)}
                                  rows={4}
                                  className="dark:bg-gray-700 dark:text-gray-100"
                                />
                              </div>
                              
                              <Button
                                className="w-full"
                                onClick={handleFeedbackSubmit}
                              >
                                Submit Feedback
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {event.userFeedback && (
                        <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Feedback</h4>
                          <div className="flex my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon 
                                key={star}
                                className={`h-4 w-4 ${star <= event.userFeedback!.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                fill={star <= event.userFeedback!.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          {event.userFeedback.comment && (
                            <p className="text-gray-600 dark:text-gray-400 text-sm italic">"{event.userFeedback.comment}"</p>
                          )}
                        </div>
                      )}
                      
                      {event.status === 'attended' && (
                        <Button 
                          variant="outline"
                          className="w-full"
                          onClick={() => handlePrintParticipationCertificate(event)}
                        >
                          <FileTextIcon className="mr-2 h-4 w-4" />
                          Get Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {event.status === 'attended' && (
                    <div className="mt-4 pt-4 border-t dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AwardIcon className="h-5 w-5 text-amber-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Earned achievement for attending this event</span>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                          {event.category} Participant
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParticipationTracker;
