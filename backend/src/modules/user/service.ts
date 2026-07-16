import UserRepository, { UpdateUserData } from './repository';

export const UserService = {
  getProfile: async (id: string) => {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User profile not found');
    }
    const { password: _, ...profile } = user;
    return profile;
  },

  updateProfile: async (id: string, updates: UpdateUserData) => {
    const user = await UserRepository.update(id, updates);
    if (!user) {
      throw new Error('User profile not found');
    }
    const { password: _, ...profile } = user;
    return profile;
  },
};

export default UserService;
