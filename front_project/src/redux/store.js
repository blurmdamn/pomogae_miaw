import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    notifications: notificationReducer,
  },
});
