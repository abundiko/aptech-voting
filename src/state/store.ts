import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./global/slice";
import votesSlice from "./votes/slice";

export const store = configureStore({
  reducer: {
    globalSlice,
    votesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
