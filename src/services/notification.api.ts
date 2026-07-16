import { apiClient } from './api';
import { ApiResponse, NotificationItem } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_NOTIFICATIONS } from '../utils/mockData';

export const notificationApi = {
  getNotifications: async (): Promise<ApiResponse<NotificationItem[]>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.BASE);
      return response.data;
    } catch (error) {
      console.warn('Notification API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: MOCK_NOTIFICATIONS,
      };
    }
  },

  markAsRead: async (id: string): Promise<ApiResponse<NotificationItem>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
      return response.data;
    } catch (error) {
      console.warn('Notification API error. Falling back to mock data. Error:', error);
      const notif = MOCK_NOTIFICATIONS.find((n) => n.id === id) || MOCK_NOTIFICATIONS[0];
      const updated = { ...notif, read: true };
      return {
        success: true,
        message: 'Notification marked as read (Mock)',
        data: updated,
      };
    }
  },

  markAllAsRead: async (): Promise<ApiResponse<null>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      return response.data;
    } catch (error) {
      console.warn('Notification API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        message: 'All notifications marked as read (Mock)',
        data: null,
      };
    }
  },
};

export default notificationApi;
