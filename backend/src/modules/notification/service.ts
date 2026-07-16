import NotificationRepository, { NotificationInput } from './repository';

export const NotificationService = {
  createNotification: async (payload: NotificationInput) => {
    return NotificationRepository.create(payload);
  },

  getNotifications: async (userId: string) => {
    return NotificationRepository.findByUserId(userId);
  },

  markRead: async (id: string) => {
    const notif = await NotificationRepository.markRead(id);
    if (!notif) {
      throw new Error('Notification alert not found');
    }
    return notif;
  },

  markAllRead: async (userId: string) => {
    await NotificationRepository.markAllRead(userId);
    return { success: true };
  },
};

export default NotificationService;
