import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import ExpertService from '../services/ExpertService';

export const ExpertController = {
  getProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await ExpertService.getProfile(req.user.id);
      return res.status(200).json({ success: true, data: profile });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const profile = await ExpertService.updateProfile(req.user.id, req.body);
      return res.status(200).json({ success: true, message: 'Expert profile updated successfully', data: profile });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateAvailability: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const { slots } = req.body;
      if (!slots) throw new Error('Slots array is required');

      const availability = await ExpertService.updateAvailability(req.user.id, slots);
      return res.status(200).json({ success: true, message: 'Availability slots updated successfully', data: availability });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getExpertsList: async (req: Request, res: Response) => {
    try {
      const list = await ExpertService.getExpertsList();
      return res.status(200).json({ success: true, data: list });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default ExpertController;
