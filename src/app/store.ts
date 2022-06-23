import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/usersList/currentUserSlice";
import { gitHubApi } from "../features/api/gitHubApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [gitHubApi.reducerPath]: gitHubApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitHubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
