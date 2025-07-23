// User Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'client' | 'home_pro' | 'specialist' | 'crew_member';
  avatar?: string;
  is_verified: boolean;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  due_date: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  client: User;
  professional?: User;
  created_at: string;
  updated_at: string;
}

// Message Types
export interface Message {
  id: number;
  conversation: number;
  sender: User;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  image_url?: string;
  file_url?: string;
  file_name?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

// Conversation Types
export interface Conversation {
  id: number;
  participants: User[];
  project?: Project;
  last_message?: Message;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ConversationListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Conversation[];
}

export interface MessageListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Message[];
}

// Form Types
export interface SendMessageData {
  conversation: number;
  content: string;
  message_type?: 'text' | 'image' | 'file';
  image?: File;
  file?: File;
}

export interface CreateConversationData {
  participants: number[];
  project?: number;
  initial_message?: string;
}

// Filter and Search Types
export interface MessageFilters {
  search?: string;
  unread_only?: boolean;
  project_id?: number;
  participant_id?: number;
}

// Professional-specific Types
export interface ProfessionalProfile {
  id: number;
  user: User;
  title: string;
  rating: number;
  completed_projects: number;
  response_time: string;
  skills: string[];
  hourly_rate?: number;
  is_available: boolean;
}

// Error Types
export interface ApiError {
  detail?: string;
  message?: string;
  errors?: { [key: string]: string[] };
}

// Loading State Types
export interface LoadingState {
  conversations: boolean;
  messages: boolean;
  sending: boolean;
}