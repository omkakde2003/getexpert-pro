import prisma from '../../config/prisma';
import { Role, UserStatus } from '@prisma/client';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: Role;
  status?: UserStatus;
  profileImage?: string;
  phone?: string;
}

export const AuthRepository = {
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  create: async (data: CreateUserData) => {
    return prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.passwordHash,
        role: data.role,
        status: data.status || 'ACTIVE',
        profileImage: data.profileImage,
        phone: data.phone,
      },
    });
  },
};

export default AuthRepository;
