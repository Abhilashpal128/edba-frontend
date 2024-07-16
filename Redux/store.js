import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import ThemeReducer from "./slices/ThemeSlice";
import TokenReducer from "./slices/Tokenslice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    theme: ThemeReducer,
    token: TokenReducer,
  },
});

export default store;
