import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    currenttheme: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      state.currenttheme = action.payload;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
