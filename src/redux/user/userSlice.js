import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.user;
      state.loading = false;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearState(state, action) {
      state.currentUser = null;
      state.error = null;
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, clearState } = userSlice.actions;
export default userSlice.reducer;
