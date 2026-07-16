import { apiClient } from './api';
import { ApiResponse, User } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_CUSTOMERS } from '../utils/mockData';

export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USER.PROFILE);
      return response.data;
    } catch (error) {
      console.warn('User API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: MOCK_CUSTOMERS[0],
      };
    }
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.UPDATE, data);
      return response.data;
    } catch (error) {
      console.warn('User API error. Falling back to mock data. Error:', error);
      const updatedUser = { ...MOCK_CUSTOMERS[0], ...data };
      return {
        success: true,
        message: 'Profile updated successfully (Mock)',
        data: updatedUser,
      };
    }
  },

  updateSettings: async (settings: any): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USER.SETTINGS, settings);
      return response.data;
    } catch (error) {
      console.warn('User API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        message: 'Settings updated successfully (Mock)',
        data: settings,
      };
    }
  },
};

export default userApi;
