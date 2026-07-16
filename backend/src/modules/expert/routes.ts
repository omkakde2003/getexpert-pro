import { Router } from 'express';
import ExpertController from './controller';
import { authMiddleware, roleMiddleware } from '../../middleware/auth';

export const expertRouter = Router();

// Public route to view list
expertRouter.get('/', ExpertController.getExpertsList);

// Protected expert routes
expertRouter.get('/profile', authMiddleware as any, roleMiddleware(['expert', 'EXPERT']) as any, ExpertController.getProfile as any);
expertRouter.put('/update', authMiddleware as any, roleMiddleware(['expert', 'EXPERT']) as any, ExpertController.updateProfile as any);
expertRouter.put('/availability', authMiddleware as any, roleMiddleware(['expert', 'EXPERT']) as any, ExpertController.updateAvailability as any);

export default expertRouter;
