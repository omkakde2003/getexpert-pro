import prisma from '../../config/prisma';

export interface ExpertProfileInput {
  id: string;
  userId: string;
  title: string;
  bio: string;
  approved?: boolean;
  availability?: any;
  services?: string[];
}

export const ExpertRepository = {
  findByUserId: async (userId: string) => {
    return prisma.expertProfile.findUnique({
      where: { userId },
      include: { user: true },
    });
  },

  findById: async (id: string) => {
    return prisma.expertProfile.findUnique({
      where: { id },
      include: { user: true },
    });
  },

  create: async (data: ExpertProfileInput) => {
    return prisma.expertProfile.create({
      data: {
        id: data.id,
        userId: data.userId,
        title: data.title,
        bio: data.bio,
        approved: data.approved ?? false,
        availability: data.availability ?? [],
        services: data.services ?? [],
      },
    });
  },

  update: async (id: string, updates: any) => {
    return prisma.expertProfile.update({
      where: { id },
      data: updates,
    });
  },

  findAll: async (approvedOnly = true) => {
    return prisma.expertProfile.findMany({
      where: approvedOnly ? { approved: true } : {},
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
          },
        },
      },
    });
  },
};

export default ExpertRepository;
