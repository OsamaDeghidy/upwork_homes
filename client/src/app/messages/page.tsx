'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { messagingService, Conversation, Message, User } from '@/lib/messaging';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  Star, 
  CheckCircle, 
  Clock, 
  Image, 
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  MessageSquare,
  CalendarPlus,
  X,
  Flag,
  FileText,
  Download,
  Loader2
} from 'lucide-react';

interface FileUpload {
  file: File;
  preview?: string;
  uploading: boolean;
  error?: string;
}

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [creatingConversation, setCreatingConversation] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load current user info (you might need to implement this endpoint)
        // For now, we'll get it from localStorage or context
        const userData = localStorage.getItem('user');
        if (userData) {
          setCurrentUser(JSON.parse(userData));
        }
        
        // Load conversations
        const response = await messagingService.getConversations();
        setConversations(response.results);
        
        // Check if there's a freelancer parameter to start a new conversation
        const freelancerId = searchParams.get('freelancer');
        if (freelancerId && !creatingConversation) {
          await handleStartConversationWithFreelancer(parseInt(freelancerId));
        } else if (response.results.length > 0 && !selectedChat) {
          // Select first conversation if no specific chat is selected
          setSelectedChat(response.results[0].id);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [searchParams]);

  // Load messages for selected conversation and setup WebSocket
  useEffect(() => {
    const loadMessages = async () => {
      if (selectedChat) {
        try {
          const response = await messagingService.getMessages(selectedChat);
          setMessages(response.results.reverse()); // Reverse to show oldest first
          // Mark conversation as read
          await messagingService.markConversationAsRead(selectedChat);
          
          // Setup WebSocket for real-time messaging
          setupWebSocket(selectedChat);
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      }
    };

    loadMessages();
    
    // Cleanup WebSocket on conversation change
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [selectedChat]);
  
  // State for auto-scroll control
  const [autoScroll, setAutoScroll] = useState(true);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Auto-scroll to bottom when new messages arrive (only if auto-scroll is enabled)
  useEffect(() => {
    if (autoScroll && !userScrolledUp) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100); // Small delay to ensure DOM is updated
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, autoScroll, userScrolledUp]); // Only trigger when length changes, not content
  
  // Setup WebSocket connection for real-time messaging
  const setupWebSocket = (conversationId: number) => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    // Check if WebSocket is supported and backend supports it
    try {
      // Get JWT token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
      
      // Add token to WebSocket URL as query parameter
      const wsUrl = token 
        ? `ws://localhost:8000/ws/chat/${conversationId}/?token=${token}`
        : `ws://localhost:8000/ws/chat/${conversationId}/`;
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected successfully to:', wsUrl);
      };
      
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        
        if (data.type === 'new_message') {
          setMessages(prev => {
            // Check if message already exists
            const exists = prev.some(msg => msg.id === data.message.id);
            if (!exists) {
              return [...prev, data.message];
            }
            return prev;
          });
          
          // Update conversation list with new message
          setConversations(prev => prev.map(conv => 
            conv.id === conversationId 
              ? { ...conv, last_message: data.message, unread_count: data.message.sender.id !== currentUser?.id ? conv.unread_count + 1 : 0 }
              : conv
          ));
        } else if (data.type === 'typing_indicator') {
          // Handle typing indicators
          console.log(`${data.username} is ${data.is_typing ? 'typing' : 'stopped typing'}`);
        } else if (data.type === 'user_connected') {
          console.log(`${data.username} connected`);
        } else if (data.type === 'user_disconnected') {
          console.log(`${data.username} disconnected`);
        }
      };
      
      wsRef.current.onerror = (error) => {
        console.error('WebSocket connection failed:', error);
        console.error('WebSocket URL was:', wsUrl);
        console.error('Token available:', !!token);
      };
      
      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
      };
    } catch (error) {
      console.warn('WebSocket not supported or backend not configured for WebSocket');
    }
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUserScrolledUp(false);
  };

  // Handle scroll events to detect if user scrolled up
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    setUserScrolledUp(!isAtBottom);
  };

  // Force scroll to bottom and enable auto-scroll
  const forceScrollToBottom = () => {
    setAutoScroll(true);
    setUserScrolledUp(false);
    scrollToBottom();
  };

  // Handle starting conversation with freelancer
  const handleStartConversationWithFreelancer = async (freelancerId: number) => {
    try {
      setCreatingConversation(true);
      
      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        conv.participants.some(p => p.id === freelancerId)
      );
      
      if (existingConversation) {
        setSelectedChat(existingConversation.id);
        // Remove freelancer parameter from URL
        router.replace('/messages');
      } else {
        // Create new conversation
        const newConversation = await messagingService.startConversationWithUser(
          freelancerId,
          'Hello! I\'m interested in discussing the project proposal.'
        );
        
        // Update conversations list
        setConversations(prev => [newConversation, ...prev]);
        setSelectedChat(newConversation.id);
        
        // Remove freelancer parameter from URL
        router.replace('/messages');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setCreatingConversation(false);
    }
  };

  // Send message function with file support and improved error handling
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && fileUploads.length === 0) || !selectedChat || sendingMessage) return;
    
    // Validate message content
    if (newMessage.trim().length > 1000) {
      alert('Message is too long. Please keep it under 1000 characters.');
      return;
    }
    
    // Store original values before clearing
    const messageContent = newMessage;
    const filesToUpload = [...fileUploads];
    const optimisticId = Date.now(); // Store the ID for later reference
    
    try {
      setSendingMessage(true);
      
      // Create optimistic message for immediate UI feedback
      const optimisticMessage = {
        id: optimisticId, // Use stored ID
        conversation: selectedChat,
        sender: currentUser || {
          id: 0,
          username: 'You',
          first_name: 'You',
          last_name: '',
          avatar: '',
          user_type: 'user',
          is_verified: false,
          is_available: true
        },
        content: messageContent || 'File attachment',
        message_type: filesToUpload.length > 0 ? 'file' : 'text' as const,
        is_read: false,
        is_edited: false,
        is_deleted: false,
        attachments: [],
        reactions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sending: true // Flag to show sending state
      };
      
      // Add optimistic message to UI
      setMessages(prev => [...prev, optimisticMessage]);
      
      // Clear inputs immediately for better UX
      setNewMessage('');
      setFileUploads([]);
      
      // Upload files first if any
      const uploadedAttachments = [];
      for (const fileUpload of filesToUpload) {
        try {
          const attachment = await messagingService.uploadMessageAttachment(selectedChat, fileUpload.file);
          uploadedAttachments.push(attachment);
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error(`Failed to upload file: ${fileUpload.file.name}`);
        }
      }
      
      // Send message to server
      const messageData = {
        content: messageContent || 'File attachment',
        message_type: filesToUpload.length > 0 ? 'file' : 'text' as const
      };
      
      const sentMessage = await messagingService.sendMessage(selectedChat, messageData);
      
      // Replace optimistic message with real message
      setMessages(prev => prev.map(msg => 
        msg.id === optimisticId ? sentMessage : msg
      ));
      
      // Update conversation list
      setConversations(prev => prev.map(conv => 
        conv.id === selectedChat 
          ? { ...conv, last_message: sentMessage, unread_count: 0 }
          : conv
      ));
      
      // Note: No need to send via WebSocket as the server will broadcast the message
      // to all participants through the WebSocket connection automatically
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Remove optimistic message on error using the stored ID
      setMessages(prev => prev.filter(msg => msg.id !== optimisticId));
      
      // Restore inputs on error
      setNewMessage(messageContent);
      setFileUploads(filesToUpload);
      
      // Show specific error message
      let errorMessage = 'Failed to send message. Please try again.';
      if (error.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.response?.status === 403) {
        errorMessage = 'You do not have permission to send messages in this conversation.';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setSendingMessage(false);
    }
  };
  
  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach(file => {
      // Validate file size (max 10MB per file)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }
      
      // Create preview for images
      let preview: string | undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      
      setFileUploads(prev => [...prev, {
        file,
        preview,
        uploading: false
      }]);
    });
    
    // Clear input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Remove file from upload list
  const removeFile = (fileToRemove: File) => {
    setFileUploads(prev => {
      const updated = prev.filter(f => f.file !== fileToRemove);
      // Clean up preview URLs
      const removedFile = prev.find(f => f.file === fileToRemove);
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return updated;
    });
  };

  // Get selected conversation and other participant
  const selectedConversation = conversations.find(conv => conv.id === selectedChat);
  const otherParticipant = selectedConversation?.participants.find(p => p.id !== currentUser?.id);
  
  // Format user display name
  const formatUserName = (user: User | null | undefined) => {
    if (!user) return 'Unknown User';
    return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || 'Unknown User';
  };
  
  // Format user role
  const formatUserRole = (user: User | null | undefined) => {
    if (!user) return 'User';
    const userType = user.user_type || user.role || 'user';
    const roles: { [key: string]: string } = {
      'client': 'Client',
      'professional': 'Professional',
      'contractor': 'Contractor',
      'designer': 'Designer',
      'architect': 'Architect'
    };
    return roles[userType.toLowerCase()] || 'User';
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800',
      'completed': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredConversations = conversations.filter(conv => {
    // Search filter
    if (searchQuery) {
      const otherParticipant = conv.participants.find(p => p.id !== currentUser?.id);
      const participantName = otherParticipant ? formatUserName(otherParticipant).toLowerCase() : '';
      const projectTitle = conv.project?.title?.toLowerCase() || '';
      const lastMessageContent = conv.last_message?.content?.toLowerCase() || '';
      
      const query = searchQuery.toLowerCase();
      if (!participantName.includes(query) && 
          !projectTitle.includes(query) && 
          !lastMessageContent.includes(query)) {
        return false;
      }
    }
    
    // Status filters
    if (selectedFilter === 'unread') return conv.unread_count > 0;
    if (selectedFilter === 'online') return conv.participants.some(p => p.is_available);
    
    return true;
  });

  // Helper function to get available time slots for a specific date
  const getAvailableTimeSlots = (professional: Professional, selectedDate: string) => {
    if (!professional.availability || !selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayIndex = date.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayIndex];
    
    const daySchedule = professional.availability.weeklySchedule[dayName as keyof WeeklySchedule];
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
                        Unread ({conversations.filter(c => c.unread_count > 0).length})
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
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="flex items-center justify-center p-8 text-gray-500">
                      <p>No conversations found</p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => {
                      const otherParticipant = conversation.participants?.find(p => p.id !== currentUser?.id);
                      const lastMessage = conversation.last_message;
                      
                      return (
                        <div
                          key={conversation.id}
                          onClick={() => setSelectedChat(conversation.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                            selectedChat === conversation.id ? 'bg-primary-50 border-primary-200' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                                {formatUserRole(otherParticipant).charAt(0).toUpperCase()}
                              </div>
                              {otherParticipant?.is_available && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-1">
                                  <h3 className="font-semibold text-dark-900 truncate">{formatUserName(otherParticipant) || 'Unknown User'}</h3>
                                  {otherParticipant?.is_verified && (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">
                                    {lastMessage ? new Date(lastMessage.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                                  </span>
                                  {conversation.unread_count > 0 && (
                                    <div className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                      {conversation.unread_count}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="text-sm text-gray-600">{formatUserRole(otherParticipant) || 'Professional'}</p>
                                {otherParticipant?.is_available ? (
                                  <span className="text-xs text-green-600 font-medium">Online</span>
                                ) : (
                                  <span className="text-xs text-gray-500">Offline</span>
                                )}
                                {otherParticipant?.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-gray-600">{otherParticipant.rating}</span>
                                  </div>
                                )}
                              </div>
                              
                              <p className="text-sm text-dark-600 truncate mb-2">
                                {lastMessage ? lastMessage.content : 'No messages yet'}
                              </p>
                              
                              {/* Enhanced Project Info */}
                              {conversation.project && (
                                <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-primary-600">{conversation.project.title}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.project.status || 'active')}`}>
                                      {conversation.project.status || 'active'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <DollarSign className="h-3 w-3" />
                                      <span>${conversation.project.budget || 'N/A'}</span>
                                    </div>
                                    {conversation.project.deadline && (
                                      <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(conversation.project.deadline).toLocaleDateString()}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
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
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                              {formatUserRole(otherParticipant).charAt(0).toUpperCase()}
                            </div>
                            {selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.is_available && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-dark-900">{selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.name || 'Unknown User'}</h3>
                              {selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.is_verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.rating && (
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600">{selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.rating}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{selectedConversation.participants?.find(p => p.id !== selectedConversation.current_user_id)?.title || 'Professional'}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>Last seen: {selectedConversation.updated_at ? new Date(selectedConversation.updated_at).toLocaleString() : 'Unknown'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Action Buttons */}
                        <div className="flex items-center space-x-2">
                          {selectedConversation.project && (
                            <Link
                              href={`/client/projects/${selectedConversation.project.id}`}
                              className="flex items-center space-x-1 bg-primary-500 text-white px-2 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                            >
                              <Briefcase className="h-3 w-3" />
                              <span>View Project</span>
                            </Link>
                          )}
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                            <Phone className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                            <Video className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Project Summary Bar */}
                      {selectedConversation.project && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-dark-900">{selectedConversation.project.title}</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedConversation.project.status || 'active')}`}>
                              {selectedConversation.project.status || 'active'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>${selectedConversation.project.budget || 'N/A'}</span>
                              </div>
                              {selectedConversation.project.location && (
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{selectedConversation.project.location}</span>
                                </div>
                              )}
                            </div>
                            {selectedConversation.project.deadline && (
                              <span className="text-sm">
                                Due: {new Date(selectedConversation.project.deadline).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 relative" onScroll={handleScroll}>
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <p>No messages yet. Start the conversation!</p>
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isMe = message.sender === currentUser?.id;
                          const messageSender = selectedConversation.participants?.find(p => p.id === message.sender);
                          const senderName = formatUserName(messageSender);
                          const senderRole = formatUserRole(messageSender);
                          
                          return (
                            <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-2' : 'order-1'}`}>
                                {/* Sender info for non-me messages */}
                                {!isMe && (
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-medium text-gray-700">{senderName}</span>
                                    <span className="text-xs text-gray-500">• {senderRole}</span>
                                    {messageSender?.is_available && (
                                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    )}
                                  </div>
                                )}
                                <div className={`rounded-2xl px-4 py-3 ${
                                  isMe 
                                    ? 'bg-primary-500 text-white' 
                                    : 'bg-gray-100 text-dark-900'
                                }`}>
                                  <p className="text-sm leading-relaxed">{message.content}</p>
                                </div>
                                
                                {/* Message attachments */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {message.attachments.map((attachment) => (
                                      <div key={attachment.id || attachment.file_url} className="rounded-lg overflow-hidden border border-gray-200">
                                        {attachment.file_type?.startsWith('image/') ? (
                                          <img
                                            src={attachment.file_url}
                                            alt="Attachment"
                                            className="w-full h-48 object-cover"
                                          />
                                        ) : (
                                          <div className="p-3 bg-gray-50 flex items-center space-x-2">
                                            <Paperclip className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{attachment.original_filename || attachment.file_name}</span>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <div className={`text-xs text-gray-500 mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                                  {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              </div>
                              
                              {!isMe && (
                                <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 order-1 mr-2">
                                  {formatUserRole(messageSender).charAt(0).toUpperCase()}
                                  {messageSender?.is_available && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                      {/* Scroll anchor for auto-scroll */}
                      <div ref={messagesEndRef} />
                      
                      {/* Floating scroll to bottom button */}
                      {userScrolledUp && (
                        <div className="absolute bottom-4 right-4">
                          <button
                            onClick={forceScrollToBottom}
                            className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-200 flex items-center space-x-2"
                            title="Scroll to latest message"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* WhatsApp-style Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                      {/* File Upload Preview */}
                      {fileUploads.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Files to upload:</span>
                            <button
                              onClick={() => setFileUploads([])}
                              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            {fileUploads.map((upload, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-3">
                                  {upload.preview ? (
                                    <img src={upload.preview} alt="Preview" className="w-10 h-10 object-cover rounded-lg" />
                                  ) : (
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                      <Paperclip className="h-5 w-5 text-primary-600" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <span className="text-sm font-medium text-gray-900">{upload.file.name}</span>
                                    <div className="text-xs text-gray-500">({(upload.file.size / 1024 / 1024).toFixed(2)} MB)</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFile(upload.file)}
                                  className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Message Input Container */}
                      <div className="flex items-end space-x-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.txt"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        
                        {/* Attachment Button */}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-200 hover:scale-110"
                          title="Attach file"
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                        
                        {/* Message Input */}
                        <div className="flex-1 relative">
                          <div className="bg-gray-50 border border-gray-200 rounded-3xl px-4 py-2 focus-within:border-primary-300 focus-within:bg-white transition-all duration-200">
                            <textarea
                              value={newMessage}
                              onChange={(e) => {
                                setNewMessage(e.target.value);
                                // Auto-resize textarea
                                e.target.style.height = 'auto';
                                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                              }}
                              onKeyPress={handleKeyPress}
                              placeholder="Type a message..."
                              rows={1}
                              className="w-full bg-transparent border-none resize-none focus:outline-none text-gray-900 placeholder-gray-500 py-2 max-h-[120px] min-h-[24px]"
                              style={{ height: '24px' }}
                            />
                          </div>
                        </div>
                        
                        {/* Send Button */}
                        <button
                          onClick={handleSendMessage}
                          disabled={(!newMessage.trim() && fileUploads.length === 0) || sendingMessage}
                          className={`p-3 rounded-full transition-all duration-200 ${
                            (newMessage.trim() || fileUploads.length > 0) && !sendingMessage
                              ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-110 shadow-lg hover:shadow-xl'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          title="Send message"
                        >
                          {sendingMessage ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      
                      {/* Character count indicator */}
                      {newMessage.length > 800 && (
                        <div className="mt-2 text-right">
                          <span className={`text-xs ${
                            newMessage.length > 1000 ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {newMessage.length}/1000
                          </span>
                        </div>
                      )}
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


    </div>
  );
}