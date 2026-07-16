import { Router } from 'express';
import NotificationController from './controller';
import { authMiddleware } from '../../middleware/auth';

export const notificationRouter = Router();

notificationRouter.use(authMiddleware as any);

notificationRouter.get('/', NotificationController.getNotifications as any);
notificationRouter.put('/read-all', NotificationController.markAllRead as any);
notificationRouter.put('/:id/read', NotificationController.markRead as any);

export default notificationRouter;
