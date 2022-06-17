import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import { gitSearchApi } from "../../services";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [gitSearchApi.reducerPath]: gitSearchApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gitSearchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);