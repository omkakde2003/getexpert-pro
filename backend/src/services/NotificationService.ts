import NotificationRepository from '../repositories/NotificationRepository';

export const NotificationService = {
  getNotifications: async (userId: string) => {
    return NotificationRepository.findByUserId(userId);
  },

  markRead: async (id: string) => {
    const notif = await NotificationRepository.markRead(id);
    if (!notif) throw new Error('Notification not found');
    return notif;
  },

  markAllRead: async (userId: string) => {
    await NotificationRepository.markAllRead(userId);
    return { success: true };
  },
};

export default NotificationService;
