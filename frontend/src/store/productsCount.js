import { createSlice } from "@reduxjs/toolkit";

const productsCountSlice = createSlice({
  name: "productsCount",
  initialState: {},
  reducers: {
    setProductCount: (state, action) => {
      state[action.payload.productId] = action.payload.count;
    },
    removeProduct: (state, action) => {
      delete state[action.payload.productId];
    },
  },
});

export const { setProductCount, removeProduct } = productsCountSlice.actions;

export default productsCountSlice.reducer;

