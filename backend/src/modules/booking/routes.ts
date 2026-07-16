import { Router } from 'express';
import BookingController from './controller';
import { authMiddleware } from '../../middleware/auth';

export const bookingRouter = Router();

bookingRouter.use(authMiddleware as any);

bookingRouter.get('/', BookingController.getBookings as any);
bookingRouter.post('/', BookingController.createBooking as any);
bookingRouter.put('/:id/status', BookingController.updateBookingStatus as any);

export default bookingRouter;
