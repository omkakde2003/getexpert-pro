import prisma from '../../config/prisma';

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
}

export const UserRepository = {
  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  update: async (id: string, data: UpdateUserData) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },
};

export default UserRepository;
