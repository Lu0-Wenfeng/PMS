import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { syncCartWithServer } from "./cartSlice";
import axios from "axios";

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  email: "",
  emailError: "",
  passwordError: "",
  unknownError: "",
};

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async ({ email, password }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post("http://localhost:3000/sign-in", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(syncCartWithServer(getState().cart.items));
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
  async (
    { email, password, isAdmin },
    { rejectWithValue, dispatch, getState }
  ) => {
    console.log("Sign Up:", email, password, isAdmin);
    try {
      const response = await axios.post("http://localhost:3000/sign-up", {
        email: email,
        password: password,
        isAdmin: isAdmin,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(syncCartWithServer(getState().cart.items));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (_, { dispatch, getState }) => {
    await dispatch(syncCartWithServer(getState().cart.items));
    dispatch(userLoggedOut());
    localStorage.removeItem("token");
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isAdmin = action.payload.isAdmin;
        state.email = action.payload.email;
        //sync cart
      })
      .addCase(userSignIn.rejected, (state, action) => {
        if (!action.payload) {
          state.unknownError = "unkown error";
        } else if (action.payload.message === "User Not exist") {
          state.emailError = action.payload.message;
        } else if (action.payload.message === "Incorrect Password") {
          state.passwordError = action.payload.message;
        }
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoggedIn = true;
        state.isAdmin = action.payload.isAdmin;
        state.email = action.payload.email;
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
  userLoggedIn,
  userLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
