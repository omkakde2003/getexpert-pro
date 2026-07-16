export const APP_NAME = 'GetExpert Pro';

export const PATHS = {
  // Public Paths
  LANDING: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PRICING: '/pricing',
  EXPERTS: '/experts',
  CONTACT: '/contact',
  BLOGS: '/blogs',
  FAQS: '/faqs',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  
  // Auth Paths
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Customer Portal Paths
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_PROFILE: '/customer/profile',
  CUSTOMER_BOOKINGS: '/customer/bookings',
  CUSTOMER_INVOICES: '/customer/invoices',
  CUSTOMER_NOTIFICATIONS: '/customer/notifications',
  CUSTOMER_MESSAGES: '/customer/messages',
  CUSTOMER_SETTINGS: '/customer/settings',
  CUSTOMER_WISHLIST: '/customer/wishlist',
  CUSTOMER_REVIEWS: '/customer/reviews',

  // Expert Portal Paths
  EXPERT_DASHBOARD: '/expert/dashboard',
  EXPERT_PROFILE: '/expert/profile',
  EXPERT_CALENDAR: '/expert/calendar',
  EXPERT_SERVICES: '/expert/services',
  EXPERT_BOOKINGS: '/expert/bookings',
  EXPERT_CUSTOMERS: '/expert/customers',
  EXPERT_REVIEWS: '/expert/reviews',
  EXPERT_ANALYTICS: '/expert/analytics',
  EXPERT_EARNINGS: '/expert/earnings',
  EXPERT_NOTIFICATIONS: '/expert/notifications',
  EXPERT_MESSAGES: '/expert/messages',

  // Admin Portal Paths
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_EXPERT_APPROVAL: '/admin/expert-approval',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_REVENUE: '/admin/revenue',
  ADMIN_SUPPORT: '/admin/support',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_CMS: '/admin/cms',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  USER: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    SETTINGS: '/users/settings',
  },
  EXPERT: {
    PROFILE: '/experts/profile',
    UPDATE: '/experts/update',
    AVAILABILITY: '/experts/availability',
    ANALYTICS: '/experts/analytics',
    EARNINGS: '/experts/earnings',
    REVIEWS: '/experts/reviews',
    LIST: '/experts',
  },
  BOOKINGS: {
    BASE: '/bookings',
    GET_ONE: (id: string) => `/bookings/${id}`,
    CREATE: '/bookings',
    UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
    INVOICES: '/bookings/invoices',
  },
  SERVICES: {
    BASE: '/services',
    GET_ONE: (id: string) => `/services/${id}`,
    CATEGORIES: '/services/categories',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
  CHAT: {
    CONVERSATIONS: '/chat/conversations',
    MESSAGES: (convId: string) => `/chat/conversations/${convId}/messages`,
    SEND: '/chat/messages',
  },
};
export const STORAGE_KEYS = {
  THEME: 'getexpert_theme',
  TOKEN: 'getexpert_token',
  REFRESH_TOKEN: 'getexpert_refresh_token',
  USER: 'getexpert_user',
};
