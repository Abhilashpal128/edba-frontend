import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import ThemeReducer from "./slices/ThemeSlice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    theme: ThemeReducer
  },
});

export default store;
