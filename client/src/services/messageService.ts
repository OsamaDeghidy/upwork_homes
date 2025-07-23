import {
  Conversation,
  Message,
  ConversationListResponse,
  MessageListResponse,
  SendMessageData,
  CreateConversationData,
  MessageFilters,
  ApiError
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class MessageService {
  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Something went wrong');
    }
    return response.json();
  }

  // Get conversations list with filters
  async getConversations(filters: MessageFilters = {}): Promise<ConversationListResponse> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.unread_only) params.append('unread_only', 'true');
    if (filters.project_id) params.append('project_id', filters.project_id.toString());
    if (filters.participant_id) params.append('participant_id', filters.participant_id.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/conversations/${queryString ? `?${queryString}` : ''}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return this.handleResponse<ConversationListResponse>(response);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }

  // Get specific conversation details
  async getConversation(conversationId: number): Promise<Conversation> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return this.handleResponse<Conversation>(response);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  }

  // Get messages for a conversation
  async getMessages(conversationId: number, page = 1): Promise<MessageListResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/conversations/${conversationId}/messages/?page=${page}`,
        {
          method: 'GET',
          headers: await this.getAuthHeaders(),
        }
      );

      return this.handleResponse<MessageListResponse>(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Send a text message
  async sendMessage(data: SendMessageData): Promise<Message> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<Message>(response);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Send message with file/image
  async sendMessageWithFile(data: SendMessageData): Promise<Message> {
    try {
      const formData = new FormData();
      formData.append('conversation', data.conversation.toString());
      formData.append('content', data.content);
      formData.append('message_type', data.message_type || 'text');
      
      if (data.image) {
        formData.append('image', data.image);
      }
      if (data.file) {
        formData.append('file', data.file);
      }

      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/messages/`, {
        method: 'POST',
        headers,
        body: formData,
      });

      return this.handleResponse<Message>(response);
    } catch (error) {
      console.error('Error sending message with file:', error);
      throw error;
    }
  }

  // Create new conversation
  async createConversation(data: CreateConversationData): Promise<Conversation> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/`, {
        method: 'POST',
        headers: await this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<Conversation>(response);
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  // Mark messages as read
  async markAsRead(conversationId: number): Promise<void> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/conversations/${conversationId}/mark_read/`,
        {
          method: 'POST',
          headers: await this.getAuthHeaders(),
        }
      );

      await this.handleResponse<void>(response);
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  // Delete message
  async deleteMessage(messageId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/`, {
        method: 'DELETE',
        headers: await this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  // Search conversations and messages
  async searchMessages(query: string): Promise<{
    conversations: Conversation[];
    messages: Message[];
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/messages/search/?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: await this.getAuthHeaders(),
        }
      );

      return this.handleResponse<{ conversations: Conversation[]; messages: Message[] }>(response);
    } catch (error) {
      console.error('Error searching messages:', error);
      throw error;
    }
  }

  // Get unread message count
  async getUnreadCount(): Promise<{ count: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/unread_count/`, {
        method: 'GET',
        headers: await this.getAuthHeaders(),
      });

      return this.handleResponse<{ count: number }>(response);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  }

  // Start conversation with professional
  async startConversationWithProfessional(
    professionalId: number,
    projectId?: number,
    initialMessage?: string
  ): Promise<Conversation> {
    const data: CreateConversationData = {
      participants: [professionalId],
      project: projectId,
      initial_message: initialMessage,
    };

    return this.createConversation(data);
  }

  // Utility method to format message timestamp
  formatMessageTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }

  // Utility method to get participant name (excluding current user)
  getOtherParticipant(conversation: Conversation, currentUserId: number): string {
    const otherParticipant = conversation.participants.find(p => p.id !== currentUserId);
    return otherParticipant 
      ? `${otherParticipant.first_name} ${otherParticipant.last_name}`.trim()
      : 'Unknown User';
  }
}

export const messageService = new MessageService();
export default messageService;