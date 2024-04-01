import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice.jsx";
import alertReducer from "./alertSlice.jsx";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice.jsx";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
