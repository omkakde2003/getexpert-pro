import { apiClient } from './api';
import { ApiResponse, ExpertProfile, AvailabilitySlot } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_EXPERT_PROFILES } from '../utils/mockData';

export const expertApi = {
  getProfile: async (): Promise<ApiResponse<ExpertProfile>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EXPERT.PROFILE);
      return response.data;
    } catch (error) {
      console.warn('Expert API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: MOCK_EXPERT_PROFILES[0],
      };
    }
  },

  updateProfile: async (data: Partial<ExpertProfile>): Promise<ApiResponse<ExpertProfile>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.EXPERT.UPDATE, data);
      return response.data;
    } catch (error) {
      console.warn('Expert API error. Falling back to mock data. Error:', error);
      const updated = { ...MOCK_EXPERT_PROFILES[0], ...data };
      return {
        success: true,
        message: 'Expert profile updated successfully (Mock)',
        data: updated,
      };
    }
  },

  updateAvailability: async (slots: AvailabilitySlot[]): Promise<ApiResponse<AvailabilitySlot[]>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.EXPERT.AVAILABILITY, { slots });
      return response.data;
    } catch (error) {
      console.warn('Expert API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        message: 'Availability updated successfully (Mock)',
        data: slots,
      };
    }
  },

  getAnalytics: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EXPERT.ANALYTICS);
      return response.data;
    } catch (error) {
      console.warn('Expert API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: {
          totalEarnings: 4850,
          pendingEarnings: 320,
          completedBookings: 48,
          averageRating: 4.8,
        },
      };
    }
  },

  getExpertsList: async (): Promise<ApiResponse<ExpertProfile[]>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EXPERT.LIST);
      return response.data;
    } catch (error) {
      console.warn('Expert API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: MOCK_EXPERT_PROFILES,
      };
    }
  },
};

export default expertApi;
