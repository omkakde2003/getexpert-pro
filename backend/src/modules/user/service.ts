import UserRepository, { UpdateUserData } from './repository';

export const UserService = {
  getProfile: async (id: string) => {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User profile not found');
    }
    const { password: _, ...userProfile } = user;
    return {
      ...userProfile,
      name: `${user.firstName} ${user.lastName}`.trim(),
    };
  },

  updateProfile: async (id: string, updates: UpdateUserData) => {
    const user = await UserRepository.update(id, updates);
    if (!user) {
      throw new Error('User profile not found');
    }
    const { password: _, ...userProfile } = user;
    return {
      ...userProfile,
      name: `${user.firstName} ${user.lastName}`.trim(),
    };
  },
};

export default UserService;
