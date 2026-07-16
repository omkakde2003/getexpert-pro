import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import UserService from '../services/UserService';

export const UserController = {
  getProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await UserService.getProfile(req.user.id);
      return res.status(200).json({ success: true, data: profile });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await UserService.updateProfile(req.user.id, req.body);
      return res.status(200).json({ success: true, message: 'Profile updated successfully', data: profile });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default UserController;
