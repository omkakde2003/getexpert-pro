import { User, ExpertProfile, ServiceItem, Booking, NotificationItem, Conversation, Message } from '../types';

export const MOCK_CUSTOMERS: User[] = [
  {
    id: 'c1',
    name: 'Sarah Connor',
    email: 'sarah@getexpert.pro',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: new Date(2026, 1, 15).toISOString(),
    status: 'active',
  },
  {
    id: 'c2',
    name: 'John Doe',
    email: 'john@getexpert.pro',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    createdAt: new Date(2026, 3, 20).toISOString(),
    status: 'active',
  },
];

export const MOCK_EXPERTS: User[] = [
  {
    id: 'e1',
    name: 'Alex Rivera',
    email: 'alex@getexpert.pro',
    role: 'expert',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    createdAt: new Date(2025, 6, 10).toISOString(),
    status: 'active',
  },
  {
    id: 'e2',
    name: 'Elena Rostova',
    email: 'elena@getexpert.pro',
    role: 'expert',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    createdAt: new Date(2025, 8, 12).toISOString(),
    status: 'active',
  },
  {
    id: 'e3',
    name: 'Marcus Chen',
    email: 'marcus@getexpert.pro',
    role: 'expert',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    createdAt: new Date(2025, 11, 5).toISOString(),
    status: 'active',
  },
];

export const MOCK_ADMINS: User[] = [
  {
    id: 'a1',
    name: 'Chief Admin',
    email: 'admin@getexpert.pro',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: new Date(2025, 0, 1).toISOString(),
    status: 'active',
  },
];

