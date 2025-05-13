
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  CalendarIcon, 
  UsersIcon, 
  BarChart3Icon, 
  ClipboardCheckIcon, 
  ChevronRightIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "RR Event Management Platform has streamlined our corporate events, helping us increase attendance by 45% and gather valuable feedback.",
      author: "Alex Johnson",
      role: "HR Director, TechCorp",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 2,
      quote: "The analytics dashboard gives us incredible insights into what our team members want from company events. Game changer!",
      author: "Sarah Williams",
      role: "Employee Experience Lead, InnovateCo",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 3,
      quote: "As an attendee, I love how easy it is to track my participation and get certificates for professional development.",
      author: "Michael Chen",
      role: "Software Engineer, DevFirm",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop"
    }
  ];

  // Featured upcoming events
  const featuredEvents = [
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "June 10, 2025",
      location: "Tech City Hall, New York",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1770",
      category: "Conference"
    },
    {
      id: 2,
      name: "Leadership Summit",
      date: "July 15, 2025",
      location: "Executive Center, Chicago",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1712",
      category: "Summit"
    },
    {
      id: 3,
      name: "UX Design Workshop",
      date: "August 5, 2025",
      location: "Creative Studio, San Francisco",
      image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1771",
      category: "Workshop"
    },
    {
      id: 4,
      name: "Annual Company Retreat",
      date: "September 10, 2025",
      location: "Mountain Resort, Colorado",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770",
      category: "Retreat"
    }
  ];

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center mr-3">
            <span className="font-bold text-white text-lg">RR</span>
          </div>
          <span className="text-xl font-bold text-gradient">RR Event Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Login</Link>
          <Link to="/register" className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-800 transition">Register</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-800 dark:to-purple-900 py-16 md:py-24 px-6 md:px-20 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 z-10">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none px-3 py-1">Corporate Event Management</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Empowering Corporate Engagement</h1>
              <p className="text-lg text-white/90 max-w-lg">Streamline your company events with our all-in-one platform for organizing, participating and analyzing corporate activities.</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-white hover:bg-gray-100 text-indigo-700">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block z-10">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974" alt="Team Collaboration" className="rounded-xl shadow-2xl transform rotate-2" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Why Choose RR Event Management?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Our comprehensive platform delivers everything you need to create engaging corporate events and maximize participation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                <CalendarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Smart Event Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Create, schedule, and monitor events with an intuitive admin dashboard.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                <UsersIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Employee Engagement</h3>
              <p className="text-gray-600 dark:text-gray-400">Boost participation with easy RSVP, reminders, and personalized recommendations.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-4">
                <ClipboardCheckIcon className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Feedback Collection</h3>
              <p className="text-gray-600 dark:text-gray-400">Gather and analyze feedback to continuously improve your events.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl transition-transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
                <BarChart3Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Insightful Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">Track attendance, satisfaction, and participation trends with visual reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section - Horizontal Scroll */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Featured Events</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Our upcoming corporate events you won't want to miss</p>
            </div>
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
              View all <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {featuredEvents.map((event) => (
              <div key={event.id} className="flex-none w-72 group">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                    <Badge className="absolute top-3 right-3">{event.category}</Badge>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{event.name}</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 opacity-70" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2 opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Link to="/login">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 md:px-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Trusted by corporate teams of all sizes</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your corporate events?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of companies that use RR Event Management Platform</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-white hover:bg-gray-100 text-indigo-700">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10">
              <Link to="/login">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center mr-3">
                  <span className="font-bold text-white text-lg">RR</span>
                </div>
                <span className="text-xl font-bold">RR Event Management</span>
              </div>
              <p className="text-gray-400">Empowering corporate engagement through streamlined event management.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                <li><Link to="#" className="hover:text-white transition">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">contact@rrevents.com</p>
              <p className="text-gray-400">1-800-RR-EVENTS</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">&copy; 2025 RR Event Management. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
