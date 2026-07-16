import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import BookingService from '../services/BookingService';
import UserRepository from '../repositories/UserRepository';

export const BookingController = {
  createBooking: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      
      const customer = await UserRepository.findById(req.user.id);
      if (!customer) throw new Error('Customer account not found');

      const { expertId, serviceId, price, scheduledAt } = req.body;
      if (!expertId || !serviceId || !scheduledAt) {
        throw new Error('expertId, serviceId, and scheduledAt are required');
      }

      const booking = await BookingService.createBooking({
        customerId: req.user.id,
        customerName: customer.name,
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
      if (!req.user) throw new Error('Unauthorized');
      const list = await BookingService.getBookingsForUser(req.user.id, req.user.role);
      return res.status(200).json({ success: true, data: list });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  updateBookingStatus: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) throw new Error('Unauthorized');
      const { id } = req.params;
      const { status } = req.body;

      if (!status) throw new Error('Status field is required');

      const updated = await BookingService.updateBookingStatus(
        id,
        status,
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
