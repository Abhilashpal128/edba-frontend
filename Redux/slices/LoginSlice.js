import { createSlice } from "@reduxjs/toolkit";
import { cleardatafromStorage } from "../../Storage/storage";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
