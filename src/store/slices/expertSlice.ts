import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpertProfile, AvailabilitySlot } from '../../types';

interface ExpertState {
  profile: ExpertProfile | null;
  expertsList: ExpertProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpertState = {
  profile: null,
  expertsList: [],
  loading: false,
  error: null,
};

const expertSlice = createSlice({
  name: 'expert',
  initialState,
  reducers: {
    setExpertProfile: (state, action: PayloadAction<ExpertProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    setExpertsList: (state, action: PayloadAction<ExpertProfile[]>) => {
      state.expertsList = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateAvailability: (state, action: PayloadAction<AvailabilitySlot[]>) => {
      if (state.profile) {
        state.profile.availability = action.payload;
      }
    },
    setExpertLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setExpertError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setExpertProfile,
  setExpertsList,
  updateAvailability,
  setExpertLoading,
  setExpertError,
} = expertSlice.actions;
export default expertSlice.reducer;
