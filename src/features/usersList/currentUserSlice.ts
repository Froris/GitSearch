import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { UserSearch } from "../api/types";

export type User = UserSearch & {
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type UserState = {
  currentUser: User;
  isLoading: boolean;
  error: SerializedError | null;
};

const initialState = {
  currentUser: {},
  isLoading: false,
  error: null,
} as UserState;

export const fetchUser = createAsyncThunk(
  "currentUser/fetchCurrentUser",
  async (userLogin: string) => {
    const response = await axios.get<User>(
      `https://api.github.com/users/${userLogin}`
    );

    return response.data;
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default currentUserSlice.reducer;
