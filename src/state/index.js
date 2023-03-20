import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("persist:root");
    },
    setResult: (state, action) => {
      state.result = action.payload.result;
    }
  },
});

export const { setLogin, setLogout, setResult } = authSlice.actions;
export default authSlice.reducer;
