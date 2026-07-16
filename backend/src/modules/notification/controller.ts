import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import NotificationService from './service';

export const NotificationController = {
  getNotifications: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const list = await NotificationService.getNotifications(req.user.id);
      return res.status(200).json({ success: true, data: list });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  markRead: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const { id } = req.params;
      const notif = await NotificationService.markRead(id);
      return res.status(200).json({ success: true, data: notif });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  markAllRead: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const result = await NotificationService.markAllRead(req.user.id);
      return res.status(200).json({ success: true, message: 'All notifications marked as read', data: result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default NotificationController;
