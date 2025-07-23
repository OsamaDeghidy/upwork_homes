import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Conversation,
  Message,
  ConversationListResponse,
  MessageListResponse,
  SendMessageData,
  CreateConversationData,
  MessageFilters,
  LoadingState
} from '@/types';
import messageService from '@/services/messageService';

export interface UseMessagesReturn {
  // State
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  messages: Message[];
  loading: LoadingState;
  error: string | null;
  
  // Actions
  selectConversation: (conversationId: number) => void;
  sendMessage: (content: string, type?: 'text' | 'image' | 'file', file?: File) => Promise<void>;
  createConversation: (data: CreateConversationData) => Promise<Conversation>;
  loadMoreMessages: () => Promise<void>;
  markAsRead: (conversationId: number) => Promise<void>;
  searchMessages: (query: string) => Promise<void>;
  refreshConversations: () => Promise<void>;
  
  // Utility
  hasMoreMessages: boolean;
  unreadCount: number;
}

export function useMessages(filters: MessageFilters = {}): UseMessagesReturn {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    conversations: true,
    messages: false,
    sending: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentConversationId = useRef<number | null>(null);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Load conversations
  const loadConversations = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, conversations: true }));
      setError(null);

      const response = await messageService.getConversations(filters);
      setConversations(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversations');
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(prev => ({ ...prev, conversations: false }));
    }
  }, [filters]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: number, page = 1, append = false) => {
    try {
      setLoading(prev => ({ ...prev, messages: true }));
      setError(null);

      const response = await messageService.getMessages(conversationId, page);
      
      if (append) {
        setMessages(prev => [...response.results.reverse(), ...prev]);
      } else {
        setMessages(response.results.reverse());
        setTimeout(scrollToBottom, 100);
      }
      
      setHasMoreMessages(!!response.next);
      setMessagesPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(prev => ({ ...prev, messages: false }));
    }
  }, [scrollToBottom]);

  // Select conversation
  const selectConversation = useCallback(async (conversationId: number) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;

    setSelectedConversation(conversation);
    currentConversationId.current = conversationId;
    
    // Load messages for selected conversation
    await loadMessages(conversationId);
    
    // Mark as read
    if (conversation.unread_count > 0) {
      await markAsRead(conversationId);
    }
  }, [conversations, loadMessages]);

  // Send message
  const sendMessage = useCallback(async (
    content: string,
    type: 'text' | 'image' | 'file' = 'text',
    file?: File
  ) => {
    if (!selectedConversation || !content.trim()) return;

    try {
      setLoading(prev => ({ ...prev, sending: true }));
      setError(null);

      const messageData: SendMessageData = {
        conversation: selectedConversation.id,
        content,
        message_type: type,
      };

      if (file) {
        if (type === 'image') {
          messageData.image = file;
        } else {
          messageData.file = file;
        }
      }

      const newMessage = file 
        ? await messageService.sendMessageWithFile(messageData)
        : await messageService.sendMessage(messageData);

      // Add message to current messages
      setMessages(prev => [...prev, newMessage]);
      
      // Update last message in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, last_message: newMessage }
            : conv
        )
      );

      setTimeout(scrollToBottom, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(prev => ({ ...prev, sending: false }));
    }
  }, [selectedConversation, scrollToBottom]);

  // Create conversation
  const createConversation = useCallback(async (data: CreateConversationData): Promise<Conversation> => {
    try {
      setError(null);
      const newConversation = await messageService.createConversation(data);
      
      // Add to conversations list
      setConversations(prev => [newConversation, ...prev]);
      
      return newConversation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
      console.error('Error creating conversation:', err);
      throw err;
    }
  }, []);

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(async () => {
    if (!selectedConversation || loading.messages || !hasMoreMessages) return;
    
    await loadMessages(selectedConversation.id, messagesPage + 1, true);
  }, [selectedConversation, loading.messages, hasMoreMessages, messagesPage, loadMessages]);

  // Mark as read
  const markAsRead = useCallback(async (conversationId: number) => {
    try {
      await messageService.markAsRead(conversationId);
      
      // Update unread count in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, unread_count: 0 }
            : conv
        )
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, []);

  // Search messages
  const searchMessages = useCallback(async (query: string) => {
    try {
      setLoading(prev => ({ ...prev, conversations: true }));
      setError(null);

      if (!query.trim()) {
        await loadConversations();
        return;
      }

      const response = await messageService.searchMessages(query);
      setConversations(response.conversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search messages');
      console.error('Error searching messages:', err);
    } finally {
      setLoading(prev => ({ ...prev, conversations: false }));
    }
  }, [loadConversations]);

  // Refresh conversations
  const refreshConversations = useCallback(async () => {
    await loadConversations();
  }, [loadConversations]);

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    try {
      const response = await messageService.getUnreadCount();
      setUnreadCount(response.count);
    } catch (err) {
      console.error('Error loading unread count:', err);
    }
  }, []);

  // Real-time updates simulation (replace with WebSocket in production)
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentConversationId.current) {
        // Refresh current conversation messages
        loadMessages(currentConversationId.current, 1);
      }
      // Refresh conversations list
      loadConversations();
      // Update unread count
      loadUnreadCount();
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [loadMessages, loadConversations, loadUnreadCount]);

  // Initial load
  useEffect(() => {
    loadConversations();
    loadUnreadCount();
  }, [loadConversations, loadUnreadCount]);

  return {
    // State
    conversations,
    selectedConversation,
    messages,
    loading,
    error,
    
    // Actions
    selectConversation,
    sendMessage,
    createConversation,
    loadMoreMessages,
    markAsRead,
    searchMessages,
    refreshConversations,
    
    // Utility
    hasMoreMessages,
    unreadCount,
  };
}