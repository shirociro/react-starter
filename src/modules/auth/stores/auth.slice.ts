import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../types/auth.types";

interface AuthState {
  isLoggedIn: boolean;
  user?: AuthUser;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<AuthUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.user = undefined;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
