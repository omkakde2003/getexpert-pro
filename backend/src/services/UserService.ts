import UserRepository from '../repositories/UserRepository';

export const UserService = {
  getProfile: async (id: string) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    
    const { password_hash, ...profile } = user;
    return profile;
  },

  updateProfile: async (id: string, updates: any) => {
    const user = await UserRepository.update(id, updates);
    if (!user) throw new Error('User not found');
    
    const { password_hash, ...profile } = user;
    return profile;
  },
};

export default UserService;
