import { Request, Response } from 'express';
import ServiceService from './service';

export const ServiceController = {
  getServices: async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const list = await ServiceService.getServices(category as string | undefined);
      return res.status(200).json({ success: true, data: list });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getService: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = await ServiceService.getService(id);
      return res.status(200).json({ success: true, data: service });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await ServiceService.getCategories();
      return res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default ServiceController;
