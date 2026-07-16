import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../types';

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.loading = false;
      state.error = null;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ id: string; status: Booking['status'] }>
    ) => {
      const booking = state.bookings.find((b) => b.id === action.payload.id);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    setBookingLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setBookings,
  addBooking,
  updateBookingStatus,
  setBookingLoading,
  setBookingError,
} = bookingSlice.actions;
export default bookingSlice.reducer;
