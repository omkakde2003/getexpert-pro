import { apiClient } from './api';
import { ApiResponse, ServiceItem } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_SERVICES } from '../utils/mockData';

export const serviceApi = {
  getServices: async (category?: string): Promise<ApiResponse<ServiceItem[]>> => {
    try {
      const url = category 
        ? `${API_ENDPOINTS.SERVICES.BASE}?category=${encodeURIComponent(category)}`
        : API_ENDPOINTS.SERVICES.BASE;
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.warn('Services API error. Falling back to mock data. Error:', error);
      const filtered = category 
        ? MOCK_SERVICES.filter(s => s.category.toLowerCase() === category.toLowerCase())
        : MOCK_SERVICES;
      return {
        success: true,
        data: filtered,
      };
    }
  },

  getService: async (id: string): Promise<ApiResponse<ServiceItem>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SERVICES.GET_ONE(id));
      return response.data;
    } catch (error) {
      console.warn('Services API error. Falling back to mock data. Error:', error);
      const service = MOCK_SERVICES.find((s) => s.id === id) || MOCK_SERVICES[0];
      return {
        success: true,
        data: service,
      };
    }
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SERVICES.CATEGORIES);
      return response.data;
    } catch (error) {
      console.warn('Services API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: ['Technology', 'Digital Marketing', 'Content Writing', 'Branding', 'Consulting'],
      };
    }
  },
};

export default serviceApi;
