import BookingRepository, { BookingRow } from '../repositories/BookingRepository';
import ExpertRepository from '../repositories/ExpertRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import UserRepository from '../repositories/UserRepository';
import NotificationRepository from '../repositories/NotificationRepository';

export interface CreateBookingPayload {
  customerId: string;
  customerName: string;
  expertId: string;
  serviceId: string;
  scheduledAt: string;
}

export const BookingService = {
  createBooking: async (payload: CreateBookingPayload): Promise<BookingRow> => {
    // 1. Validate Customer
    const customer = await UserRepository.findById(payload.customerId);
    if (!customer) throw new Error('Customer account not found');

    // 2. Validate Expert & Profile
    const expertUser = await UserRepository.findById(payload.expertId);
    const expertProfile = await ExpertRepository.findByUserId(payload.expertId);
    if (!expertUser || !expertProfile) throw new Error('Expert account not found');

    // 3. Validate Service
    const service = await ServiceRepository.findById(payload.serviceId);
    if (!service) throw new Error('Service item not found');

    // 4. Verify scheduling conflict checks
    const targetDate = new Date(payload.scheduledAt);
    const targetDayOfWeek = targetDate.getDay(); // 0 = Sun, 1 = Mon, etc.
    const targetHours = `${String(targetDate.getHours()).padStart(2, '0')}:${String(targetDate.getMinutes()).padStart(2, '0')}`;

    // Simple slot match logic
    const slots = expertProfile.availability || [];
    const matchedSlot = slots.find((slot: any) => {
      // Find slot on the same day that encompasses the target hours
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
      customer_id: payload.customerId,
      customer_name: payload.customerName,
      expert_id: payload.expertId,
      expert_name: expertUser.name,
      service_id: payload.serviceId,
      service_title: service.title,
      status: 'pending',
      price: Number(service.price),
      scheduled_at: targetDate,
    });

    // 6. Write Notification to Expert
    await NotificationRepository.create({
      id: `n_${Math.random().toString(36).substr(2, 9)}`,
      user_id: payload.expertId,
      title: 'New Booking Request',
      message: `${payload.customerName} has requested booking for "${service.title}" on ${targetDate.toLocaleDateString()}.`,
      type: 'info',
    });

    return newBooking;
  },

  getBookingsForUser: async (userId: string, role: string): Promise<BookingRow[]> => {
    if (role === 'admin') {
      return BookingRepository.findAll();
    } else if (role === 'expert') {
      return BookingRepository.findByExpertId(userId);
    } else {
      return BookingRepository.findByCustomerId(userId);
    }
  },

  updateBookingStatus: async (
    bookingId: string,
    status: BookingRow['status'],
    actorId: string,
    actorRole: string
  ): Promise<BookingRow> => {
    const booking = await BookingRepository.findById(bookingId);
    if (!booking) throw new Error('Booking registry not found');

    // Access control checks
    if (actorRole !== 'admin' && booking.customer_id !== actorId && booking.expert_id !== actorId) {
      throw new Error('Access denied to modify this booking');
    }

    const updated = await BookingRepository.updateStatus(bookingId, status);
    if (!updated) throw new Error('Status modification failed');

    // Write alert updates
    const targetUserId = actorId === booking.customer_id ? booking.expert_id : booking.customer_id;
    await NotificationRepository.create({
      id: `n_${Math.random().toString(36).substr(2, 9)}`,
      user_id: targetUserId,
      title: `Booking ${status.toUpperCase()}`,
      message: `Your booking for "${booking.service_title}" has been ${status} by the other party.`,
      type: status === 'confirmed' ? 'success' : status === 'cancelled' ? 'error' : 'info',
    });

    // If cancelled, release expert slot availability
    if (status === 'cancelled') {
      const expertProfile = await ExpertRepository.findByUserId(booking.expert_id);
      if (expertProfile) {
        const slots = expertProfile.availability || [];
        const scheduledTime = new Date(booking.scheduled_at);
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
