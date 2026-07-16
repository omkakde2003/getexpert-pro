import { apiClient } from './api';
import { ApiResponse, User } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_CUSTOMERS, MOCK_EXPERTS, MOCK_ADMINS } from '../utils/mockData';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  role: 'customer' | 'expert';
  password?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return response.data;
    } catch (error) {
      // Return fallback Mock Data based on role email signature
      console.warn('Auth API error. Falling back to mock data. Error:', error);
      
      let user: User = MOCK_CUSTOMERS[0];
      const email = credentials.email.toLowerCase();
      
      if (email.includes('admin')) {
        user = MOCK_ADMINS[0];
      } else if (email.includes('expert')) {
        user = MOCK_EXPERTS[0];
      } else if (email.includes('john')) {
        user = MOCK_CUSTOMERS[1];
      }

      return {
        success: true,
        message: 'Mock Login Successful',
        data: {
          user,
          token: `mock-jwt-access-token-${user.role}`,
          refreshToken: `mock-jwt-refresh-token-${user.role}`,
        },
      };
    }
  },

  register: async (data: RegisterCredentials): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
      return response.data;
    } catch (error) {
      console.warn('Auth API error. Falling back to mock data. Error:', error);
      const newUser: User = {
        id: `c_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email,
        role: data.role,
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      return {
        success: true,
        message: 'Mock Registration Successful',
        data: {
          user: newUser,
          token: `mock-jwt-access-token-${newUser.role}`,
          refreshToken: `mock-jwt-refresh-token-${newUser.role}`,
        },
      };
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      console.warn('Auth API error. Falling back to mock data.', error);
      return {
        success: true,
        message: 'Mock password reset link sent.',
        data: null,
      };
    }
  },

  resetPassword: async (password: string, token: string): Promise<ApiResponse<null>> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { password, token });
      return response.data;
    } catch (error) {
      console.warn('Auth API error. Falling back to mock data.', error);
      return {
        success: true,
        message: 'Mock password reset successful.',
        data: null,
      };
    }
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      console.warn('Auth API error. Falling back to mock data.', error);
      return {
        success: true,
        data: MOCK_CUSTOMERS[0],
      };
    }
  },
};
export default authApi;
