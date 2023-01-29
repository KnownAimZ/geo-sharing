import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/auth/authSlice";
import subscriptionReducer from "./feature/subscripitions/subscripitionsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subsciptions: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
