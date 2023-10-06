import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/authSlice";

const store = configureStore({ reducer: { auth: authSlice } });

export default store;