export const MOCK_EXPERT_PROFILES: ExpertProfile[] = [
  {
    id: 'ep1',
    userId: 'e1',
    title: 'Lead Software Architect',
    bio: 'Specializing in building robust, scalable full-stack applications, mobile apps, and custom technical infrastructure integrations for high-growth enterprises.',
    rating: 4.9,
    reviewCount: 148,
    earnings: 12500,
    approved: true,
    services: ['s1', 's6'],
    availability: [
      { id: 'av1', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isBooked: false },
      { id: 'av2', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isBooked: false },
      { id: 'av3', dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isBooked: true },
      { id: 'av4', dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isBooked: false },
      { id: 'av5', dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isBooked: false },
    ],
  },
  {
    id: 'ep2',
    userId: 'e2',
    title: 'Senior Marketing Director',
    bio: 'Expert in data-driven growth strategies, SEO audits, ROI optimizations, and running end-to-end multi-channel marketing campaigns.',
    rating: 4.85,
    reviewCount: 94,
    earnings: 7900,
    approved: true,
    services: ['s2', 's3'],
    availability: [
      { id: 'av6', dayOfWeek: 1, startTime: '10:00', endTime: '19:00', isBooked: false },
      { id: 'av7', dayOfWeek: 3, startTime: '10:00', endTime: '19:00', isBooked: false },
      { id: 'av8', dayOfWeek: 5, startTime: '10:00', endTime: '19:00', isBooked: false },
      { id: 'av9', dayOfWeek: 6, startTime: '11:00', endTime: '16:00', isBooked: false },
    ],
  },
  {
    id: 'ep3',
    userId: 'e3',
    title: 'Creative Branding Specialist',
    bio: 'Crafting memorable visual brand identities, logo kits, social media visuals, and comprehensive strategy frameworks.',
    rating: 4.95,
    reviewCount: 65,
    earnings: 3200,
    approved: false, // Pending Approval state
    services: ['s4', 's5'],
    availability: [
      { id: 'av10', dayOfWeek: 2, startTime: '09:00', endTime: '18:00', isBooked: false },
      { id: 'av11', dayOfWeek: 4, startTime: '09:00', endTime: '18:00', isBooked: false },
    ],
  },
];

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Dedicated Tech Team Development',
    description: 'Build robust, scalable systems with our experienced developers. From web applications to mobile apps, we deliver cutting-edge technology.',
    price: 150, // hourly rate / unit price
    category: 'Technology',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400',
    rating: 4.9,
    reviewCount: 88,
  },
  {
    id: 's2',
    title: 'Data-driven Digital Marketing Campaigns',
    description: 'Drive growth with data-driven marketing strategies. Craft campaigns that convert, optimize ROI, and build digital brand presence.',
    price: 95,
    category: 'Digital Marketing',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    rating: 4.8,
    reviewCount: 74,
  },
  {
    id: 's3',
    title: 'Social Media & Community Management',
    description: 'Engage your audience with compelling social strategies. Create, manage, and optimize your social media presence to build community.',
    price: 75,
    category: 'Digital Marketing',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400',
    rating: 4.75,
    reviewCount: 52,
  },
  {
    id: 's4',
    title: 'SEO Copywriting & Content Writing',
    description: 'Tell your story with powerful words. High-quality SEO-optimized, engaging content that resonates with your audience and drives action.',
    price: 65,
    category: 'Content Writing',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
    rating: 4.8,
    reviewCount: 43,
  },
  {
    id: 's5',
    title: 'Branding, Logos & Visual Identity Kits',
    description: 'Build a memorable brand identity. From logo design to brand strategy, we create cohesive visual identities that make your business stand out.',
    price: 110,
    category: 'Branding',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
    rating: 4.95,
    reviewCount: 61,
  },
  {
    id: 's6',
    title: 'Digital Transformation & Tech Consulting',
    description: 'Navigate your digital transformation with expert guidance. Strategic consulting to align your business goals with actionable digital solutions.',
    price: 180,
    category: 'Consulting',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    rating: 4.9,
    reviewCount: 37,
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    customerName: 'Sarah Connor',
    expertId: 'e1',
    expertName: 'Alex Rivera',
    serviceId: 's1',
    serviceTitle: 'Dedicated Tech Team Development',
    status: 'confirmed',
    price: 150,
    scheduledAt: new Date(2026, 7, 20, 10, 0).toISOString(),
    createdAt: new Date(2026, 7, 10).toISOString(),
  },
  {
    id: 'b2',
    customerId: 'c1',
    customerName: 'Sarah Connor',
    expertId: 'e2',
    expertName: 'Elena Rostova',
    serviceId: 's2',
    serviceTitle: 'Data-driven Digital Marketing Campaigns',
    status: 'completed',
    price: 95,
    scheduledAt: new Date(2026, 7, 12, 14, 0).toISOString(),
    createdAt: new Date(2026, 7, 5).toISOString(),
  },
  {
    id: 'b3',
    customerId: 'c2',
    customerName: 'John Doe',
    expertId: 'e2',
    expertName: 'Elena Rostova',
    serviceId: 's3',
    serviceTitle: 'Social Media & Community Management',
    status: 'pending',
    price: 75,
    scheduledAt: new Date(2026, 7, 22, 11, 0).toISOString(),
    createdAt: new Date(2026, 7, 15).toISOString(),
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New Booking Request',
    message: 'Sarah Connor has requested Tech Team Development consulting.',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'n2',
    title: 'Payment Successful',
    message: 'Invoice #INV-2947 has been paid successfully.',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'n3',
    title: 'Account Verification Pending',
    message: 'Please upload your credentials for admin audit checks.',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'e1',
    participantName: 'Alex Rivera',
    participantRole: 'expert',
    participantAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    lastMessage: 'Hi Sarah, I will arrive exactly at 10 AM on Monday.',
    lastMessageAt: new Date(Date.now() - 60000 * 30).toISOString(),
    unreadCount: 1,
  },
  {
    id: 'conv2',
    participantId: 'e2',
    participantName: 'Elena Rostova',
    participantRole: 'expert',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    lastMessage: 'Thank you for booking! Have a peaceful day.',
    lastMessageAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    unreadCount: 0,
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  conv1: [
    {
      id: 'm1',
      conversationId: 'conv1',
      senderId: 'c1',
      senderName: 'Sarah Connor',
      senderRole: 'customer',
      content: 'Hello Alex, I would like to clarify if the development scope includes cross-platform build releases.',
      createdAt: new Date(Date.now() - 60000 * 60).toISOString(),
    },
    {
      id: 'm2',
      conversationId: 'conv1',
      senderId: 'e1',
      senderName: 'Alex Rivera',
      senderRole: 'expert',
      content: 'Yes Sarah, we construct web and mobile bundles concurrently. App Store submissions are billed under separate support hours.',
      createdAt: new Date(Date.now() - 60000 * 45).toISOString(),
    },
    {
      id: 'm3',
      conversationId: 'conv1',
      senderId: 'e1',
      senderName: 'Alex Rivera',
      senderRole: 'expert',
      content: 'Hi Sarah, I will upload the kickoff documentation in 10 minutes.',
      createdAt: new Date(Date.now() - 60000 * 30).toISOString(),
    },
  ],
};

// Analytics Data
export const MOCK_REVENUE_CHART = [
  { month: 'Jan', revenue: 14000, bookings: 45 },
  { month: 'Feb', revenue: 18200, bookings: 56 },
  { month: 'Mar', revenue: 21100, bookings: 68 },
  { month: 'Apr', revenue: 28400, bookings: 95 },
  { month: 'May', revenue: 34000, bookings: 120 },
  { month: 'Jun', revenue: 42500, bookings: 160 },
];

export const MOCK_CUSTOMER_GROWTH = [
  { month: 'Jan', active: 300, new: 50 },
  { month: 'Feb', active: 340, new: 60 },
  { month: 'Mar', active: 390, new: 80 },
  { month: 'Apr', active: 470, new: 110 },
  { month: 'May', active: 560, new: 130 },
  { month: 'Jun', active: 700, new: 180 },
];

export const MOCK_EXPERT_GROWTH = [
  { month: 'Jan', active: 40, new: 5 },
  { month: 'Feb', active: 43, new: 3 },
  { month: 'Mar', active: 50, new: 8 },
  { month: 'Apr', active: 58, new: 10 },
  { month: 'May', active: 72, new: 15 },
  { month: 'Jun', active: 85, new: 18 },
];
