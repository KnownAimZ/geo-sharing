import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/auth/authSlice";
import subscriptionReducer from "./feature/subscripitions/subscripitionsSlice";
import themeReducer from "./feature/theme/themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subsciptions: subscriptionReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
