import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLogin: string;
}

const initialState = {
  userLogin: "",
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
