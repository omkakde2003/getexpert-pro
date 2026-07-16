import prisma from '../../config/prisma';
import { NotificationType } from '@prisma/client';

export interface NotificationInput {
  id: string;
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
}

export const NotificationRepository = {
  create: async (data: NotificationInput) => {
    return prisma.notification.create({
      data: {
        id: data.id,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
      },
    });
  },

  findByUserId: async (userId: string) => {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  markRead: async (id: string) => {
    return prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  },

  markAllRead: async (userId: string) => {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  },
};

export default NotificationRepository;
