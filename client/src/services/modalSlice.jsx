import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value ;
    },
  }
    
});

export const { toggle } = modalSlice.actions;
export default modalSlice.reducer;

