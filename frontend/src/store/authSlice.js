import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/sign-in", {
        email: email,
        password: password,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async ({ email, password, isAdmin }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3000/sign-up", {
        email: email,
        password: password,
        isAdmin: isAdmin,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  token: null,
  userType: null,
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  unknownError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.isLoggedIn = true;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        if (!action.payload) {
          state.unknownError = action.payload.message;
        } else if (action.payload.message === "User Not exist") {
          state.emailError = action.payload.message;
        } else if (action.payload.message === "Incorrect Password") {
          state.passwordError = action.payload.message;
        }
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        // sign up failed
        if (!action.payload) {
          state.unknownError = action.payload.message;
        } else if (action.payload.message === "Username already exists") {
          state.emailError = action.payload.message;
        }
      });
  },
});

export const {
  setIsAdmin,
  userLoggedIn,
  userLoggedOut,
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
} = authSlice.actions;

export default authSlice.reducer;
