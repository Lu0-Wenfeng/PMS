import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  userType: null,
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
} = authSlice.actions;

export default authSlice.reducer;
