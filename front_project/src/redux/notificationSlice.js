import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map(n => ({ ...n, is_read: true }));
    },
  },
});

export const { setNotifications, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
