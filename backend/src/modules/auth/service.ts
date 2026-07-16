import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import AuthRepository from './repository';

const JWT_SECRET = process.env.JWT_SECRET || 'getexpert_pro_secret_key_2026_enterprise';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'getexpert_pro_refresh_secret_key_2026_enterprise';

export const AuthService = {
  register: async (name: string, email: string, role: Role, password_raw: string, phone?: string) => {
    const existing = await AuthRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password_raw, 10);

    // Split name into firstName and lastName
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    const user = await AuthRepository.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      phone,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userProfile } = user;
    return {
      user: {
        ...userProfile,
        name: `${user.firstName} ${user.lastName}`.trim(),
      },
      token,
      refreshToken,
    };
  },

  login: async (email: string, password_raw: string) => {
    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password_raw, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userProfile } = user;
    return {
      user: {
        ...userProfile,
        name: `${user.firstName} ${user.lastName}`.trim(),
      },
      token,
      refreshToken,
    };
  },

  refresh: async (refreshToken: string) => {
    try {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };
      const user = await AuthRepository.findById(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  },

  getMe: async (id: string) => {
    const user = await AuthRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const { password: _, ...userProfile } = user;
    return {
      ...userProfile,
      name: `${user.firstName} ${user.lastName}`.trim(),
    };
  },
};

export default AuthService;
