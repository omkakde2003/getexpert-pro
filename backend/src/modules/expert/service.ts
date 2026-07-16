import ExpertRepository from './repository';

export const ExpertService = {
  getProfile: async (userId: string) => {
    const profile = await ExpertRepository.findByUserId(userId);
    if (!profile) {
      throw new Error('Expert profile not found');
    }
    return profile;
  },

  updateProfile: async (userId: string, updates: any) => {
    const profile = await ExpertRepository.findByUserId(userId);
    if (!profile) {
      throw new Error('Expert profile not found');
    }
    const updated = await ExpertRepository.update(profile.id, updates);
    return updated;
  },

  updateAvailability: async (userId: string, slots: any[]) => {
    const profile = await ExpertRepository.findByUserId(userId);
    if (!profile) {
      throw new Error('Expert profile not found');
    }
    const updated = await ExpertRepository.update(profile.id, { availability: slots });
    return (updated?.availability as any[]) || [];
  },

  getExpertsList: async () => {
    return ExpertRepository.findAll(true);
  },
};

export default ExpertService;
