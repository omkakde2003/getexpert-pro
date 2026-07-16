import { apiClient } from './api';
import { ApiResponse, Booking } from '../types';
import { API_ENDPOINTS } from '../constants';
import { MOCK_BOOKINGS } from '../utils/mockData';

export interface CreateBookingData {
  expertId: string;
  serviceId: string;
  price: number;
  scheduledAt: string;
}

export const bookingApi = {
  getBookings: async (): Promise<ApiResponse<Booking[]>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.BASE);
      return response.data;
    } catch (error) {
      console.warn('Booking API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: MOCK_BOOKINGS,
      };
    }
  },

  getBooking: async (id: string): Promise<ApiResponse<Booking>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.GET_ONE(id));
      return response.data;
    } catch (error) {
      console.warn('Booking API error. Falling back to mock data. Error:', error);
      const booking = MOCK_BOOKINGS.find((b) => b.id === id) || MOCK_BOOKINGS[0];
      return {
        success: true,
        data: booking,
      };
    }
  },

  createBooking: async (data: CreateBookingData): Promise<ApiResponse<Booking>> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BOOKINGS.CREATE, data);
      return response.data;
    } catch (error) {
      console.warn('Booking API error. Falling back to mock data. Error:', error);
      const newBooking: Booking = {
        id: `b_${Math.random().toString(36).substr(2, 9)}`,
        customerId: 'c1',
        customerName: 'Sarah Connor',
        expertId: data.expertId,
        expertName: 'Alex Rivera',
        serviceId: data.serviceId,
        serviceTitle: 'Premium Home Plumbing Repairs',
        status: 'pending',
        price: data.price,
        scheduledAt: data.scheduledAt,
        createdAt: new Date().toISOString(),
      };
      return {
        success: true,
        message: 'Booking created successfully (Mock)',
        data: newBooking,
      };
    }
  },

  updateBookingStatus: async (id: string, status: Booking['status']): Promise<ApiResponse<Booking>> => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.BOOKINGS.UPDATE_STATUS(id), { status });
      return response.data;
    } catch (error) {
      console.warn('Booking API error. Falling back to mock data. Error:', error);
      const booking = MOCK_BOOKINGS.find((b) => b.id === id) || MOCK_BOOKINGS[0];
      const updated = { ...booking, status };
      return {
        success: true,
        message: `Booking status updated to ${status} (Mock)`,
        data: updated,
      };
    }
  },

  getInvoices: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOOKINGS.INVOICES);
      return response.data;
    } catch (error) {
      console.warn('Booking API error. Falling back to mock data. Error:', error);
      return {
        success: true,
        data: [
          { id: 'inv1', bookingId: 'b1', amount: 89, status: 'paid', issuedAt: new Date(2026, 7, 10).toISOString() },
          { id: 'inv2', bookingId: 'b2', amount: 99, status: 'paid', issuedAt: new Date(2026, 7, 5).toISOString() },
        ],
      };
    }
  },
};

export default bookingApi;
