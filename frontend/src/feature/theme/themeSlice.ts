import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { theme } from "antd";

export interface ThemeState {
  isDarkTheme: boolean;
}

const setThemeToLocalStorage = (isDarkTheme: boolean) => {
  localStorage.setItem("isDarkTheme", String(isDarkTheme));
};

const removeThemeFromLocalStorage = () => {
  localStorage.removeItem("isDarkTheme");
};

const getThemeFromLocalStorage = () => {
  const isDarkTheme = localStorage.getItem("isDarkTheme");
  if (!theme) {
    return false;
  }
  return JSON.parse(isDarkTheme as string) as boolean;
};

const initialState: ThemeState = {
  isDarkTheme: getThemeFromLocalStorage(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
      setThemeToLocalStorage(action.payload);
    },
    removeTheme: (state) => {
      state.isDarkTheme = false;
      removeThemeFromLocalStorage();
    },
  },
});

export const { setTheme, removeTheme } = themeSlice.actions;
export default themeSlice.reducer;
