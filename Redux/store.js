import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import ThemeReducer from "./slices/ThemeSlice";
import TokenReducer from "./slices/Tokenslice";
import ActiveTabReducer from "./slices/ActiveTabSlice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    theme: ThemeReducer,
    token: TokenReducer,
    activeTab: ActiveTabReducer,
  },
});

export default store;
