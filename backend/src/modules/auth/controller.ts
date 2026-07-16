import { Request, Response } from 'express';
import { z } from 'zod';
import { Role } from '@prisma/client';
import AuthService from './service';
import { AuthenticatedRequest } from '../../middleware/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['customer', 'expert', 'CUSTOMER', 'EXPERT']),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data.email, data.password);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors ? 'Validation error' : error.message || 'Login failed',
        errors: error.errors,
      });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const data = registerSchema.parse(req.body);
      const mappedRole = data.role.toUpperCase() as Role;
      const result = await AuthService.register(data.name, data.email, mappedRole, data.password, data.phone);
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors ? 'Validation error' : error.message || 'Registration failed',
        errors: error.errors,
      });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }

      const result = await AuthService.refresh(refreshToken);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message || 'Refresh failed',
      });
    }
  },

  me: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const user = await AuthService.getMe(req.user.id);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Failed to retrieve profile',
      });
    }
  },
};

export default AuthController;
