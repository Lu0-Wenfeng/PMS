import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0 },
  reducers: {
    addProductToCart: (state, action) => {
      state.items.push({
        productId: action.payload.productId,
        productName: action.payload.productName,
        quantity: 1,
        productPrice: action.payload.productPrice,
        productImageUrl: action.payload.productImageUrl,
        subTotal: action.payload.productPrice,
      });
      state.total += action.payload.productPrice;
      state.total = Math.round(state.total * 100) / 100;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      const item = state.items.splice(index, 1)[0];
      state.total -= item.subTotal;
      state.total = Math.round(state.total * 100) / 100;
    },
    updateProductQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      const item = state.items[itemIndex];
      item.quantity = action.payload.quantity;
      item.subTotal = item.productPrice * item.quantity;
      state.total = state.items.reduce(
        (total, item) => total + item.subTotal,
        0
      );
      state.total = Math.round(state.total * 100) / 100;
    },
  },
});

export const { updateProductQuantity, addProductToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
