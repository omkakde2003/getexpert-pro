import prisma from '../../config/prisma';

export const ServiceRepository = {
  findAll: async (category?: string) => {
    if (category) {
      return prisma.service.findMany({
        where: {
          category: {
            equals: category,
            mode: 'insensitive',
          },
        },
      });
    }
    return prisma.service.findMany();
  },

  findById: async (id: string) => {
    return prisma.service.findUnique({
      where: { id },
    });
  },

  getCategories: async () => {
    const res = await prisma.service.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return res.map((r) => r.category);
  },
};

export default ServiceRepository;
