import BookingRepository from './repository';
import ExpertRepository from '../expert/repository';
import ServiceRepository from '../service/repository';
import AuthRepository from '../auth/repository';
import NotificationRepository from '../notification/repository';
import { BookingStatus } from '@prisma/client';

export interface CreateBookingPayload {
  customerId: string;
  customerName: string;
  expertId: string;
  serviceId: string;
  scheduledAt: string;
}

export const BookingService = {
  createBooking: async (payload: CreateBookingPayload) => {
    // 1. Validate Customer
    const customer = await AuthRepository.findById(payload.customerId);
    if (!customer) throw new Error('Customer account not found');

    // 2. Validate Expert & Profile
    const expertUser = await AuthRepository.findById(payload.expertId);
    const expertProfile = await ExpertRepository.findByUserId(payload.expertId);
    if (!expertUser || !expertProfile) throw new Error('Expert account not found');

    // 3. Validate Service
    const service = await ServiceRepository.findById(payload.serviceId);
    if (!service) throw new Error('Service item not found');

    // 4. Verify scheduling conflict checks
    const targetDate = new Date(payload.scheduledAt);
    const targetDayOfWeek = targetDate.getDay(); // 0 = Sun, 1 = Mon, etc.
    const targetHours = `${String(targetDate.getHours()).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')}`;

    const slots = (expertProfile.availability as any[]) || [];
    const matchedSlot = slots.find((slot: any) => {
      return slot.dayOfWeek === targetDayOfWeek && slot.startTime <= targetHours && slot.endTime >= targetHours;
    });

    if (!matchedSlot) {
      throw new Error('Expert is not available at the requested time slot');
    }

    if (matchedSlot.isBooked) {
      throw new Error('This availability slot has already been booked');
    }

    // Mark slot as booked in expert profile
    matchedSlot.isBooked = true;
    await ExpertRepository.update(expertProfile.id, { availability: slots });

    // 5. Create Booking Registry
    const bookingId = `b_${Math.random().toString(36).substr(2, 9)}`;
    const newBooking = await BookingRepository.create({
      id: bookingId,
      customerId: payload.customerId,
      customerName: payload.customerName,
      expertId: payload.expertId,
      expertName: `${expertUser.firstName} ${expertUser.lastName}`,
      serviceId: payload.serviceId,
      serviceTitle: service.title,
      status: 'pending',
      price: Number(service.price),
      scheduledAt: targetDate,
    });

    // 6. Write Notification to Expert
    await NotificationRepository.create({
      id: `n_${Math.random().toString(36).substr(2, 9)}`,
      userId: payload.expertId,
      title: 'New Booking Request',
      message: `${payload.customerName} has requested booking for "${service.title}" on ${targetDate.toLocaleDateString()}.`,
      type: 'info',
    });

    return newBooking;
  },

  getBookingsForUser: async (userId: string, role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower === 'admin') {
      return BookingRepository.findAll();
    } else if (roleLower === 'expert') {
      return BookingRepository.findByExpertId(userId);
    } else {
      return BookingRepository.findByCustomerId(userId);
    }
  },

  updateBookingStatus: async (
    bookingId: string,
    status: BookingStatus,
    actorId: string,
    actorRole: string
  ) => {
    const booking = await BookingRepository.findById(bookingId);
    if (!booking) throw new Error('Booking registry not found');

    const roleLower = actorRole.toLowerCase();
    // Access control checks
    if (roleLower !== 'admin' && booking.customerId !== actorId && booking.expertId !== actorId) {
      throw new Error('Access denied to modify this booking');
    }

    const updated = await BookingRepository.updateStatus(bookingId, status);
    if (!updated) throw new Error('Status modification failed');

    // Write alert updates
    const targetUserId = actorId === booking.customerId ? booking.expertId : booking.customerId;
    await NotificationRepository.create({
      id: `n_${Math.random().toString(36).substr(2, 9)}`,
      userId: targetUserId,
      title: `Booking ${status.toUpperCase()}`,
      message: `Your booking for "${booking.serviceTitle}" has been ${status} by the other party.`,
      type: status === 'confirmed' ? 'success' : status === 'cancelled' ? 'error' : 'info',
    });

    // If cancelled, release expert slot availability
    if (status === 'cancelled') {
      const expertProfile = await ExpertRepository.findByUserId(booking.expertId);
      if (expertProfile) {
        const slots = (expertProfile.availability as any[]) || [];
        const scheduledTime = new Date(booking.scheduledAt);
        const dayOfWeek = scheduledTime.getDay();
        const targetHours = `${String(scheduledTime.getHours()).padStart(2, '0')}:${String(scheduledTime.getMinutes()).padStart(2, '0')}`;

        const slot = slots.find((s: any) => s.dayOfWeek === dayOfWeek && s.startTime <= targetHours && s.endTime >= targetHours);
        if (slot) {
          slot.isBooked = false;
          await ExpertRepository.update(expertProfile.id, { availability: slots });
        }
      }
    }

    return updated;
  },
};

export default BookingService;
