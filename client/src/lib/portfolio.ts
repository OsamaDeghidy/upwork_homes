import api from './api';
import { PortfolioItem, PortfolioImage } from './types';

// خدمات المعرض
export const portfolioService = {
  // الحصول على جميع عناصر المعرض
  async getPortfolioItems(params?: {
    professional_id?: number;
    category?: string;
    featured?: boolean;
    page?: number;
    page_size?: number;
    search?: string;
  }): Promise<{
    results: PortfolioItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/portfolio/', { params });
    return response.data;
  },

  // الحصول على عنصر معرض محدد
  async getPortfolioItem(id: number): Promise<PortfolioItem> {
    const response = await api.get(`/portfolio/${id}/`);
    return response.data;
  },

  // إنشاء عنصر معرض جديد
  async createPortfolioItem(data: {
    title: string;
    description: string;
    category: string;
    project_duration: string;
    project_cost: string;
    completion_date: string;
    featured?: boolean;
  }): Promise<PortfolioItem> {
    const response = await api.post('/portfolio/', data);
    return response.data;
  },

  // تحديث عنصر معرض
  async updatePortfolioItem(id: number, data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const response = await api.patch(`/portfolio/${id}/`, data);
    return response.data;
  },

  // حذف عنصر معرض
  async deletePortfolioItem(id: number): Promise<void> {
    await api.delete(`/portfolio/${id}/`);
  },

  // رفع صورة لعنصر معرض
  async uploadPortfolioImage(portfolioId: number, data: {
    image: File;
    caption?: string;
    is_primary?: boolean;
    order?: number;
  }): Promise<PortfolioImage> {
    const formData = new FormData();
    formData.append('image', data.image);
    if (data.caption) formData.append('caption', data.caption);
    if (data.is_primary !== undefined) formData.append('is_primary', String(data.is_primary));
    if (data.order !== undefined) formData.append('order', String(data.order));

    const response = await api.post(`/portfolio/${portfolioId}/images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // تحديث صورة معرض
  async updatePortfolioImage(portfolioId: number, imageId: number, data: {
    caption?: string;
    is_primary?: boolean;
    order?: number;
  }): Promise<PortfolioImage> {
    const response = await api.patch(`/portfolio/${portfolioId}/images/${imageId}/`, data);
    return response.data;
  },

  // حذف صورة معرض
  async deletePortfolioImage(portfolioId: number, imageId: number): Promise<void> {
    await api.delete(`/portfolio/${portfolioId}/images/${imageId}/`);
  },

  // إعجاب بعنصر معرض
  async likePortfolioItem(id: number): Promise<{ liked: boolean; likes_count: number }> {
    const response = await api.post(`/portfolio/${id}/like/`);
    return response.data;
  },

  // إلغاء الإعجاب بعنصر معرض
  async unlikePortfolioItem(id: number): Promise<{ liked: boolean; likes_count: number }> {
    const response = await api.delete(`/portfolio/${id}/like/`);
    return response.data;
  },

  // زيادة عدد المشاهدات
  async incrementViews(id: number): Promise<{ views: number }> {
    const response = await api.post(`/portfolio/${id}/view/`);
    return response.data;
  },

  // الحصول على معرض المستخدم الحالي
  async getUserPortfolio(params?: {
    category?: string;
    featured?: boolean;
    page?: number;
    page_size?: number;
  }): Promise<{
    results: PortfolioItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/portfolio/my/', { params });
    return response.data;
  },

  // الحصول على الفئات المتاحة
  async getCategories(): Promise<string[]> {
    const response = await api.get('/portfolio/categories/');
    return response.data;
  },

  // البحث في المعرض
  async searchPortfolio(query: string, params?: {
    category?: string;
    professional_id?: number;
    page?: number;
    page_size?: number;
  }): Promise<{
    results: PortfolioItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/portfolio/search/', {
      params: { q: query, ...params }
    });
    return response.data;
  },
};