import { RootState } from "../store";

export const selectUserLogin = (state: RootState) => state.user.userLogin;