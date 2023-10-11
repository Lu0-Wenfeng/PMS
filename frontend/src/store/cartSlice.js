import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const syncCartWithServer = createAsyncThunk(
  "cart/saveCartOnLogging",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      const productsList = getState().products.productList;
      const response = await axios.post(
        "http://localhost:3000/sync-cart",
        getState().cart.items,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { ...response.data, productsList };
    } catch (error) {
      console.log("have an error", error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0, error: null },
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
  extraReducers: (builder) => {
    builder
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        console.log("debug: ", action.payload);
        state.items = action.payload.syncedCart
          .map((syncedItem) => {
            const productDetails = action.payload.productsList.find(
              (product) => product._id === syncedItem.product
            );
            if (productDetails) {
              const subTotal = (
                parseInt(syncedItem.quantity) *
                parseFloat(productDetails.price)
              );
              console.log("subTotal", subTotal);
              return {
                productId: syncedItem.product,
                quantity: syncedItem.quantity,
                productName: productDetails.name,
                productPrice: productDetails.price,
                productImageUrl: productDetails.productImageUrl,
                subTotal,
              };
            }
            return null;
          })
          .filter((item) => item !== null);
        // Recalculate total
        state.total = state.items.reduce(
          (total, item) => total + item.subTotal,
          0
        );
        state.total = Math.round(state.total * 100) / 100;
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.error =
          action.payload || "An error occurred while saving the cart.";
      });
  },
});

export const { updateProductQuantity, addProductToCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
