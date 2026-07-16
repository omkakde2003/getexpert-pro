import prisma from '../../config/prisma';
import { BookingStatus } from '@prisma/client';

export interface BookingInput {
  id: string;
  customerId: string;
  customerName: string;
  expertId: string;
  expertName: string;
  serviceId: string;
  serviceTitle: string;
  status?: BookingStatus;
  price: number;
  scheduledAt: Date;
}

export const BookingRepository = {
  create: async (data: BookingInput) => {
    return prisma.booking.create({
      data: {
        id: data.id,
        customerId: data.customerId,
        customerName: data.customerName,
        expertId: data.expertId,
        expertName: data.expertName,
        serviceId: data.serviceId,
        serviceTitle: data.serviceTitle,
        status: data.status || 'pending',
        price: data.price,
        scheduledAt: data.scheduledAt,
      },
    });
  },

  findById: async (id: string) => {
    return prisma.booking.findUnique({
      where: { id },
    });
  },

  findByCustomerId: async (customerId: string) => {
    return prisma.booking.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  },

  findByExpertId: async (expertId: string) => {
    return prisma.booking.findMany({
      where: { expertId },
      orderBy: { createdAt: 'desc' },
    });
  },

  findAll: async () => {
    return prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  updateStatus: async (id: string, status: BookingStatus) => {
    return prisma.booking.update({
      where: { id },
      data: { status },
    });
  },
};

export default BookingRepository;
