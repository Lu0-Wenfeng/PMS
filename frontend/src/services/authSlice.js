import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
	userData: {}
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state.isLoggedIn = true;
			state.userData = action.payload;
		},
		userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
    }
	}
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;