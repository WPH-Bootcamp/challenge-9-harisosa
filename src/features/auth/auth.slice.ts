import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../types/auth";

type UpdateUserPayload = Partial<NonNullable<AuthData["user"]>>;

const initialState: AuthData = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearSession: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
    updateAddress: (state, action: PayloadAction<string | null>) => {
      if (!state.user) return;
      console.log(action.payload);
      state.user.address = action.payload ?? "";

    },
  },
});

export const { setSession, clearSession, updateUser, updateAddress } = authSlice.actions;
export default authSlice.reducer;
