import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type LevelState = "intro" | "loading" | "home";
type UserState = "voted" | "new" | "loggedin";

export type GlobalState = {
  level: LevelState;
  user: UserState;
};

const initialState: GlobalState = {
  level: "intro",
  user: "new"
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<LevelState>) => {
      state.level = action.payload;
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    }
  }
});

export const { updateState, updateUser } = globalSlice.actions;
export default globalSlice.reducer;
