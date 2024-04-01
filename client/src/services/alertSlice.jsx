import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = alertSlice.actions;
export default alertSlice.reducer;
