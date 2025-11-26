import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string | null;
  name: string | null;
  email: string | null;
  password?: string | null;
  userType?: string | null;
  createdBy?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  token?: string | null;
}

const initialState: UserState = {
  _id: null,
  name: null,
  email: null,
  password: null,
  userType: null,
  createdBy: null,
  createdAt: null,
  updatedAt: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.userType = action.payload.userType;
      state.createdBy = action.payload.createdBy;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.password = null;
      state.userType = null;
      state.createdBy = null;
      state.createdAt = null;
      state.updatedAt = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
