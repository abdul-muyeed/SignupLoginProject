import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setvalue: (state, action) => {
        console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { toggle, setvalue } = alertSlice.actions;
export default alertSlice.reducer;
