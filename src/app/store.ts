import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/usersList/currentUserSlice";
import { gitSearchApi } from "../features/api/gitHubApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    [gitSearchApi.reducerPath]: gitSearchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitSearchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
