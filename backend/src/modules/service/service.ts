import ServiceRepository from './repository';

export const ServiceService = {
  getServices: async (category?: string) => {
    return ServiceRepository.findAll(category);
  },

  getService: async (id: string) => {
    const service = await ServiceRepository.findById(id);
    if (!service) {
      throw new Error('Service item not found');
    }
    return service;
  },

  getCategories: async () => {
    return ServiceRepository.getCategories();
  },
};

export default ServiceService;
