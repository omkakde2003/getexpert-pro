import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem } from '../../types';

interface NotificationState {
  notifications: NotificationItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      state.notifications.unshift(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) {
        notif.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
    },
    setNotificationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setNotificationError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  setNotificationLoading,
  setNotificationError,
} = notificationSlice.actions;
export default notificationSlice.reducer;
