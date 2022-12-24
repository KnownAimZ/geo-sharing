import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  user_id: number;
}

export interface UserState {
  user: User | null;
}

const setUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const getUserFromLocalStorage = () => {
  const _user = localStorage.getItem("user");
  if (!_user) {
    return null;
  }
  return JSON.parse(_user);
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      setUserToLocalStorage(action.payload);
    },
    removeUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
