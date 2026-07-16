import { Response } from 'express';
import { z } from 'zod';
import UserService from './service';
import { AuthenticatedRequest } from '../../middleware/auth';

const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'First name cannot be empty').optional(),
  lastName: z.string().min(1, 'Last name cannot be empty').optional(),
  phone: z.string().optional(),
  profileImage: z.string().optional(),
});

export const UserController = {
  getProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const profile = await UserService.getProfile(req.user.id);
      return res.status(200).json({ success: true, data: profile });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const data = updateProfileSchema.parse(req.body);
      const profile = await UserService.updateProfile(req.user.id, data);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.errors ? 'Validation error' : error.message || 'Profile update failed',
        errors: error.errors,
      });
    }
  },
};

export default UserController;
