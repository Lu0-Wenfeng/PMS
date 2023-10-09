import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get(`http://localhost:3000/cart`);
    console.log(response);
    return response.data;
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3000/cart/add", id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/cart/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/cart/update-quantity/${id}/${quantity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    updateProductQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].productQuantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    // fetch cart items
    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.items;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
    // add to cart
    builder.addCase(addToCart.fulfilled, (state, action) => {
      console.log(action.payload.message);
      state.items.push(action.payload.newAddedProduct);
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.error = action.error;
    });
    // remove from cart
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.removedProduct.productId
      );
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default cartSlice.reducer;
