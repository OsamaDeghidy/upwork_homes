import { apiClient } from './api';
import { portfolioService } from '../lib/portfolio';
import { proposalsService } from '../lib/proposals';
import { contractsService } from '../lib/contracts';
import { messagingService } from '../lib/messaging';

// Professional detail interfaces
export interface ProfessionalDetail {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  display_name: string;
  email: string;
  avatar: string | null;
  user_type: 'home_pro' | 'specialist' | 'crew_member';
  is_verified: boolean;
  company_name: string | null;
  location: string | null;
  bio: string | null;
  skills: string[] | null;
  rating_average: number;
  rating_count: number;
  hourly_rate: number | null;
  experience_years: number | null;
  is_available: boolean;
  projects_completed: number;
  total_earnings: number;
  verification_badges: string[];
  completion_rate: number;
  response_time: string;
  created_at: string;
  website: string | null;
  phone: string | null;
  license_number: string | null;
  insurance_verified: boolean;
  background_check_verified: boolean;
  // Additional profile data
  education?: string;
  certifications?: string[];
  languages?: string[];
  service_area?: string;
  availability_status?: string;
  specializations?: string[];
}

export interface ProfessionalPortfolio {
  id: number;
  title: string;
  description: string;
  category: string;
  project_duration: string;
  project_cost: string;
  completion_date: string;
  featured: boolean;
  images: {
    id: number;
    image: string;
    caption: string;
    is_primary: boolean;
    order: number;
  }[];
  created_at: string;
}

export interface ProfessionalReview {
  id: number;
  client: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar: string | null;
    location: string | null;
  };
  rating: number;
  comment: string;
  project_title?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalAvailability {
  id: number;
  professional: number;
  day_of_week: number; // 0-6 (Monday-Sunday)
  start_time: string;
  end_time: string;
  is_available: boolean;
  break_start?: string;
  break_end?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalProject {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  budget_min: number;
  budget_max: number;
  timeline: string;
  location: string;
  created_at: string;
  client: {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
  };
}

export interface ProfessionalStats {
  total_projects: number;
  completed_projects: number;
  active_projects: number;
  total_earnings: number;
  average_rating: number;
  total_reviews: number;
  response_rate: number;
  completion_rate: number;
  repeat_clients: number;
  on_time_completion: number;
}

class ProfessionalDetailApiService {
  private baseUrl = '/auth';

  // Get complete professional profile
  async getProfessionalDetail(id: number): Promise<ProfessionalDetail> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/users/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professional detail:', error);
      throw error;
    }
  }

  // Get professional portfolio
  async getProfessionalPortfolio(professionalId: number): Promise<{
    results: ProfessionalPortfolio[];
    count: number;
  }> {
    try {
      return await portfolioService.getPortfolioItems({ professional_id: professionalId });
    } catch (error) {
      console.error('Error fetching professional portfolio:', error);
      throw error;
    }
  }

  // Get professional reviews
  async getProfessionalReviews(professionalId: number, page: number = 1): Promise<{
    results: ProfessionalReview[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    try {
      const response = await apiClient.get(`/reviews/professional/${professionalId}/`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching professional reviews:', error);
      throw error;
    }
  }

  // Get professional availability
  async getProfessionalAvailability(professionalId: number): Promise<ProfessionalAvailability[]> {
    try {
      const response = await apiClient.get(`/calendar/professional/${professionalId}/availability/`);
      return response.data.results || response.data;
    } catch (error) {
      console.error('Error fetching professional availability:', error);
      throw error;
    }
  }

  // Get professional projects
  async getProfessionalProjects(professionalId: number, status?: string): Promise<{
    results: ProfessionalProject[];
    count: number;
  }> {
    try {
      const params = status ? { status } : {};
      const response = await apiClient.get(`/projects/professional/${professionalId}/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching professional projects:', error);
      throw error;
    }
  }

  // Get professional statistics
  async getProfessionalStats(professionalId: number): Promise<ProfessionalStats> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/users/${professionalId}/stats/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professional stats:', error);
      throw error;
    }
  }

  // Get professional proposals
  async getProfessionalProposals(professionalId: number): Promise<{
    results: any[];
    count: number;
  }> {
    try {
      const response = await proposalsService.getProfessionalProposals();
      return {
        results: response.proposals,
        count: response.count
      };
    } catch (error) {
      console.error('Error fetching professional proposals:', error);
      throw error;
    }
  }

  // Get professional contracts
  async getProfessionalContracts(professionalId: number): Promise<{
    results: any[];
    count: number;
  }> {
    try {
      return await contractsService.getProfessionalContracts();
    } catch (error) {
      console.error('Error fetching professional contracts:', error);
      throw error;
    }
  }

  // Get professional location data
  async getProfessionalLocation(professionalId: number): Promise<{
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    service_radius: number;
  }> {
    try {
      const response = await apiClient.get(`/location/professional/${professionalId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching professional location:', error);
      throw error;
    }
  }

  // Get all professional data in one call
  async getCompleteProfessionalData(id: number): Promise<{
    profile: ProfessionalDetail;
    portfolio: ProfessionalPortfolio[];
    reviews: ProfessionalReview[];
    availability: ProfessionalAvailability[];
    projects: ProfessionalProject[];
    stats: ProfessionalStats;
    location: any;
  }> {
    try {
      const [profile, portfolio, reviews, availability, projects, stats, location] = await Promise.allSettled([
        this.getProfessionalDetail(id),
        this.getProfessionalPortfolio(id),
        this.getProfessionalReviews(id),
        this.getProfessionalAvailability(id),
        this.getProfessionalProjects(id),
        this.getProfessionalStats(id),
        this.getProfessionalLocation(id)
      ]);

      return {
        profile: profile.status === 'fulfilled' ? profile.value : null,
        portfolio: portfolio.status === 'fulfilled' ? portfolio.value.results : [],
        reviews: reviews.status === 'fulfilled' ? reviews.value.results : [],
        availability: availability.status === 'fulfilled' ? availability.value : [],
        projects: projects.status === 'fulfilled' ? projects.value.results : [],
        stats: stats.status === 'fulfilled' ? stats.value : null,
        location: location.status === 'fulfilled' ? location.value : null
      };
    } catch (error) {
      console.error('Error fetching complete professional data:', error);
      throw error;
    }
  }
}

export const professionalDetailApi = new ProfessionalDetailApiService();
export default professionalDetailApi;