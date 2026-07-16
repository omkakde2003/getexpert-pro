import { Router } from 'express';
import UserController from './controller';
import { authMiddleware } from '../../middleware/auth';

export const userRouter = Router();

userRouter.get('/profile', authMiddleware as any, UserController.getProfile as any);
userRouter.put('/update', authMiddleware as any, UserController.updateProfile as any);

export default userRouter;
