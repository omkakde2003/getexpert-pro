import { Request, Response } from 'express';
import { z } from 'zod';
import AuthService from '../services/AuthService';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['customer', 'expert']),
  password: z.string().min(6),
});

export const AuthController = {
  login: async (req: Request, res: Response) => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data.email, data.password);
      return res.status(200).json({ success: true, message: 'Login successful', data: result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message || 'Login failed' });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data.name, data.email, data.role, data.password);
      return res.status(201).json({ success: true, message: 'Registration successful', data: result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message || 'Registration failed' });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw new Error('Refresh token is required');

      const result = await AuthService.refresh(refreshToken);
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      return res.status(401).json({ success: false, message: error.message || 'Refresh failed' });
    }
  },
};

export default AuthController;
