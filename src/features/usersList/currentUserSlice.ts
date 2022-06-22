import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLogin: string;
}

const initialState = {
  userLogin: "",
} as UserState;

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
