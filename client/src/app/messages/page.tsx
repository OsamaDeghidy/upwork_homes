'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Phone, 
  Video, 
  Star, 
  CheckCircle, 
  Clock, 
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';

import { useMessages } from '@/hooks/useMessages';
import { useCurrentUser } from '@/hooks/useAuth';
import { MessageFilters } from '@/types';
import messageService from '@/services/messageService';

export default function MessagesPage() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'project'>('all');
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Get current user and URL parameters
  const currentUser = useCurrentUser();
  const searchParams = useSearchParams();
  const conversationIdParam = searchParams.get('conversation');

  // Build filters based on selected filter
  const filters: MessageFilters = {
    ...(searchQuery && { search: searchQuery }),
    ...(selectedFilter === 'unread' && { unread_only: true }),
  };

  // Use messages hook
  const {
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    selectConversation,
    sendMessage,
    searchMessages,
    refreshConversations,
    unreadCount,
  } = useMessages(filters);

  // Auto-select conversation from URL parameter
  useEffect(() => {
    if (conversationIdParam && conversations.length > 0 && !selectedConversation) {
      const conversationId = parseInt(conversationIdParam);
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
        selectConversation(conversationId);
      }
    }
  }, [conversationIdParam, conversations, selectedConversation, selectConversation]);

  // Handlers
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await sendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'file') => {
    if (!file) return;
    
    const content = type === 'image' ? 'Image shared' : `File shared: ${file.name}`;
    await sendMessage(content, type, file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'image');
    }
  };

  const handleFileUploadClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'file');
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await searchMessages(query);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'in_progress': 'bg-blue-100 text-blue-800',
      'open': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'high': 'text-red-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredConversations = conversations.filter(conv => {
    if (selectedFilter === 'unread') return conv.unread_count > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,191,255,0.1),transparent_60%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center space-y-4">
            <h1 className="font-bold text-4xl md:text-5xl text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Project Messages
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Communicate with professionals, track project progress, and coordinate your home improvement projects
            </p>
            {unreadCount > 0 && (
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">{unreadCount} unread messages</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Messages Interface */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden" style={{ height: '700px' }}>
            <div className="flex h-full">
              
              {/* Conversations Sidebar */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                
                {/* Search and Filters Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedFilter('all')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            selectedFilter === 'all' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setSelectedFilter('unread')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                            selectedFilter === 'unread' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Unread ({conversations.filter(c => c.unread_count > 0).length})
                        </button>
                      </div>
                      <button
                        onClick={refreshConversations}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        disabled={loading.conversations}
                      >
                        <RefreshCw className={`h-4 w-4 ${loading.conversations ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                  {loading.conversations ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                      <span className="ml-2 text-gray-600">Loading conversations...</span>
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-600 text-sm">{error}</p>
                      <button
                        onClick={refreshConversations}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Try again
                      </button>
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="p-4 text-center">
                      <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">No conversations found</p>
                    </div>
                  ) : (
                                         filteredConversations.map((conversation) => {
                       const otherParticipant = conversation.participants.find(p => p.id !== currentUser?.id);
                       const fullName = otherParticipant 
                         ? `${otherParticipant.first_name} ${otherParticipant.last_name}`.trim()
                         : 'Unknown User';

                      return (
                        <div
                          key={conversation.id}
                          onClick={() => selectConversation(conversation.id)}
                          className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                            selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                                {otherParticipant?.avatar ? (
                                  <img
                                    src={otherParticipant.avatar}
                                    alt={fullName}
                                    className="w-12 h-12 rounded-xl object-cover"
                                  />
                                ) : (
                                  <span className="text-gray-600 font-medium">
                                    {fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </span>
                                )}
                              </div>
                              {otherParticipant?.is_online && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-1">
                                  <h3 className="font-semibold text-gray-900 truncate">{fullName}</h3>
                                  {otherParticipant?.is_verified && (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">
                                    {conversation.last_message 
                                      ? messageService.formatMessageTime(conversation.last_message.created_at)
                                      : messageService.formatMessageTime(conversation.created_at)
                                    }
                                  </span>
                                  {conversation.unread_count > 0 && (
                                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                      {conversation.unread_count}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 truncate mb-2">
                                {conversation.last_message?.content || 'No messages yet'}
                              </p>
                              
                              {/* Project Info */}
                              {conversation.project && (
                                <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-blue-600 truncate">
                                      {conversation.project.title}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(conversation.project.status)}`}>
                                      {conversation.project.status.replace('_', ' ')}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-xs text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <DollarSign className="h-3 w-3" />
                                      <span>${conversation.project.budget_min} - ${conversation.project.budget_max}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(conversation.project.due_date).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${conversation.project.progress}%` }}
                                    ></div>
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

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            {(() => {
                              const otherParticipant = selectedConversation.participants.find(p => p.id !== currentUser?.id);
                              const fullName = otherParticipant 
                                ? `${otherParticipant.first_name} ${otherParticipant.last_name}`.trim()
                                : 'Unknown User';

                              return (
                                <>
                                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                                    {otherParticipant?.avatar ? (
                                      <img
                                        src={otherParticipant.avatar}
                                        alt={fullName}
                                        className="w-12 h-12 rounded-xl object-cover"
                                      />
                                    ) : (
                                      <span className="text-gray-600 font-medium">
                                        {fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                      </span>
                                    )}
                                  </div>
                                  {otherParticipant?.is_online && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                          <div className="flex-1">
                            {(() => {
                              const otherParticipant = selectedConversation.participants.find(p => p.id !== currentUser?.id);
                              const fullName = otherParticipant 
                                ? `${otherParticipant.first_name} ${otherParticipant.last_name}`.trim()
                                : 'Unknown User';

                              return (
                                <>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold text-gray-900">{fullName}</h3>
                                    {otherParticipant?.is_verified && (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {otherParticipant?.user_type.replace('_', ' ') || 'Professional'}
                                  </p>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          {selectedConversation.project && (
                            <Link
                              href={`/client/projects/${selectedConversation.project.id}`}
                              className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                            >
                              <Briefcase className="h-4 w-4" />
                              <span>View Project</span>
                            </Link>
                          )}
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Phone className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                            <Video className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Project Summary Bar */}
                      {selectedConversation.project && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{selectedConversation.project.title}</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(selectedConversation.project.status)}`}>
                              {selectedConversation.project.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>${selectedConversation.project.budget_min} - ${selectedConversation.project.budget_max}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{selectedConversation.project.location}</span>
                              </div>
                            </div>
                            <span className="text-sm">{selectedConversation.project.progress}% Complete</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${selectedConversation.project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {loading.messages ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                          <span className="ml-2 text-gray-600">Loading messages...</span>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No messages yet. Start the conversation!</p>
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isCurrentUser = message.sender.id === currentUser?.id;
                          
                          return (
                            <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                                {message.message_type === 'text' ? (
                                  <div className={`rounded-2xl px-4 py-3 ${
                                    isCurrentUser 
                                      ? 'bg-blue-500 text-white' 
                                      : 'bg-gray-100 text-gray-900'
                                  }`}>
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                  </div>
                                ) : message.message_type === 'image' ? (
                                  <div className="rounded-2xl overflow-hidden border border-gray-200">
                                    <img
                                      src={message.image_url}
                                      alt="Shared image"
                                      className="w-full h-48 object-cover"
                                    />
                                    {message.content && (
                                      <div className="p-3 bg-gray-50">
                                        <p className="text-sm text-gray-700">{message.content}</p>
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                                <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                                  {messageService.formatMessageTime(message.created_at)}
                                </div>
                              </div>
                              
                              {!isCurrentUser && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 order-1 mr-2">
                                  {message.sender.avatar ? (
                                    <img
                                      src={message.sender.avatar}
                                      alt={`${message.sender.first_name} ${message.sender.last_name}`}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                      <span className="text-xs text-gray-600">
                                        {message.sender.first_name[0]}{message.sender.last_name[0]}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-end space-x-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUploadClick}
                          accept="*/*"
                          className="hidden"
                        />
                        <input
                          type="file"
                          ref={imageInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => imageInputRef.current?.click()}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <ImageIcon className="h-5 w-5" />
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
                          disabled={!newMessage.trim() || loading.sending}
                          className={`p-3 rounded-xl transition-all duration-200 ${
                            newMessage.trim() && !loading.sending
                              ? 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 shadow-lg'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {loading.sending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Select a conversation</h3>
                      <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Communication Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Stay Professional</h4>
                  <p className="text-sm text-gray-600">
                    Maintain clear communication about project details, timelines, and expectations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Regular Updates</h4>
                  <p className="text-sm text-gray-600">
                    Keep your professional informed about any changes or concerns regarding your project.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Share Progress</h4>
                  <p className="text-sm text-gray-600">
                    Use photos and updates to track progress and ensure everyone stays aligned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 