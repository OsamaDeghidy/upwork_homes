import api from './api';
import { Project, Category } from './types';

// Project creation data interface
export interface ProjectCreateData {
  title: string;
  description: string;
  category: number;
  location: string;
  budget_type?: 'fixed' | 'range' | 'min' | 'max';
  budget_min?: number;
  budget_max?: number;
  timeline: string;
  required_skills: string[];
  required_roles: string[];
  urgency: 'urgent' | 'moderate' | 'flexible';
  is_remote_allowed?: boolean;
  requires_license?: boolean;
  requires_insurance?: boolean;
  additional_requirements?: string;
  start_date?: string;
  end_date?: string;
}

// Projects service
export const projectsService = {
  // Create a new project
  async createProject(data: ProjectCreateData): Promise<Project> {
    const response = await api.post('/projects/create/', data);
    return response.data;
  },

  // Get all projects
  async getProjects(params?: {
    category?: string;
    location?: string;
    budget_min?: number;
    budget_max?: number;
    urgency?: string;
    search?: string;
    page?: number;
  }): Promise<{ results: Project[]; count: number; next: string | null; previous: string | null }> {
    const response = await api.get('/projects/', { params });
    return response.data;
  },

  // Get user's projects
  async getMyProjects(params?: {
    status?: string;
    category?: string;
    search?: string;
    page?: number;
  }): Promise<{ results: Project[]; count: number; next: string | null; previous: string | null }> {
    const response = await api.get('/projects/my/', { params });
    return response.data;
  },

  // Get project by slug
  async getProject(slug: string): Promise<Project> {
    const response = await api.get(`/projects/${slug}/`);
    return response.data;
  },

  // Get categories
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/projects/categories/');
    return response.data.results || response.data;
  },

  // Search projects
  async searchProjects(query: string): Promise<{
    results: Project[];
    suggestions: Array<{
      id: string;
      type: string;
      text: string;
      count: number;
    }>;
  }> {
    const response = await api.post('/projects/search/', { q: query });
    return response.data;
  },

  // Get project statistics
  async getProjectStats(): Promise<{
    total_projects: number;
    active_projects: number;
    total_budget: string;
    average_budget: string;
    success_rate: string;
    average_response_time: string;
    top_categories: Array<{
      name: string;
      count: number;
      percentage: number;
    }>;
    trending_skills: string[];
    location_stats: Array<{
      location: string;
      count: number;
    }>;
  }> {
    const response = await api.get('/projects/stats/');
    return response.data;
  },

  // Add project image
  async addProjectImage(slug: string, file: File, caption?: string): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);
    if (caption) {
      formData.append('caption', caption);
    }
    
    const response = await api.post(`/projects/${slug}/images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Add project file
  async addProjectFile(slug: string, file: File, description?: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }
    
    const response = await api.post(`/projects/${slug}/files/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};