import { createSlice } from "@reduxjs/toolkit";

const ActiveTabSlice = createSlice({
  name: "activeTab",
  initialState: {
    activeTab: "Home",
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});
export const { setActiveTab } = ActiveTabSlice.actions;
export default ActiveTabSlice.reducer;
