export type UserRole = 'customer' | 'expert' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface ExpertProfile {
  id: string;
  userId: string;
  bio: string;
  title: string;
  rating: number;
  reviewCount: number;
  availability: AvailabilitySlot[];
  earnings: number;
  approved: boolean;
  services: string[]; // Service IDs
}

export interface AvailabilitySlot {
  id: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  isBooked: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  duration: number; // in minutes
  imageUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  expertId: string;
  expertName: string;
  serviceId: string;
  serviceTitle: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  scheduledAt: string; // ISO String
  createdAt: string; // ISO String
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  participantRole: UserRole;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}
