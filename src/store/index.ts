import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import expertReducer from './slices/expertSlice';
import bookingReducer from './slices/bookingSlice';
import serviceReducer from './slices/serviceSlice';
import notificationReducer from './slices/notificationSlice';
import themeReducer from './slices/themeSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    expert: expertReducer,
    booking: bookingReducer,
    service: serviceReducer,
    notification: notificationReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
