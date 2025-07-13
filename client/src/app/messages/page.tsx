'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  Star, 
  CheckCircle, 
  Clock, 
  Image, 
  File, 
  Calendar,
  MapPin,
  DollarSign,
  User,
  Briefcase,
  AlertCircle,
  Eye,
  Filter,
  Plus,
  Archive,
  Pin,
  Trash2,
  Settings,
  MessageSquare,
  CalendarPlus,
  Timer,
  FileText,
  Download,
  Upload,
  Bookmark,
  Bell,
  X,
  Flag
} from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedConversationForSchedule, setSelectedConversationForSchedule] = useState<any>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(true);

  // Enhanced conversations data with project details
  const conversations = [
    {
      id: 1,
      name: "Sarah Mitchell",
      title: "Kitchen Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastMessage: "I've prepared the 3D renderings for your kitchen. Would you like to schedule a call to review them?",
      timestamp: "2m ago",
      unread: 2,
      online: true,
      verified: true,
      project: {
        id: 1,
        name: "Kitchen Renovation Project",
        status: "In Progress",
        progress: 75,
        budget: "$8,500",
        dueDate: "2024-02-15",
        location: "Los Angeles, CA",
        priority: "High"
      },
      rating: 4.9,
      completedProjects: 45,
      responseTime: "2 hours",
      skills: ["Kitchen Design", "3D Rendering", "Project Management"],
      availability: {
        timezone: 'America/Los_Angeles',
        bufferTime: 15,
        weeklySchedule: {
          monday: { isAvailable: true, slots: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
          tuesday: { isAvailable: true, slots: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
          wednesday: { isAvailable: true, slots: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
          thursday: { isAvailable: true, slots: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '18:00' }] },
          friday: { isAvailable: true, slots: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '17:00' }] },
          saturday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }] },
          sunday: { isAvailable: false, slots: [] }
        }
      }
    },
    {
      id: 2,
      name: "David Rodriguez",
      title: "Master Electrician",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastMessage: "The electrical panel upgrade is scheduled for Monday. I'll be there at 9 AM.",
      timestamp: "1h ago",
      unread: 0,
      online: false,
      verified: true,
      project: {
        id: 2,
        name: "Electrical Panel Upgrade",
        status: "Scheduled",
        progress: 30,
        budget: "$2,800",
        dueDate: "2024-01-25",
        location: "Beverly Hills, CA",
        priority: "Medium"
      },
      rating: 4.8,
      completedProjects: 78,
      responseTime: "1 hour",
      skills: ["Electrical", "Panel Upgrades", "Safety Inspections"],
      availability: {
        timezone: 'America/Los_Angeles',
        bufferTime: 30,
        weeklySchedule: {
          monday: { isAvailable: true, slots: [{ start: '08:00', end: '16:00' }] },
          tuesday: { isAvailable: true, slots: [{ start: '08:00', end: '16:00' }] },
          wednesday: { isAvailable: true, slots: [{ start: '08:00', end: '16:00' }] },
          thursday: { isAvailable: true, slots: [{ start: '08:00', end: '16:00' }] },
          friday: { isAvailable: true, slots: [{ start: '08:00', end: '15:00' }] },
          saturday: { isAvailable: false, slots: [] },
          sunday: { isAvailable: false, slots: [] }
        }
      }
    },
    {
      id: 3,
      name: "Maria Santos",
      title: "Interior Designer",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastMessage: "Thank you for the feedback! I'll incorporate those changes into the design.",
      timestamp: "3h ago",
      unread: 0,
      online: true,
      verified: true,
      project: {
        id: 3,
        name: "Living Room Redesign",
        status: "In Progress",
        progress: 60,
        budget: "$4,200",
        dueDate: "2024-02-10",
        location: "Santa Monica, CA",
        priority: "Low"
      },
      rating: 4.7,
      completedProjects: 32,
      responseTime: "3 hours",
      skills: ["Interior Design", "Color Consultation", "Furniture Selection"],
      availability: {
        timezone: 'America/Los_Angeles',
        bufferTime: 15,
        weeklySchedule: {
          monday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:00' }] },
          tuesday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:00' }] },
          wednesday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:00' }] },
          thursday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }, { start: '15:00', end: '19:00' }] },
          friday: { isAvailable: true, slots: [{ start: '10:00', end: '14:00' }] },
          saturday: { isAvailable: true, slots: [{ start: '11:00', end: '15:00' }] },
          sunday: { isAvailable: false, slots: [] }
        }
      }
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Plumbing Expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      lastMessage: "The parts have arrived. I can start the bathroom renovation tomorrow.",
      timestamp: "1d ago",
      unread: 1,
      online: true,
      verified: true,
      project: {
        id: 4,
        name: "Bathroom Plumbing",
        status: "Starting Soon",
        progress: 10,
        budget: "$3,500",
        dueDate: "2024-02-20",
        location: "Hollywood, CA",
        priority: "High"
      },
      rating: 4.9,
      completedProjects: 67,
      responseTime: "30 minutes",
      skills: ["Plumbing", "Bathroom Renovation", "Emergency Repairs"],
      availability: {
        timezone: 'America/Los_Angeles',
        bufferTime: 30,
        weeklySchedule: {
          monday: { isAvailable: true, slots: [{ start: '07:00', end: '15:00' }] },
          tuesday: { isAvailable: true, slots: [{ start: '07:00', end: '15:00' }] },
          wednesday: { isAvailable: true, slots: [{ start: '07:00', end: '15:00' }] },
          thursday: { isAvailable: true, slots: [{ start: '07:00', end: '15:00' }] },
          friday: { isAvailable: true, slots: [{ start: '07:00', end: '13:00' }] },
          saturday: { isAvailable: true, slots: [{ start: '08:00', end: '12:00' }] },
          sunday: { isAvailable: false, slots: [] }
        }
      }
    }
  ];

  // Enhanced messages with more context
  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: "Sarah Mitchell",
      content: "Hi! I've reviewed your kitchen renovation requirements and I'm excited to work with you. I have over 10 years of experience in modern kitchen designs.",
      timestamp: "10:30 AM",
      type: "text",
      isMe: false
    },
    {
      id: 2,
      senderId: "me",
      senderName: "You",
      content: "That's great! I'd love to see some initial concepts. Do you have any examples of similar projects you've worked on?",
      timestamp: "10:35 AM",
      type: "text",
      isMe: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: "Sarah Mitchell",
      content: "Absolutely! I have several kitchen projects that match your style preferences. Let me share some photos from my recent work.",
      timestamp: "10:37 AM",
      type: "text",
      isMe: false
    },
    {
      id: 4,
      senderId: 1,
      senderName: "Sarah Mitchell",
      content: "",
      timestamp: "10:38 AM",
      type: "image",
      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      isMe: false,
      caption: "Modern kitchen design with quartz countertops - completed last month"
    },
    {
      id: 5,
      senderId: "me",
      senderName: "You",
      content: "Wow, this is exactly the style I'm looking for! The modern cabinetry and island design are perfect. When can we meet to discuss the project in detail?",
      timestamp: "10:45 AM",
      type: "text",
      isMe: true
    },
    {
      id: 6,
      senderId: 1,
      senderName: "Sarah Mitchell",
      content: "I'm glad you like it! I've prepared the 3D renderings for your kitchen based on your specifications. Would you like to schedule a video call to review them together? I'm available this week.",
      timestamp: "Just now",
      type: "text",
      isMe: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleScheduleAppointment = (conversation: any) => {
    setSelectedConversationForSchedule(conversation);
    setShowScheduleModal(true);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'In Progress': 'bg-blue-100 text-blue-800',
      'Scheduled': 'bg-green-100 text-green-800',
      'Starting Soon': 'bg-yellow-100 text-yellow-800',
      'Proposal Sent': 'bg-purple-100 text-purple-800',
      'Completed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredConversations = conversations.filter(conv => {
    if (selectedFilter === 'unread') return conv.unread > 0;
    if (selectedFilter === 'online') return conv.online;
    if (selectedFilter === 'high-priority') return conv.project.priority === 'High';
    return true;
  });

  // Helper function to get available time slots for a specific date
  const getAvailableTimeSlots = (professional: any, selectedDate: string) => {
    if (!professional.availability || !selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayIndex = date.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayIndex];
    
    const daySchedule = professional.availability.weeklySchedule[dayName];
    if (!daySchedule || !daySchedule.isAvailable) return [];
    
    const timeSlots = [];
    for (const slot of daySchedule.slots) {
      const startTime = new Date(`1970-01-01T${slot.start}:00`);
      const endTime = new Date(`1970-01-01T${slot.end}:00`);
      
      // Generate 30-minute slots
      while (startTime < endTime) {
        const timeString = startTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        timeSlots.push(timeString);
        startTime.setMinutes(startTime.getMinutes() + 30);
      }
    }
    
    return timeSlots;
  };

  // State for schedule modal
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // Handle date selection
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    if (selectedConversationForSchedule) {
      const slots = getAvailableTimeSlots(selectedConversationForSchedule, date);
      setAvailableTimeSlots(slots);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.1),transparent_60%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center space-y-4">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-dark-900 leading-tight">
              <span className="text-gradient-primary">Project Messages</span>
            </h1>
            <p className="text-xl text-dark-600 leading-relaxed max-w-2xl mx-auto">
              Communicate with your professionals, track project progress, and schedule appointments
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Messages Interface */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-upwork-lg border border-gray-200 overflow-hidden" style={{ height: '800px' }}>
            <div className="flex h-full">
              {/* Enhanced Conversations Sidebar */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                {/* Enhanced Search and Filters Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedFilter('all')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedFilter === 'all' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedFilter('unread')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedFilter === 'unread' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Unread ({conversations.filter(c => c.unread > 0).length})
                      </button>
                      <button
                        onClick={() => setSelectedFilter('online')}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          selectedFilter === 'online' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Online
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Conversations List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedChat(conversation.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        selectedChat === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-1">
                              <h3 className="font-semibold text-dark-900 truncate">{conversation.name}</h3>
                              {conversation.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                              {conversation.unread > 0 && (
                                <div className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                  {conversation.unread}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="text-sm text-gray-600">{conversation.title}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{conversation.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-dark-600 truncate mb-2">{conversation.lastMessage}</p>
                          
                          {/* Enhanced Project Info */}
                          <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-primary-600">{conversation.project.name}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.project.status)}`}>
                                {conversation.project.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{conversation.project.budget}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(conversation.project.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-primary-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${conversation.project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Enhanced Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={selectedConversation.avatar}
                              alt={selectedConversation.name}
                              className="w-12 h-12 rounded-xl object-cover"
                            />
                            {selectedConversation.online && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-dark-900">{selectedConversation.name}</h3>
                              {selectedConversation.verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{selectedConversation.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{selectedConversation.title}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>Response time: {selectedConversation.responseTime}</span>
                              <span>{selectedConversation.completedProjects} projects completed</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleScheduleAppointment(selectedConversation)}
                            className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-md text-sm hover:bg-green-600 transition-colors duration-200 shadow-sm"
                          >
                            <CalendarPlus className="h-3 w-3" />
                            <span>Schedule</span>
                          </button>
                          <Link
                            href={`/client/projects/${selectedConversation.project.id}`}
                            className="flex items-center space-x-1 bg-primary-500 text-white px-2 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                          >
                            <Briefcase className="h-3 w-3" />
                            <span>View Project</span>
                          </Link>
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                            <Phone className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                            <Video className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Project Summary Bar */}
                      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-dark-900">{selectedConversation.project.name}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedConversation.project.status)}`}>
                            {selectedConversation.project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{selectedConversation.project.budget}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{selectedConversation.project.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Flag className={`h-4 w-4 ${getPriorityColor(selectedConversation.project.priority)}`} />
                              <span className={getPriorityColor(selectedConversation.project.priority)}>
                                {selectedConversation.project.priority} Priority
                              </span>
                            </div>
                          </div>
                          <span className="text-sm">{selectedConversation.project.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedConversation.project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md ${message.isMe ? 'order-2' : 'order-1'}`}>
                            {message.type === 'text' ? (
                              <div className={`rounded-2xl px-4 py-3 ${
                                message.isMe 
                                  ? 'bg-primary-500 text-white' 
                                  : 'bg-gray-100 text-dark-900'
                              }`}>
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                            ) : message.type === 'image' ? (
                              <div className="rounded-2xl overflow-hidden border border-gray-200">
                                <img
                                  src={message.imageUrl}
                                  alt="Shared image"
                                  className="w-full h-48 object-cover"
                                />
                                {message.caption && (
                                  <div className="p-3 bg-gray-50">
                                    <p className="text-sm text-gray-700">{message.caption}</p>
                                  </div>
                                )}
                              </div>
                            ) : null}
                            <div className={`text-xs text-gray-500 mt-1 ${message.isMe ? 'text-right' : 'text-left'}`}>
                              {message.timestamp}
                            </div>
                          </div>
                          
                          {!message.isMe && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 order-1 mr-2">
                              <img
                                src={selectedConversation.avatar}
                                alt={selectedConversation.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-end space-x-3">
                        <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                          <Paperclip className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                          <Image className="h-5 w-5" />
                        </button>
                        <div className="flex-1 bg-white border border-gray-300 rounded-xl">
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            rows={1}
                            className="w-full px-4 py-3 bg-transparent border-none resize-none focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className={`p-3 rounded-xl transition-all duration-200 ${
                            newMessage.trim()
                              ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105 shadow-lg'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-primary-500" />
                      </div>
                      <h3 className="font-semibold text-dark-900 mb-2">Select a conversation</h3>
                      <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Appointment Modal */}
      {showScheduleModal && selectedConversationForSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-900">Schedule Meeting</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={selectedConversationForSchedule.avatar}
                  alt={selectedConversationForSchedule.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-dark-900">{selectedConversationForSchedule.name}</p>
                  <p className="text-sm text-gray-600">{selectedConversationForSchedule.title}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Project Consultation</option>
                  <option>Progress Review</option>
                  <option>Design Presentation</option>
                  <option>Site Visit</option>
                  <option>Final Walkthrough</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots
                </label>
                {selectedDate ? (
                  availableTimeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimeSlots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedTime === slot
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No available time slots for this date</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Please select a date to see available times</p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Location
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Project Site</option>
                  <option>Video Call</option>
                  <option>Professional's Office</option>
                  <option>Other Location</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific topics you'd like to discuss..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    // Handle scheduling logic here
                    setShowScheduleModal(false);
                    // Add notification or success message
                  }}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
                >
                  Send Meeting Request
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 border border-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl text-dark-900 mb-6">Communication Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Stay Professional</h4>
                  <p className="text-sm text-gray-600">Maintain clear communication about project details, timelines, and expectations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Schedule Meetings</h4>
                  <p className="text-sm text-gray-600">Use the schedule meeting feature to plan consultations and progress reviews.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-dark-900 mb-2">Share Progress</h4>
                  <p className="text-sm text-gray-600">Keep everyone updated with photos, milestones, and regular project updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 