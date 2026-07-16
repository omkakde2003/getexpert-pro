import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceItem } from '../../types';

interface ServiceState {
  services: ServiceItem[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  categories: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<ServiceItem[]>) => {
      state.services = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setServiceLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setServiceError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setServices, setCategories, setServiceLoading, setServiceError } = serviceSlice.actions;
export default serviceSlice.reducer;
