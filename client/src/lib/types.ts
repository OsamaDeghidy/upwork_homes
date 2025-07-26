// أنواع البيانات للمصادقة والمستخدم

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'client' | 'home_pro' | 'specialist' | 'crew_member';
  phone?: string;
  location?: string;
  avatar?: string;
  is_verified: boolean;
  verification_status: string;
  company_name?: string;
  bio?: string;
  website?: string;
  experience_years?: number;
  hourly_rate?: number;
  skills: string[];
  rating_average?: number;
  rating_count: number;
  is_available: boolean;
  last_activity?: string;
  license_number?: string;
  insurance_verified: boolean;
  background_check_verified: boolean;
  notification_preferences: Record<string, any>;
  projects_completed: number;
  total_earnings: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  user: number;
  social_links: Record<string, string>;
  portfolio_images: string[];
  certifications: string[];
  emergency_contact: Record<string, any>;
  business_info: Record<string, any>;
  banking_info: Record<string, any>;
  availability_schedule: Record<string, any>;
  service_areas: string[];
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  user_type: 'client' | 'home_pro' | 'specialist' | 'crew_member';
  phone?: string;
  location?: string;
  company_name?: string;
  bio?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// أنواع البيانات للمشاريع
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  order: number;
  projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: User;
  category: Category;
  location: string;
  budget_type: 'fixed' | 'hourly' | 'negotiable';
  budget_min?: number;
  budget_max?: number;
  budget_display: string;
  timeline: string;
  start_date?: string;
  end_date?: string;
  required_skills: string[];
  required_roles: string[];
  additional_requirements?: string;
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled' | 'paused';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  is_featured: boolean;
  is_remote_allowed: boolean;
  requires_license: boolean;
  requires_insurance: boolean;
  views_count: number;
  favorites_count: number;
  proposals_count: number;
  assigned_professional?: User;
  completion_percentage: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  is_favorited?: boolean;
}

// أنواع البيانات للمعرض
export interface PortfolioItem {
  id: number;
  professional: User;
  title: string;
  description: string;
  category: string;
  project_duration: string;
  project_cost: string;
  completion_date: string;
  featured: boolean;
  likes: number;
  views: number;
  images: PortfolioImage[];
  created_at: string;
  updated_at: string;
}

export interface PortfolioImage {
  id: number;
  portfolio_item: number;
  image: string;
  caption: string;
  is_primary: boolean;
  order: number;
  created_at: string;
}

// أنواع البيانات للعقود
export interface ContractMilestone {
  id: number;
  contract: number;
  title: string;
  description: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  completion_date?: string;
  payment_date?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContractDocument {
  id: number;
  contract: number;
  name: string;
  document_type: string;
  file: string;
  uploaded_by: number;
  is_signed: boolean;
  created_at: string;
}

export interface ContractLocation {
  id: number;
  contract: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: number;
  contract_number: string;
  title: string;
  description: string;
  client: number;
  professional: number;
  project?: number;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  payment_type: 'fixed' | 'hourly' | 'milestone';
  hourly_rate?: number;
  start_date: string;
  end_date: string;
  actual_end_date?: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  completion_percentage: number;
  terms_and_conditions: string;
  warranty_period: string;
  payment_terms: string;
  client_signed: boolean;
  professional_signed: boolean;
  client_signed_date?: string;
  professional_signed_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractDetail extends Contract {
  client_details: User;
  professional_details: User;
  milestones: ContractMilestone[];
  documents: ContractDocument[];
  locations?: ContractLocation[];
}

export interface CreateContractData {
  title: string;
  description: string;
  professional: number;
  project?: number;
  total_amount: number;
  payment_type: 'fixed' | 'hourly' | 'milestone';
  hourly_rate?: number;
  start_date: string;
  end_date: string;
  terms_and_conditions?: string;
  warranty_period?: string;
  payment_terms?: string;
}

export interface UpdateContractData {
  title?: string;
  description?: string;
  total_amount?: number;
  payment_type?: 'fixed' | 'hourly' | 'milestone';
  hourly_rate?: number;
  start_date?: string;
  end_date?: string;
  terms_and_conditions?: string;
  warranty_period?: string;
  payment_terms?: string;
  status?: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  completion_percentage?: number;
}

export interface CreateMilestoneData {
  title: string;
  description?: string;
  amount: number;
  due_date: string;
  order: number;
}

export interface ContractFilters {
  status?: string;
  payment_type?: string;
  search?: string;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
  page?: number;
  page_size?: number;
}