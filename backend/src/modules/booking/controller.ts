import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth';
import BookingService from './service';
import AuthRepository from '../auth/repository';
import { BookingStatus } from '@prisma/client';

export const BookingController = {
  createBooking: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      
      const customer = await AuthRepository.findById(req.user.id);
      if (!customer) {
        throw new Error('Customer account not found');
      }

      const { expertId, serviceId, scheduledAt } = req.body;
      if (!expertId || !serviceId || !scheduledAt) {
        throw new Error('expertId, serviceId, and scheduledAt are required');
      }

      const booking = await BookingService.createBooking({
        customerId: req.user.id,
        customerName: `${customer.firstName} ${customer.lastName}`,
        expertId,
        serviceId,
        scheduledAt,
      });

      return res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getBookings: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const list = await BookingService.getBookingsForUser(req.user.id, req.user.role);
      return res.status(200).json({ success: true, data: list });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateBookingStatus: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        throw new Error('Status field is required');
      }

      const updated = await BookingService.updateBookingStatus(
        id,
        status as BookingStatus,
        req.user.id,
        req.user.role
      );

      return res.status(200).json({
        success: true,
        message: `Booking status updated to ${status}`,
        data: updated,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};

export default BookingController;
