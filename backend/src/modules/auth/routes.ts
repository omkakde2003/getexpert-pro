import { Router } from 'express';
import AuthController from './controller';
import { authMiddleware } from '../../middleware/auth';

export const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh', AuthController.refresh);
authRouter.get('/me', authMiddleware as any, AuthController.me as any);

export default authRouter;
